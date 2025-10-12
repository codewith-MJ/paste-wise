import { getShortcutList as repoGetShortcutList } from "@/main/infra/db/dao/shortcut";
import logger from "@/main/utils/logger";
import convertShortcut from "./convert-shortcuts";
import { ShortcutToRegister, ShortcutUI } from "@/shared/types/shortcut";
import {
  createPasteApplyHandler,
  handleCopyShortcut,
} from "./shortcut-handlers";
import { getToneById } from "@/main/infra/db/dao/tone";
import { SHORTCUT_COMMAND } from "@/shared/constants/shortcuts";
import { Tone } from "@/shared/types/tone";
import { toggleTranslateMode } from "@/main/global-translate-state";

const getShortcutList = async (): Promise<ShortcutUI[]> => {
  const shortcutList = await Promise.resolve(repoGetShortcutList());
  const formattedShortcutList = shortcutList.map((item) => ({
    ...item,
    shortcutId: String(item.shortcutId),
    toneId: item.toneId ? String(item.toneId) : "",
  }));

  return formattedShortcutList;
};

const pasteApplyHandler = createPasteApplyHandler();

const getShortcutListToRegister = (): ShortcutToRegister[] => {
  const shortcuts = repoGetShortcutList();
  const list: ShortcutToRegister[] = [];

  const shortcutForDefaultTone = shortcuts.find(
    (s) => s.toneId != null && s.isDefault === 1,
  );

  let defaultTone: Tone | null = null;
  if (shortcutForDefaultTone && shortcutForDefaultTone.toneId != null) {
    defaultTone = getToneById(shortcutForDefaultTone.toneId);
    if (!defaultTone) {
      logger.warn(
        `[shortcuts] default tone id not resolvable: ${shortcutForDefaultTone.toneId}`,
      );
    }
  }

  for (const shortcut of shortcuts) {
    const accelerator = convertShortcut(shortcut.accelerator);
    if (!accelerator) {
      logger.warn(
        `[shortcuts] invalid accelerator: "${shortcut.accelerator}" (${shortcut.command})`,
      );
      continue;
    }

    let shortcutAction: () => void;

    if (
      shortcut.toneId != null ||
      shortcut.command === SHORTCUT_COMMAND.COPY_CAPTURE
    ) {
      const tone =
        shortcut.toneId != null ? getToneById(shortcut.toneId) : defaultTone;

      if (!tone) {
        logger.warn("[shortcuts] tone not found");
        continue;
      }

      const toneInfo = {
        toneId: tone.toneId,
        tonePrompt: tone.tonePrompt,
        toneStrength: tone.toneStrength,
        emojiAllowed: tone.emojiAllowed === 1,
      };

      shortcutAction = () => {
        void handleCopyShortcut(toneInfo);
      };
    } else if (shortcut.command === SHORTCUT_COMMAND.PASTE_APPLY) {
      shortcutAction = () => {
        void pasteApplyHandler();
      };
    } else if (shortcut.command === SHORTCUT_COMMAND.TRANSLATE_TOGGLE) {
      shortcutAction = () => {
        toggleTranslateMode();
      };
    } else {
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
