import { getShortcutList as repoGetShortcutList } from "../infra/db/dao/shortcut";
import logger from "../utils/logger";
import convertShortcut from "../shortcuts/convert-shortcuts";
import {
  ShortcutCommandValue,
  ShortcutToRegister,
  ShortcutUI,
} from "@/shared/types/shortcut";

const getShortcutList = async (): Promise<ShortcutUI[]> => {
  const shortcutList = await Promise.resolve(repoGetShortcutList());
  const formattedShortcutList = shortcutList.map((item) => ({
    ...item,
    shortcutId: String(item.shortcutId),
  }));

  return formattedShortcutList;
};

const getShortcutListToRegister = (
  commandToShortcutAction: Record<ShortcutCommandValue, () => void>,
): ShortcutToRegister[] => {
  const shortcuts = repoGetShortcutList();
  const list: ShortcutToRegister[] = [];

  for (const shortcut of shortcuts) {
    const accelerator = convertShortcut(shortcut.accelerator);
    if (!accelerator) {
      logger.warn(
        `[shortcuts] invalid accelerator: "${shortcut.accelerator}" (${shortcut.command})`,
      );
      continue;
    }

    const shortcutAction =
      commandToShortcutAction[shortcut.command as ShortcutCommandValue];
    if (!shortcutAction) {
      logger.warn(
        `[shortcuts] unsupported command: ${shortcut.command} (skipped)`,
      );
      continue;
    }

    list.push({
      accelerator,
      shortcutAction,
    });
  }

  return list;
};

export { getShortcutList, getShortcutListToRegister };
