import { getDb } from "../connection";
import type { ToneListItem, Tone } from "@/shared/types/tone";

const getToneList = (): ToneListItem[] => {
  const db = getDb();
  return db
    .prepare<[], ToneListItem>(
      `SELECT
         tone_id    AS toneId,
         tone_title AS toneTitle,
         is_default AS isDefault
       FROM tones
       WHERE is_active = 1
       ORDER BY created_at DESC`,
    )
    .all();
};

const getToneById = (toneId: number): Tone | null => {
  const db = getDb();
  return (
    db
      .prepare<[number], Tone>(
        `SELECT
           tone_id        AS toneId,
           tone_title     AS toneTitle,
           tone_prompt    AS tonePrompt,
           tone_strength  AS toneStrength,
           emoji_allowed  AS emojiAllowed,
           is_default     AS isDefault
         FROM tones
         WHERE tone_id = ?
           AND is_active = 1`,
      )
      .get(toneId) ?? null
  );
};

export { getToneList, getToneById };
