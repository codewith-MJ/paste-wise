import { useCallback, useState } from "react";
import PageHeader from "@/layouts/PageHeader";
import HistoryListToolBox from "./list/tool-box/HistoryListToolBox";
import HistoryList from "./list/HistoryList";
import HistoryDetail from "./details/HistoryDetail";
import { HistoryItem } from "@/types/history-item";
import EmptyState from "./EmptyState";

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

  const mock: HistoryItem | null = null;

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      <PageHeader
        title="History"
        description="View and manage your text transformations"
      />

      {!mock ? (
        <EmptyState />
      ) : (
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

          <HistoryDetail item={mock} />
        </div>
      )}
    </main>
  );
}

export default HistoryPage;
