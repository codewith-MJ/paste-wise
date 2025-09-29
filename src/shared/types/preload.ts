import type { HistoryItemUI } from "@/shared/types/history";

declare global {
  interface Window {
    api: {
      history: {
        list: () => Promise<HistoryItemUI[]>;
        get: (id: string) => Promise<HistoryItemUI>;
      };
    };
  }
}

export {};
