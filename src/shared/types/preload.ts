import type { HistoryItemUI } from "@/shared/types/history";
import { ToneItemUI } from "./tone";
import { ShortcutUI } from "./shortcut";
import { AuthUser } from "./auth";

declare global {
  interface Window {
    api: {
      history: {
        list: () => Promise<HistoryItemUI[]>;
        get: (id: string) => Promise<HistoryItemUI>;
        delete: (id: string) => Promise<boolean>;
        dropdownList: () => Promise<string[]>;
      };
      tone: {
        list: () => Promise<ToneItemUI[]>;
        get: (id: string) => Promise<ToneItemUI>;
      };
      shortcut: {
        list: () => Promise<ShortcutUI[]>;
      };
      auth: {
        loginWithGoogle: () => Promise<{ user: AuthUser }>;
        logout: (userId: string) => Promise<{ ok: true }>;
      };
    };

    hud: {
      show: () => Promise<boolean>;
      hide: () => Promise<boolean>;
    };

    loading: {
      onChange: (handler: (isLoading: boolean) => void) => () => void;
    };

    toast: {
      success: (message: string, duration?: number) => Promise<boolean>;
      error: (message: string, duration?: number) => Promise<boolean>;
    };
  }
}

export {};
