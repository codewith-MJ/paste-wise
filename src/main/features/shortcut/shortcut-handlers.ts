import { clipboard } from "electron";
import sendSystemPasteCommand from "../../infra/os/system-paste";
import { peekLatestResult } from "@/main/features/clipboard/result-buffer";
import {
  sendSystemCopyCommand,
  getUpdatedClipboardText,
} from "../clipboard/clipboard-capture";
import { transform } from "../transform/transform-service";
import sleep from "@/main/utils/sleep";
import logger from "@/main/utils/logger";
import revertClipboard from "../clipboard/revert-clipboard";
import writeEscapedTransfromedResult from "../clipboard/write-escaped-result";
import {
  isDuplicateRead,
  updateReadBuffer,
} from "@/main/features/clipboard/read-buffer";
import { getTranslateMode } from "@/main/global-translate-state";
import { createHistory } from "@/main/infra/db/dao/history";
import { Tone, ToneInfo } from "@/shared/types/tone";
import safeBufferPush from "@/main/features/clipboard/safe-buffer-push";
import { getMainWindow } from "@/main/app/windows";
import { pushToast } from "@/main/toast/overlay";
import { IPC } from "@/shared/constants/ipc-channels";
import { TOAST_TYPE } from "@/shared/constants/toast";

const sendConversionStart = (jobId: string) => {
  const win = getMainWindow();
  if (!win) return;
  win.webContents.send(IPC.CONVERSION_START, { jobId });
};

const sendConversionDone = (jobId: string, ok: boolean) => {
  const win = getMainWindow();
  if (!win) return;
  win.webContents.send(IPC.CONVERSION_DONE, { jobId, ok });
};

const handleCopyShortcut = async (tone: Tone) => {
  const jobId = String(Date.now());
  const done = (ok: boolean) => sendConversionDone(jobId, ok);

  try {
    sendConversionStart(jobId);
    await sleep(120);

    const prevClipboardText = clipboard.readText();
    const dispatched = await sendSystemCopyCommand();
    if (!dispatched) return done(false);

    const updatedClipboardText =
      await getUpdatedClipboardText(prevClipboardText);

    const originalText = updatedClipboardText ?? prevClipboardText;

    if (!originalText) {
      logger.warn("[copy] clipboard empty");
      return done(false);
    }

    const isTranslated = getTranslateMode();

    if (isDuplicateRead(originalText, tone.toneId, isTranslated)) {
      logger.warn(
        "[copy] clipboard unchanged and same tone/translate mode → skipped",
      );
      return done(false);
    }

    const toneInfo: ToneInfo = {
      toneId: tone.toneId,
      tonePrompt: tone.tonePrompt,
      toneStrength: tone.toneStrength,
      emojiAllowed: tone.emojiAllowed === 1,
    };
    const transformedResult = await transform(
      originalText,
      toneInfo,
      isTranslated,
    );

    await safeBufferPush(transformedResult.transformedText, async () => {
      createHistory({
        originalText,
        ...transformedResult,
        ...tone,
        isTranslated: isTranslated ? 1 : 0,
      });

      updateReadBuffer(originalText, tone.toneId, isTranslated);
    });

    logger.info(
      `[copy] transformed → result-buffer: "${transformedResult.transformedText.slice(0, 60)}"`,
    );

    pushToast(TOAST_TYPE.SUCCESS, "변환이 완료되었습니다!", 3000);
    return done(true);
  } catch (err) {
    logger.error("[copy] handler failed", err);
    pushToast(TOAST_TYPE.ERROR, "오류가 발생했습니다.", 3000);
    return done(false);
  }
};

const createPasteApplyHandler = () => {
  let busy = false;

  return async () => {
    if (busy) return;
    busy = true;

    try {
      const transformedResult = peekLatestResult();
      if (!transformedResult) {
        logger.info("[paste] no buffered result → user notified");
        return;
      }

      const prevClipboardText = clipboard.readText();

      if (prevClipboardText === transformedResult) {
        const { ok, errorMessage } = await sendSystemPasteCommand();
        if (!ok && errorMessage)
          logger.warn(`[system-paste] ${errorMessage.trim()}`);
        return;
      }

      await writeEscapedTransfromedResult(transformedResult);

      const { ok, errorMessage } = await sendSystemPasteCommand();
      if (!ok && errorMessage)
        logger.warn(`[system-paste] ${errorMessage.trim()}`);

      revertClipboard(prevClipboardText);
    } catch (e) {
      logger.error("[paste] handler failed", e);
    } finally {
      busy = false;
    }
  };
};

export { handleCopyShortcut, createPasteApplyHandler };
