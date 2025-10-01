import { useMemo, useState } from "react";
import { ToneItemUI } from "@/shared/types/tone";
import SearchBar from "../../../components/SearchBar";
import ToneListItem from "./ToneListItem";
import NoSearchResults from "@/renderer/components/NoSearchResults";

type ToneListProps = {
  tones: ToneItemUI[];
  selectedId: string;
  onSelectItem: (selectedId: string) => void;
};

function ToneList({ tones, selectedId, onSelectItem }: ToneListProps) {
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredTones = useMemo(() => {
    const q = searchKeyword.toLowerCase().trim();
    return tones.filter((tone) => tone.toneTitle.toLowerCase().includes(q));
  }, [tones, searchKeyword]);

  const handleSearchKeyword = (searchKeyword: string) => {
    setSearchKeyword(searchKeyword);
    const q = searchKeyword.toLowerCase().trim();
    const searchedList = tones.filter((tone) =>
      tone.toneTitle.toLowerCase().includes(q),
    );
    if (searchedList.length > 0) {
      onSelectItem(searchedList[0].toneId);
    } else {
      onSelectItem("");
    }
  };

  return (
    <aside className="flex min-h-0 w-96 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="sticky top-0 z-10 shrink-0 px-4 pt-4 pb-0">
        <SearchBar
          onSearchKeywordChange={handleSearchKeyword}
          placeHolder={"말투 이름으로 검색..."}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-1">
        {filteredTones.length === 0 ? (
          <NoSearchResults searchKeyword={searchKeyword} />
        ) : (
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
        )}
      </div>
    </aside>
  );
}

export default ToneList;
