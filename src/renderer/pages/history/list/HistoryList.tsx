import HistoryListItem from "./HistoryListItem";
import { HistoryItemUI } from "@/shared/types/history";

type HistoryListProps = {
  items: HistoryItemUI[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function HistoryList({ items, selectedId, onSelect }: HistoryListProps) {
  return (
    <nav aria-label="History list" className="space-y-3 p-3">
      {items.map((item) => (
        <button
          key={item.historyId}
          onClick={() => onSelect(item.historyId)}
          className="w-full text-left"
        >
          <HistoryListItem
            historyId={item.historyId}
            originalText={item.originalText}
            isTranslated={item.isTranslated}
            toneTitle={item.toneTitle}
            createdAt={item.createdAt}
            isActive={selectedId === item.historyId}
          />
        </button>
      ))}
    </nav>
  );
}

export default HistoryList;
