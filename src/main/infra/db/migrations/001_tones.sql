CREATE TABLE IF NOT EXISTS tones (
  tone_id           INTEGER PRIMARY KEY,
  tone_title        TEXT NOT NULL,
  tone_prompt       TEXT NOT NULL,
  tone_strength     INTEGER NOT NULL DEFAULT 50 CHECK(tone_strength BETWEEN 1 AND 100),
  emoji_allowed     INTEGER NOT NULL DEFAULT 1 CHECK(emoji_allowed IN (0,1)),
  is_default        INTEGER NOT NULL DEFAULT 0 CHECK(is_default IN (0,1)),
  is_active         INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0,1)),
  created_at        INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
  updated_at        INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
);

CREATE TRIGGER IF NOT EXISTS trg_tones_updated_at
AFTER UPDATE ON tones
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE tones
  SET updated_at = (strftime('%s','now') * 1000)
  WHERE tone_id = NEW.tone_id;
END;