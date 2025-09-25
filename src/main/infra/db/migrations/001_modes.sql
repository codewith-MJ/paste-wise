CREATE TABLE IF NOT EXISTS modes (
  mode_id           INTEGER PRIMARY KEY,
  mode_title        TEXT NOT NULL,
  mode_prompt       TEXT NOT NULL,
  mode_type         TEXT NOT NULL,
  lang_in           TEXT,
  lang_out          TEXT,
  tone_strength     INTEGER NOT NULL DEFAULT 50 CHECK(tone_strength BETWEEN 1 AND 100),
  emoji_allowed     INTEGER NOT NULL DEFAULT 1 CHECK(emoji_allowed IN (0,1)),
  is_active         INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0,1)),
  created_at        INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
  updated_at        INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
);

CREATE TRIGGER IF NOT EXISTS trg_modes_updated_at
AFTER UPDATE ON modes
FOR EACH ROW
BEGIN
  UPDATE modes
  SET updated_at = (strftime('%s','now') * 1000)
  WHERE mode_id = NEW.mode_id;
END;
