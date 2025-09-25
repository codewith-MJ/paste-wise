import type { Database as DatabaseType } from "better-sqlite3";
import logger from "@/main/utils/logger";

export function applyMigrations(db: DatabaseType) {
  const modules = import.meta.glob("./migrations/*.sql", {
    as: "raw",
    eager: true,
  }) as Record<string, string>;

  const entries = Object.entries(modules);

  for (const [file, sql] of entries.sort(([a], [b]) => a.localeCompare(b))) {
    try {
      logger.info(`[Migration] Running ${file} ...`);
      db.exec(sql);
      logger.info(`[Migration] Completed ${file} ✅`);
    } catch (error) {
      logger.error({ error }, `[Migration] Failed ${file}`);
      throw error;
    }
  }
}
