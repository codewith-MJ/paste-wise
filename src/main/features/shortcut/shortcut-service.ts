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

      shortcutAction = () => {
        void handleCopyShortcut(tone);
      };
    } else {
      if (shortcut.command === SHORTCUT_COMMAND.PASTE_APPLY) {
        shortcutAction = () => {
          void pasteApplyHandler();
        };
      } else {
        logger.warn(
          `[shortcuts] unsupported command: ${shortcut.command} (skipped)`,
        );
        continue;
      }
    }

    list.push({
      accelerator,
      shortcutAction,
    });
  }

  return list;
};

// <어제 업무 결과>
// 단축키 설정페이지 UI작업 진행 완료
// 모드별 빠른 실행 단축키 추가 작업 진행중

// <개인작업>
// AI 변환기능

// <특이사항>
// X

// <일정 변동 & 딜레이 유무>
// ㅁ

// <도움 요청 사항 유무>
// X

// 여기에 일정 변도 ㅇ딜레이 유무에 내가 지금 모드 단축키 등록하면서 겪고있는 문제와 필요한 수정사항을 아주 간단하게 정리해줘.

export { getShortcutList, getShortcutListToRegister };
