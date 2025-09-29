import { useMemo } from "react";
import HistoryListItem from "./HistoryListItem";
import { useHistoryStore } from "@/renderer/stores/history";

function HistoryList() {
  const historyList = useHistoryStore((state) => state.historyList);

  const historyIds = useMemo(
    () => historyList.map((it) => it.historyId),
    [historyList],
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
