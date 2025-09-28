import { clipboard } from "electron";
import logger from "../../utils/logger";
import sendSystemCopyKeystroke from "../../infra/os/system-copy";
import sleep from "../../utils/sleep";

export const CLIPBOARD_UPDATE_ATTEMPTS = 12;
export const CLIPBOARD_UPDATE_INTERVAL_MS = 40;

const sendSystemCopyCommand = async (): Promise<boolean> => {
  const { ok, errorMessage } = await sendSystemCopyKeystroke();
  if (!ok) {
    logger.warn(
      `[system-copy] ${errorMessage ? errorMessage.trim() : "failed"}`,
    );
    return false;
  }
  return true;
};

const getUpdatedClipboardText = async (
  prevClipboardText: string,
): Promise<string | null> => {
  let updatedClipboardText = "";

  for (let i = 0; i < CLIPBOARD_UPDATE_ATTEMPTS; i++) {
    await sleep(CLIPBOARD_UPDATE_INTERVAL_MS);
    updatedClipboardText = clipboard.readText();

    if (updatedClipboardText && updatedClipboardText !== prevClipboardText)
      return updatedClipboardText;
  }

  return null;
};

export { sendSystemCopyCommand, getUpdatedClipboardText };
