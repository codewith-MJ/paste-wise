import {
  HistoryListItem,
  History,
  NewHistoryInput,
} from "@/shared/types/history";
import { getDb } from "../connection";

function getHistoryList(): HistoryListItem[] {
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
}

function getHistoryById(historyId: number): History | null {
  const db = getDb();

  return (
    db
      .prepare<[number], History>(
        `SELECT
          history_id     AS historyId,
          original_text  AS originalText,
          transformed_text AS transformedText,
          tone_id        AS toneId,
          tone_title     AS toneTitle,
          tone_prompt    AS tonePrompt,
          is_translated  AS isTranslated,
          lang_in        AS langIn,
          lang_out       AS langOut,
          tone_strength  AS toneStrength,
          emoji_allowed  AS emojiAllowed,
          created_at     AS createdAt
        FROM histories
        WHERE history_id = ? AND is_active = 1`,
      )
      .get(historyId) ?? null
  );
}

function createHistory(history: NewHistoryInput): number {
  const db = getDb();

  const stmt = db.prepare(`
    INSERT INTO histories (
      original_text, transformed_text, tone_id, tone_title, tone_prompt,
      is_translated, language_in, language_out, tone_strength, emoji_allowed
    )
    VALUES (
      @original_text, @transformed_text, @tone_id, @tone_title, @tone_prompt,
      @is_translated, @language_in, @language_out, @tone_strength, @emoji_allowed
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
}

function deleteHistory(historyId: number): boolean {
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
}

export { getHistoryList, getHistoryById, createHistory, deleteHistory };
