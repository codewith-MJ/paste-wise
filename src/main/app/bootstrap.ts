import { globalShortcut } from "electron";
import applyMigrations from "../infra/db/migration";
import seedPresetData from "../infra/db/presets";
import { openDb, closeDb } from "../infra/db/connection";
import registerAllIpc from "./register-ipcs";
import startTtlCleaner from "../schedulers/ttl-cleaner";
import registerInitialShortcuts from "../features/shortcut/register-initial-shortcuts";
import logger from "../utils/logger";

type BootstrapResult = {
  cleanupAppResources: () => void;
};

const bootstrap = (): BootstrapResult => {
  openDb();
  applyMigrations();
  seedPresetData(process.platform);

  registerAllIpc();

  registerInitialShortcuts();

  const stopTtlCleaner = startTtlCleaner();

  const cleanupAppResources = () => {
    try {
      stopTtlCleaner?.();
    } catch (err) {
      logger.error("[cleanup] failed to stop ttl-cleaner", err);
    }
    try {
      globalShortcut.unregisterAll();
    } catch (err) {
      logger.error("[cleanup] failed to unregister shortcuts", err);
    }
    try {
      closeDb();
    } catch (err) {
      logger.error("[cleanup] failed to close db", err);
    }
  };

  return { cleanupAppResources };
};

export default bootstrap;
