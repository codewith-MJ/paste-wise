import { useCallback, useState } from "react";
import PageHeader from "@/layouts/PageHeader";
import HistoryListToolBox from "./list/tool-box/HistoryListToolBox";
import HistoryList from "./list/HistoryList";
import HistoryDetails from "./details/HistoryDetails";
import { HistoryItem } from "@/types/history-item";

function HistoryPage() {
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [isTranslation, setIsTranslation] = useState(false);
  const [tone, setTone] = useState<
    "All Tones" | "Polite" | "Casual" | "Formal" | "Friendly"
  >("All Tones");

  const toggleSort = () => {
    setSortOrder((prevState) => (prevState === "desc" ? "asc" : "desc"));
  };
  const handleToneChange = (newTone: typeof tone) => {
    setTone(newTone);
  };
  const handleToggleTranslation = () => {
    setIsTranslation((prev) => !prev);
  };

  const onResetAll = useCallback(() => {
    setIsTranslation(false);
    setTone("All Tones");
  }, []);

  const mock: HistoryItem = {
    id: "1",
    createdAt: "2025-09-23 14:32",
    mode: "Polite Tone",
    strength: "High (75%)",
    emoji: true,
    original:
      "Hello, could you please send me the project details by tomorrow morning? I would really appreciate it.",
    transformed:
      "안녕하세요, 내일 아침까지 프로젝트 세부사항을 보내주시면 정말 감사하겠습니다. 🙏",
  };

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      <PageHeader
        title={"History"}
        description={"View and manage your texat transformations"}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="w-90 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
          <HistoryListToolBox
            sortOrder={sortOrder}
            onToggleSort={toggleSort}
            isTranslation={isTranslation}
            onToggleTranslation={handleToggleTranslation}
            tone={tone}
            onToneChange={handleToneChange}
            onResetAll={onResetAll}
          />
          <HistoryList />
        </aside>

        <HistoryDetails item={mock} />
      </div>
    </main>
  );
}

export default HistoryPage;
