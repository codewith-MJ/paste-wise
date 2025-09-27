import { globalShortcut } from "electron";
import logger from "../utils/logger";
import {
  onShortcutCopyCapture,
  onShortcutPasteApply,
} from "./shortcut-actions";
import { SHORTCUT_COMMAND } from "@/shared/constants/shortcuts";
import { ShortcutCommandValue } from "@/shared/types/shortcut";
import { getShortcutListToRegister } from "../services/shortcut";

const commandToShortcutAction: Record<ShortcutCommandValue, () => void> = {
  [SHORTCUT_COMMAND.COPY_CAPTURE]: onShortcutCopyCapture,
  [SHORTCUT_COMMAND.PASTE_APPLY]: onShortcutPasteApply,
};

const registerInitialShortcuts = (): void => {
  const shortcutsToRegister = getShortcutListToRegister(
    commandToShortcutAction,
  );

  const registeredAccelerators = new Set<string>();
  let registeredCount = 0;

  for (const { accelerator, shortcutAction } of shortcutsToRegister) {
    if (registeredAccelerators.has(accelerator)) {
      logger.warn(`[shortcuts] duplicate skipped: ${accelerator}`);
      continue;
    }
    registeredAccelerators.add(accelerator);

    try {
      globalShortcut.register(accelerator, shortcutAction);

      if (globalShortcut.isRegistered(accelerator)) {
        registeredCount++;
      } else {
        logger.warn(`[shortcuts] failed to register: ${accelerator}`);
      }
    } catch (error) {
      logger.error(
        `[shortcuts] exception while registering ${accelerator}`,
        error,
      );
    }
  }

  logger.info(
    `[shortcuts] registered ${registeredCount}/${shortcutsToRegister.length}`,
  );
};

export default registerInitialShortcuts;
