import { getDb } from "../connection";
import type { ShortcutListItem } from "@/shared/types/shortcut";

const getShortcutList = (): ShortcutListItem[] => {
  const db = getDb();
  return db
    .prepare<[], ShortcutListItem>(
      `SELECT
        s.shortcut_id   AS shortcutId,
        s.command,
        t.tone_id       AS toneId,
        t.is_default    AS isDefault,
        t.tone_name     AS toneName,
        s.accelerator,
        s.is_active     AS isActive
      FROM shortcuts s
      LEFT JOIN tones t ON s.tone_id = t.tone_id
      WHERE s.is_active = 1
      ORDER BY s.created_at DESC;`,
    )
    .all();
};

export { getShortcutList };
