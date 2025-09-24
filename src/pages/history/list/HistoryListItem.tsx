import { Languages, Trash2 } from "lucide-react";
import ModeBadges from "@/components/ModeBadges";

type HistoryListItemProps = {
  id: string;
  content: string;
  hasTranslated: boolean;
  mode: string;
  time: string;
};

function HistoryListItem({
  id,
  content,
  hasTranslated,
  mode,
  time,
}: HistoryListItemProps) {
  return (
    <article
      key={id}
      className="rounded-xl border border-transparent bg-slate-50 p-3 hover:border-blue-300 hover:bg-blue-50"
    >
      <div className="flex items-start gap-3">
        <p className="line-clamp-2 min-w-0 flex-1 text-sm break-words text-slate-800">
          {content}
        </p>
        <button
          aria-label="삭제"
          className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        {hasTranslated && (
          <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-0.5 text-blue-700">
            <Languages size={14} />
          </span>
        )}
        <ModeBadges modeTitle={mode} />
        <span className="ml-auto tabular-nums">{time}</span>
      </div>
    </article>
  );
}

export default HistoryListItem;
