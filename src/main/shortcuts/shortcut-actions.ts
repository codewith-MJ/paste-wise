import logger from "../utils/logger";

const onShortcutCopyCapture = () => {
  logger.info("[shortcuts] onShortcutCopyCapture");
};

const onShortcutPasteApply = () => {
  logger.info("[shortcuts] onShortcutPasteApply");
};

export { onShortcutCopyCapture, onShortcutPasteApply };
