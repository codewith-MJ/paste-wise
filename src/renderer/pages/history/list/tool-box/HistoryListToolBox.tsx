import { Filter, Languages } from "lucide-react";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";
import FilterChip from "./FilterChip";
import ToneDropdown from "./ToneDropdown";
import { ALL_TONE } from "@/shared/constants/tone";

type Props = {
  sortOrder: "desc" | "asc";
  onToggleSort: () => void;
  isTranslation: boolean;
  onToggleTranslation: () => void;
  tone: string;
  onToneChange: (tone: string) => void;
  onResetAll: () => void;
  onSearchKeywordChange: (searchKeyword: string) => void;
  toneOptions: string[];
};

function HistoryListToolBox({
  sortOrder,
  onToggleSort,
  isTranslation,
  onToggleTranslation,
  tone,
  onToneChange,
  onResetAll,
  onSearchKeywordChange,
  toneOptions,
}: Props) {
  const isAllActive = !isTranslation && tone === ALL_TONE;

  return (
    <div className="sticky top-0 z-10 mt-2 space-y-2 border-b border-gray-200 bg-white p-3">
      <SearchBar onSearchKeywordChange={onSearchKeywordChange} />

      <div className="flex flex-wrap items-center gap-2">
        <SortButton order={sortOrder} onToggle={onToggleSort} />

        <FilterChip
          active={isAllActive}
          onClick={onResetAll}
          title="All (reset filters)"
        >
          <Filter size={12} />
          전체
        </FilterChip>

        <FilterChip
          active={isTranslation}
          onClick={onToggleTranslation}
          title="Translation"
        >
          <Languages size={14} />
        </FilterChip>

        <ToneDropdown
          value={tone}
          options={toneOptions}
          onChange={onToneChange}
        />
      </div>
    </div>
  );
}

export default HistoryListToolBox;
