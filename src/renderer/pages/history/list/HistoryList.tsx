import { useMemo } from "react";
import HistoryListItem from "./HistoryListItem";
import { useHistoryStore } from "@/renderer/stores/history";

type HistoryListProps = {
  searchKeyword: string;
};

function HistoryList({ searchKeyword }: HistoryListProps) {
  const historyList = useHistoryStore((state) => state.historyList);
  const searchedHistoryList = historyList.filter((history) =>
    history.originalText.toLowerCase().includes(searchKeyword.trim()),
  );

  const historyIds = useMemo(
    () => searchedHistoryList.map((item) => item.historyId),
    [searchedHistoryList],
  );

  return (
    <nav aria-label="History list" className="space-y-3 p-3">
      <ul className="space-y-3">
        {historyIds.map((historyId) => (
          <li key={historyId}>
            <HistoryListItem historyId={historyId} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default HistoryList;
