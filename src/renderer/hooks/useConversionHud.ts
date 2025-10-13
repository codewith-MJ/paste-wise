import { useEffect } from "react";
import logger from "@/main/utils/logger";

function useConversionHud() {
  useEffect(() => {
    if (!window.loading || !window.hud) return;

    const off = window.loading.onChange((isLoading) => {
      try {
        if (isLoading) {
          window.hud.show();
        } else {
          window.hud.hide();
        }
      } catch (error) {
        logger.warn("[HUD] show/hide failed", error);
      }
    });

    return () => {
      off?.();
    };
  }, []);
}

export default useConversionHud;
