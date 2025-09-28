import { app } from "electron";
import Database from "better-sqlite3";
import path from "node:path";
import type { Database as DatabaseType } from "better-sqlite3";

let instance: DatabaseType | null = null;

const openDb = () => {
  if (instance) {
    return instance;
  }
  const dbPath = path.join(app.getPath("userData"), "pastewise.db");
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = NORMAL");
  db.pragma("foreign_keys = ON");

  instance = db;
  return instance;
};

const getDb = () => {
  return openDb();
};

const closeDb = () => {
  if (instance) {
    instance.close();
    instance = null;
  }
};

export { openDb, getDb, closeDb };
