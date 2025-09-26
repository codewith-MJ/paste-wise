CREATE TABLE IF NOT EXISTS shortcuts (
  shortcut_id     INTEGER PRIMARY KEY,
  command         TEXT NOT NULL,
  tone_id         INTEGER,
  accelerator     TEXT NOT NULL,
  is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0,1)),
  created_at      INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
  updated_at      INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),

  FOREIGN KEY (tone_id) REFERENCES tones(tone_id) ON DELETE CASCADE,

  UNIQUE(command),
  UNIQUE(tone_id),
  UNIQUE(accelerator)
);

CREATE TRIGGER IF NOT EXISTS trg_shortcuts_updated_at
AFTER UPDATE ON shortcuts
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE shortcuts
  SET updated_at = (strftime('%s','now') * 1000)
  WHERE shortcut_id = NEW.shortcut_id;
END;
