import { create } from "zustand";
import type { HistoryItemUI } from "@/shared/types/history";

type HistoryState = {
  historyList: HistoryItemUI[];
  selectedId: string | null;
  toneOptions: string[];
  error: string | null;

  initAll: () => Promise<void>;

  loadToneOptions: (reload?: boolean) => Promise<void>;
  handleSelectedId: (id: string | null) => void;
  deleteHistory: (id: string) => Promise<void>;
};

export const useHistoryStore = create<HistoryState>((set, get) => ({
  historyList: [],
  selectedId: null,
  toneOptions: [],
  error: null,

  initAll: async () => {
    set({ error: null });
    try {
      const [list, tones] = await Promise.all([
        window.api.history.list(),
        window.api.history.dropdownList(),
      ]);

      set({
        historyList: list,
        selectedId: list[0]?.historyId ?? null,
        toneOptions: tones,
      });
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },

  loadToneOptions: async (reload = false) => {
    const { toneOptions } = get();
    if (!reload && toneOptions.length > 0) return;
    try {
      const list: string[] = await window.api.history.dropdownList();
      set({ toneOptions: list });
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },

  handleSelectedId: (id) =>
    set((s) => (s.selectedId === id ? s : { selectedId: id })),

  deleteHistory: async (id: string) => {
    if (!id) return;
    await window.api.history.delete(id);

    const tones = await window.api.history.dropdownList();

    set((state) => {
      const historyList = state.historyList.filter((it) => it.historyId !== id);
      const selectedId =
        state.selectedId === id
          ? (historyList[0]?.historyId ?? null)
          : state.selectedId;

      return {
        historyList,
        selectedId,
        toneOptions: tones,
      };
    });
  },
}));
