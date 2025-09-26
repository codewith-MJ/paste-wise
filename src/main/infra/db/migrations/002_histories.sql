CREATE TABLE IF NOT EXISTS histories (
  history_id        INTEGER PRIMARY KEY,
  original_text     TEXT NOT NULL,
  transformed_text  TEXT NOT NULL,
  tone_id           TEXT,
  tone_title        TEXT,
  tone_prompt       TEXT,
  is_translated     INTEGER NOT NULL,
  language_in       TEXT,
  language_out      TEXT,
  tone_strength     INTEGER,
  emoji_allowed     INTEGER NOT NULL,
  is_active         INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0,1)),
  created_at        INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
  updated_at        INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
  expires_at        INTEGER,
  FOREIGN KEY (tone_id) REFERENCES tones(tone_id) ON DELETE SET NULL
);

CREATE TRIGGER IF NOT EXISTS trg_histories_updated_at
AFTER UPDATE ON histories
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE histories
  SET updated_at = (strftime('%s','now') * 1000)
  WHERE history_id = NEW.history_id;
END;

CREATE INDEX IF NOT EXISTS idx_histories_active_created
  ON histories (is_active, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_histories_tone
  ON histories (tone_id);

CREATE INDEX IF NOT EXISTS idx_histories_translated
  ON histories (is_translated);

CREATE INDEX IF NOT EXISTS idx_histories_expires_at
  ON histories (expires_at);
