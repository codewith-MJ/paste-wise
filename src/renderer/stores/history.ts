import { create } from "zustand";
import type { HistoryItemUI } from "@/shared/types/history";

type HistoryState = {
  historyList: HistoryItemUI[];
  selectedId: string | null;
  fetchList: () => Promise<void>;
  handleSelectedId: (id: string | null) => void;
  deleteHistory: (id: string) => Promise<void>;
  error: string | null;

  toneOptions: string[];
  loadToneOptions: (reload?: boolean) => Promise<void>;
};

const useHistoryStore = create<HistoryState>((set, get) => ({
  historyList: [],
  selectedId: null,
  error: null,
  toneOptions: [],

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

  loadToneOptions: async (reload = false) => {
    const { toneOptions } = get();
    if (!reload && toneOptions.length > 0) {
      return;
    }

    try {
      const list: string[] = await window.api.history.dropdownList();
      set({ toneOptions: list });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));

export { useHistoryStore };
