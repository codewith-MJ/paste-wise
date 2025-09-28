import logger from "@/main/utils/logger";
import { deleteExpiredHistory } from "@/main/features/history/history-service";

let ttlCelanerTimer: NodeJS.Timeout | null = null;

type Options = { intervalMs?: number };

const startTtlCleaner = ({ intervalMs = 30 * 60000 }: Options = {}) => {
  const cleanExpiredHistories = async () => {
    try {
      const deleted = await deleteExpiredHistory();
      if (deleted > 0) {
        logger.info(`[TTL] cleaned ${deleted} expired histories`);
      } else {
        logger.debug(`[TTL] no expired histories to clean`);
      }
    } catch (error) {
      const msg = (error as Error)?.message ?? String(error);
      logger.error(`[TTL] clean failed: ${msg}`);
    }
  };

  cleanExpiredHistories();

  ttlCelanerTimer = setInterval(cleanExpiredHistories, intervalMs);

  return () => {
    if (ttlCelanerTimer) {
      clearInterval(ttlCelanerTimer);
      ttlCelanerTimer = null;
    }
  };
};

export default startTtlCleaner;
