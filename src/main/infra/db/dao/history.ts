import {
  HistoryListItem,
  History,
  NewHistoryInput,
} from "@/shared/types/history";
import { getDb } from "../connection";

const getHistoryList = (): HistoryListItem[] => {
  const db = getDb();
  return db
    .prepare<[], HistoryListItem>(
      `SELECT
        history_id    AS historyId,
        original_text AS originalText,
        is_translated AS isTranslated,
        tone_title    AS toneTitle,
        created_at    AS createdAt
      FROM histories
      WHERE is_active = 1
      ORDER BY created_at DESC`,
    )
    .all();
};

const getHistoryById = (historyId: number): History | null => {
  const db = getDb();

  return (
    db
      .prepare<[number], History>(
        `SELECT
          history_id     AS historyId,
          original_text  AS originalText,
          transformed_text AS transformedText,
          tone_title     AS toneTitle,
          tone_prompt    AS tonePrompt,
          is_translated  AS isTranslated,
          language_in    AS languageIn,
          language_out   AS languageOut,
          tone_strength  AS toneStrength,
          emoji_allowed  AS emojiAllowed,
          created_at     AS createdAt
        FROM histories
        WHERE history_id = ? AND is_active = 1`,
      )
      .get(historyId) ?? null
  );
};

const createHistory = (history: NewHistoryInput): number => {
  const db = getDb();

  const stmt = db.prepare(`
    INSERT INTO histories (
      original_text, transformed_text, tone_id, tone_title, tone_prompt,
      is_translated, language_in, language_out, tone_strength, emoji_allowed
    )
    VALUES (
      @/original_text, @/transformed_text, @/tone_id, @/tone_title, @/tone_prompt,
      @/is_translated, @/language_in, @/language_out, @/tone_strength, @/emoji_allowed
    )
  `);

  const result = stmt.run({
    original_text: history.originalText,
    transformed_text: history.transformedText,
    tone_id: history.toneId ?? null,
    tone_title: history.toneTitle ?? null,
    tone_prompt: history.tonePrompt ?? null,
    is_translated: history.isTranslated ?? 0,
    lang_in: history.languageIn ?? null,
    lang_out: history.languageOut ?? null,
    tone_strength: history.toneStrength ?? null,
    emoji_allowed: history.emojiAllowed ?? 1,
  });

  return Number(result.lastInsertRowid);
};

const deleteHistory = (historyId: number): boolean => {
  const db = getDb();
  const result = db
    .prepare<[number]>(
      `
      UPDATE histories
         SET is_active = 0
       WHERE history_id = ?
         AND is_active = 1
    `,
    )
    .run(historyId);
  return result.changes > 0;
};

const deleteExpiredHistories = (nowMs: number = Date.now()): number => {
  const db = getDb();

  const stmt = db.prepare(`
    DELETE FROM histories
    WHERE expires_at IS NOT NULL
      AND expires_at < ?
  `);

  const result = stmt.run(nowMs);
  return result.changes;
};

export {
  getHistoryList,
  getHistoryById,
  createHistory,
  deleteHistory,
  deleteExpiredHistories,
};
