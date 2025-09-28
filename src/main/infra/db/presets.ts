import logger from "@/main/utils/logger";
import { getDb } from "./connection";
import { SeedError } from "@/shared/errors";

const seedPresetData = (platform: string) => {
  const db = getDb();

  const seeded = db
    .prepare(`SELECT 1 FROM app_settings WHERE key = 'seed:presets'`)
    .get();
  if (seeded) {
    logger.info("[SEED] presets already applied, skip");
    return { ok: true, skipped: true };
  }

  const modules = import.meta.glob("./seeds/*.sql", {
    as: "raw",
    eager: true,
  }) as Record<string, string>;

  const entries = Object.entries(modules).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  const tonePresetData = entries.filter(([file]) => file.includes("/001_"));
  const shortcutPresetData = entries.find(([file]) =>
    file.endsWith(`_${platform}.sql`),
  );

  const selected: [string, string][] = shortcutPresetData
    ? [...tonePresetData, shortcutPresetData]
    : [...tonePresetData];

  if (entries.length === 0) {
    logger.info("[SEED] No seed files matched. Skip.");
    return { ok: true, skipped: true };
  }

  let failedAt: string | null = null;

  const applyAll = db.transaction(() => {
    for (const [file, sql] of selected) {
      logger.info(`[SEED] Applying ${file} ...`);
      failedAt = file;
      db.exec(sql);
      logger.info(`[SEED] Completed ${file} ✅`);
    }

    db.prepare(
      `INSERT INTO app_settings (key, value) VALUES ('seed:presets', ?)`,
    ).run(String(Date.now()));
  });

  try {
    applyAll();
    return { ok: true, skipped: false };
  } catch (error) {
    const msg = (error as Error)?.message ?? String(error);
    logger.error(`[SEED] Failed: ${msg}`);
    throw new SeedError({ file: failedAt ?? "(unknown)", cause: msg });
  }
};

export default seedPresetData;
