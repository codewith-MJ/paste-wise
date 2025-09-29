import { useMemo } from "react";
import HistoryListItem from "./HistoryListItem";
import { useHistoryStore } from "@/renderer/stores/history";
import NoSearchResults from "../NoSearchResults";
import toMs from "@/shared/utils/to-ms";

type Filters = {
  sortOrder: "desc" | "asc";
  isTranslation: boolean;
  tone: "모든 말투" | "정중한" | "캐주얼" | "격식 있는" | "다정한";
};

type HistoryListProps = {
  searchKeyword: string;
  filters: Filters;
};

function HistoryList({ searchKeyword, filters }: HistoryListProps) {
  const historyList = useHistoryStore((state) => state.historyList);

  const filteredSortedIds = useMemo(() => {
    let filteredSortedList = historyList.filter((item) => {
      if (
        searchKeyword &&
        !item.originalText.toLowerCase().includes(searchKeyword.trim())
      ) {
        return false;
      }

      if (filters.isTranslation && !item.isTranslated) {
        return false;
      }

      if (filters.tone !== "모든 말투" && item.toneTitle !== filters.tone) {
        return false;
      }

      return true;
    });

    filteredSortedList = filteredSortedList.slice().sort((a, b) => {
      const diff = toMs(a.createdAt) - toMs(b.createdAt);
      return filters.sortOrder === "asc" ? diff : -diff;
    });

    return filteredSortedList.map((item) => item.historyId);
  }, [historyList, searchKeyword, filters]);

  if (filteredSortedIds.length === 0) {
    return <NoSearchResults searchKeyword={searchKeyword} />;
  }

  return (
    <nav aria-label="History list" className="space-y-3 p-3">
      <ul className="space-y-3">
        {filteredSortedIds.map((historyId) => (
          <li key={historyId}>
            <HistoryListItem historyId={historyId} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default HistoryList;
