import { getDb } from "../connection";
import type { ShortcutListItem } from "@/shared/types/shortcut";

export function getShortcutList(): ShortcutListItem[] {
  const db = getDb();
  return db
    .prepare<[], ShortcutListItem>(
      `SELECT
         shortcut_id AS shortcutId,
         command,
         tone_id    AS toneId,
         accelerator,
         is_active  AS isActive
       FROM shortcuts
       WHERE is_active = 1`,
    )
    .all();
}
