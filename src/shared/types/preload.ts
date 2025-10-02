import type { HistoryItemUI } from "@/shared/types/history";
import { ToneItemUI } from "./tone";
import { ShortcutUI } from "./shortcut";

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
    };
  }
}

export {};
