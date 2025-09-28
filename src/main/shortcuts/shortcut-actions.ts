import { clipboard } from "electron";
import sendSystemPasteCommand from "../system/system-paste";
import { pushResult, peekLatestResult } from "@/main/clipboard/result-buffer";
import {
  sendSystemCopyCommand,
  getUpdatedClipboardText,
} from "./clipboard-capture";
import { transform } from "../services/transform";
import sleep from "../utils/sleep";
import logger from "../utils/logger";
import revertClipboard from "./\brevert-clipboard";
import writeEscapedTransfromedResult from "./write-escaped-result";

const handleCopyShortcut = async () => {
  try {
    await sleep(120);

    const prevClipboardText = clipboard.readText();
    const dispatched = await sendSystemCopyCommand();
    if (!dispatched) return;

    const updatedClipboardText =
      await getUpdatedClipboardText(prevClipboardText);
    if (!updatedClipboardText) return;

    try {
      const transformed = await transform(updatedClipboardText, 1);
      pushResult(transformed);
      logger.info(
        `[copy] transformed → result-buffer: "${transformed.slice(0, 60)}"`,
      );
    } catch (err) {
      logger.error("[copy] transform failed", err);
    }
  } catch (err) {
    logger.error("[copy] handler failed", err);
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

      writeEscapedTransfromedResult(transformedResult);

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
