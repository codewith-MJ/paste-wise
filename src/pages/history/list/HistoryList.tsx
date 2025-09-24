import HistoryListItem from "./HistoryListItem";
import { HistoryItem } from "@/types/history-item";

type HistoryListProps = {
  items: HistoryItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function HistoryList({ items, selectedId, onSelect }: HistoryListProps) {
  return (
    <nav aria-label="History list" className="space-y-3 p-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className="w-full text-left"
        >
          <HistoryListItem
            id={item.id}
            content={item.original}
            hasTranslated={item.isTranslated}
            mode={item.mode}
            time={item.createdAt}
            isActive={selectedId === item.id}
          />
        </button>
      ))}
    </nav>
  );
}

export default HistoryList;
