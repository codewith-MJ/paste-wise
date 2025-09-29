import { create } from "zustand";
import type { HistoryItemUI } from "@/shared/types/history";

type HistoryState = {
  historyList: HistoryItemUI[];
  selectedId: string | null;
  fetchList: () => Promise<void>;
  handleSelectedId: (id: string | null) => void;
  deleteHistory: (id: string) => Promise<void>;
  error: string | null;
};

export const useHistoryStore = create<HistoryState>((set) => ({
  historyList: [],
  selectedId: null,
  error: null,

  fetchList: async () => {
    set({ error: null });
    try {
      const result = await window.api.history.list();
      set({
        historyList: result,
        selectedId: result[0]?.historyId ?? null,
      });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  handleSelectedId: (id) => set({ selectedId: id }),

  deleteHistory: async (id: string) => {
    if (!id) return;
    await window.api.history.delete(id);
    set((state) => {
      const historyList = state.historyList.filter((it) => it.historyId !== id);
      const selectedId =
        state.selectedId === id
          ? (historyList[0]?.historyId ?? null)
          : state.selectedId;
      return { historyList, selectedId };
    });
  },
}));
