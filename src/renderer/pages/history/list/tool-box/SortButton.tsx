import { ArrowDown, ArrowUp } from "lucide-react";

type Props = {
  order: "desc" | "asc";
  onToggle: () => void;
};

function SortButton({ order, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
      title={order === "desc" ? "Newest first (↑/↓)" : "Oldest first (↑/↓)"}
    >
      {order === "desc" ? (
        <>
          <ArrowDown className="h-4 w-4" />
          <span>최신순</span>
        </>
      ) : (
        <>
          <ArrowUp className="h-4 w-4" />
          <span>오래된순</span>
        </>
      )}
    </button>
  );
}

export default SortButton;
