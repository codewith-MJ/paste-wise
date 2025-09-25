CREATE TABLE IF NOT EXISTS shortcuts (
  shortcut_id     INTEGER PRIMARY KEY,
  action          TEXT,
  mode_id         INTEGER,
  accelerator     TEXT NOT NULL,
  is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0,1)),
  created_at      INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
  updated_at      INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000),
  CHECK (
    (action IS NOT NULL AND mode_id IS NULL) OR
    (action IS NULL AND mode_id IS NOT NULL)
  ),

  FOREIGN KEY (mode_id) REFERENCES modes(mode_id) ON DELETE CASCADE,

  UNIQUE(action),
  UNIQUE(mode_id),
  UNIQUE(accelerator)
);

CREATE TRIGGER IF NOT EXISTS trg_shortcuts_updated_at
AFTER UPDATE ON shortcuts
FOR EACH ROW
BEGIN
  UPDATE shortcuts
  SET updated_at = (strftime('%s','now') * 1000)
  WHERE shortcut_id = NEW.shortcut_id;
END;
