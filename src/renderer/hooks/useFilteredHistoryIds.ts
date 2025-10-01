import { useMemo } from "react";
import { useHistoryStore } from "@/renderer/stores/history";
import toMs from "@/shared/utils/to-ms";
import { ALL_TONE } from "@/shared/constants/tone";

type Filters = {
  sortOrder: "desc" | "asc";
  isTranslation: boolean;
  tone: string;
};

function useFilteredHistoryIds(searchKeyword: string, filters: Filters) {
  const historyList = useHistoryStore((s) => s.historyList);

  return useMemo(() => {
    const q = searchKeyword.trim().toLowerCase();

    const filtered = historyList.filter((item) => {
      if (q && !item.originalText.toLowerCase().includes(q)) return false;
      if (filters.isTranslation && !item.isTranslated) return false;
      if (filters.tone !== ALL_TONE && item.toneName !== filters.tone)
        return false;
      return true;
    });

    const sorted = filtered.slice().sort((a, b) => {
      const diff = toMs(a.createdAt) - toMs(b.createdAt);
      return filters.sortOrder === "asc" ? diff : -diff;
    });

    return sorted.map((item) => item.historyId);
  }, [historyList, searchKeyword, filters]);
}

export default useFilteredHistoryIds;
