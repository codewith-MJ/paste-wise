import { memo } from "react";
import { Trash2 } from "lucide-react";
import ToneBadge from "@/renderer/components/ToneBadge";
import { useHistoryStore } from "@/renderer/stores/history";
import TranslationBadge from "@/renderer/components/TranslationBadge";
import TimeAgo from "./TimeAgo";

type HistoryListItemProps = { historyId: string };

function HistoryListItem({ historyId }: HistoryListItemProps) {
  const historyListItem = useHistoryStore((state) =>
    state.historyList.find((it) => it.historyId === historyId),
  );
  const isActive = useHistoryStore((state) => state.selectedId === historyId);
  const handleSelectedId = useHistoryStore((state) => state.handleSelectedId);
  const deleteHistory = useHistoryStore((state) => state.deleteHistory);

  if (!historyListItem) return null;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => handleSelectedId(historyId)}
      aria-selected={isActive}
      className={`rounded-xl border p-3 ${
        isActive
          ? "border-blue-300 bg-blue-50"
          : "border-transparent bg-slate-50 hover:border-blue-300 hover:bg-blue-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <p className="line-clamp-2 min-w-0 flex-1 text-sm break-words text-slate-800">
          {historyListItem.originalText}
        </p>
        <button
          type="button"
          aria-label="삭제"
          className="cursor-pointer rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            deleteHistory(historyId);
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        {historyListItem.isTranslated &&
          historyListItem.languageIn &&
          historyListItem.languageOut && (
            <TranslationBadge
              languageIn={historyListItem.languageIn}
              languageOut={historyListItem.languageOut}
            />
          )}
        {historyListItem.toneTitle && (
          <ToneBadge toneTitle={historyListItem.toneTitle} />
        )}
        <TimeAgo createdAt={historyListItem.createdAt} />
      </div>
    </article>
  );
}
export default memo(HistoryListItem);
