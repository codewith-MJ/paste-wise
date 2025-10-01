import HistoryListItem from "./HistoryListItem";
import NoSearchResults from "@/renderer/components/NoSearchResults";

type HistoryListProps = {
  ids: string[];
  searchKeyword: string;
  selectedId: string | null;
};

function HistoryList({ ids, searchKeyword, selectedId }: HistoryListProps) {
  if (ids.length === 0) {
    return <NoSearchResults searchKeyword={searchKeyword} />;
  }
  return (
    <nav aria-label="History list" className="space-y-3 p-3">
      <ul className="space-y-3">
        {ids.map((historyId) => (
          <li key={historyId}>
            <HistoryListItem historyId={historyId} selectedId={selectedId} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default HistoryList;
