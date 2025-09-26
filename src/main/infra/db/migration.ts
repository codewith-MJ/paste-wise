import logger from "@/main/utils/logger";
import { getDb } from "./connection";
import MigrationError from "@/shared/errors/MigrationError";

export function applyMigrations() {
  const db = getDb();
  const modules = import.meta.glob("./migrations/*.sql", {
    as: "raw",
    eager: true,
  }) as Record<string, string>;

  const entries = Object.entries(modules).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  for (const [file, sql] of entries) {
    logger.info(`[Migration] Running ${file} ...`);
    try {
      db.exec(sql);
      logger.info(`[Migration] Completed ${file} ✅`);
    } catch (error) {
      logger.error({ error }, `[Migration] Failed ${file}`);
      throw new MigrationError({
        file,
        cause: (error as Error)?.message ?? String(error),
      });
    }
  }
}
