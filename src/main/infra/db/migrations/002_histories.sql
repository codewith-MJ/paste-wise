CREATE TABLE IF NOT EXISTS histories (
  history_id        INTEGER PRIMARY KEY,
  original_text     TEXT NOT NULL,
  transformed_text  TEXT NOT NULL,
  mode_id           TEXT NOT NULL,
  mode_title        TEXT,
  mode_prompt       TEXT,
  mode_type         TEXT,
  lang_in           TEXT,
  lang_out          TEXT,
  tone_strength     INTEGER,
  emoji_allowed     INTEGER CHECK(emoji_allowed IN (0,1)),
  is_active         INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0,1)),
  created_at        INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
  updated_at        INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
  expires_at        INTEGER,
  FOREIGN KEY (mode_id) REFERENCES modes(key) ON DELETE SET NULL
);

CREATE TRIGGER IF NOT EXISTS trg_histories_updated_at
AFTER UPDATE ON histories
FOR EACH ROW
BEGIN
  UPDATE histories
  SET updated_at = (strftime('%s','now') * 1000)
  WHERE history_id = NEW.history_id;
END;
