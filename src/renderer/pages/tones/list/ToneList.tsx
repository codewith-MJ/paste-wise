import { useState } from "react";
import { ToneItemUI } from "@/shared/types/tone";
import SearchBar from "../../../components/SearchBar";
import ToneListItem from "./ToneListItem";

type ToneListProps = {
  selectedId: string;
  onSelectItem: (selectedId: string) => void;
};

function ToneList({ selectedId, onSelectItem }: ToneListProps) {
  const [searchKeyword, setSearchKeyword] = useState("");

  const tones: ToneItemUI[] = [
    { toneId: "polite", toneTitle: "👨‍💼Polite Tone", isDefault: true },
    { toneId: "casual", toneTitle: "🤙Casual Tone", isDefault: false },
    { toneId: "formal", toneTitle: "👔Formal Tone", isDefault: false },
    { toneId: "lovely", toneTitle: "💖Lovely Tone", isDefault: false },
  ];

  const handleSearchKeyword = (value: string) => {
    setSearchKeyword(value);
  };

  const filteredTones = tones.filter((tone) =>
    tone.toneTitle.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <aside className="flex min-h-0 w-96 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="sticky top-0 z-10 shrink-0 px-4 pt-4 pb-0">
        <SearchBar
          onSearchKeywordChange={handleSearchKeyword}
          placeHolder={"말투 이름으로 검색..."}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-1">
        <div className="space-y-2">
          {filteredTones.map((tone) => (
            <ToneListItem
              key={tone.toneId}
              tone={tone}
              selectedId={selectedId}
              onSelectItem={onSelectItem}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default ToneList;
