import { clipboard } from "electron";
import logger from "../utils/logger";

const RESTORE_DELAY = 400;

const revertClipboard = (prevClipboardText: string) => {
  setTimeout(() => {
    try {
      clipboard.writeText(prevClipboardText || "");
    } catch (error) {
      logger.debug("[revertClipboard] failed to restore", error);
    }
  }, RESTORE_DELAY);
};

export default revertClipboard;
