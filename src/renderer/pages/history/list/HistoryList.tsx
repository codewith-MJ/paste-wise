import HistoryListItem from "./HistoryListItem";
import { HistoryItemUI } from "@/shared/types/history";

type HistoryListProps = {
  items: HistoryItemUI[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

function HistoryList({
  items,
  selectedId,
  onSelect,
  onDelete,
}: HistoryListProps) {
  return (
    <nav aria-label="History list" className="space-y-3 p-3">
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.historyId}
            onClick={() => onSelect(item.historyId)}
            className="w-full text-left"
          >
            <HistoryListItem
              historyId={item.historyId}
              originalText={item.originalText}
              isTranslated={item.isTranslated}
              languageIn={item.languageIn}
              languageOut={item.languageOut}
              toneTitle={item.toneTitle}
              createdAt={item.createdAt}
              isActive={selectedId === item.historyId}
              onDelete={() => onDelete(item.historyId)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default HistoryList;
