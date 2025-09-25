import type { Database as DatabaseType } from "better-sqlite3";

export function applyMigrations(db: DatabaseType) {
  const modules = import.meta.glob("./migrations/*.sql", {
    as: "raw",
    eager: true,
  }) as Record<string, string>;

  const entries = Object.entries(modules);

  for (const [file, sql] of entries.sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`[Migration] Running ${file} ...`);
    db.exec(sql);
  }
}
