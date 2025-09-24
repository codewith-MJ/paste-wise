import { Filter, Languages } from "lucide-react";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";
import FilterChip from "./FilterChip";
import ToneDropdown, { Tone } from "./ToneDropdown";

type Props = {
  sortOrder: "desc" | "asc";
  onToggleSort: () => void;
  isTranslation: boolean;
  onToggleTranslation: (v: boolean) => void;
  tone: Tone;
  onToneChange: (tone: Tone) => void;
  onResetAll: () => void;
};

function HistoryListToolBox({
  sortOrder,
  onToggleSort,
  isTranslation,
  onToggleTranslation,
  tone,
  onToneChange,
  onResetAll,
}: Props) {
  const isAllActive = !isTranslation && tone === "All Tones";

  return (
    <div className="sticky top-0 z-10 mt-2 space-y-2 border-b border-gray-200 bg-white p-3">
      <SearchBar />

      <div className="flex flex-wrap items-center gap-2">
        <SortButton order={sortOrder} onToggle={onToggleSort} />

        <FilterChip
          active={isAllActive}
          onClick={onResetAll}
          title="All (reset filters)"
        >
          <Filter size={12} />
          All
        </FilterChip>

        <FilterChip
          active={isTranslation}
          onClick={() => onToggleTranslation(!isTranslation)}
          title="Translation"
        >
          <Languages size={14} />
        </FilterChip>

        <ToneDropdown value={tone} onChange={onToneChange} />
      </div>
    </div>
  );
}

export default HistoryListToolBox;
