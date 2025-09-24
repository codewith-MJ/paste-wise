import { useCallback, useState } from "react";
import PageHeader from "@/renderer/layouts/PageHeader";
import HistoryListToolBox from "./list/tool-box/HistoryListToolBox";
import HistoryList from "./list/HistoryList";
import HistoryDetail from "./details/HistoryDetail";
import { HistoryItem } from "@/shared/types/history-item";
import EmptyState from "./EmptyState";
import { mockHistory } from "@/renderer/mocks/history";

function HistoryPage() {
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [isTranslation, setIsTranslation] = useState(false);
  const [tone, setTone] = useState<
    "All Tones" | "Polite" | "Casual" | "Formal" | "Friendly"
  >("All Tones");
  const [selectedId, setSelectedId] = useState<string | null>(
    mockHistory.length > 0 ? mockHistory[0].id : null,
  );
  const isEmpty = mockHistory.length === 0;

  const toggleSort = () => {
    setSortOrder((prevState) => (prevState === "desc" ? "asc" : "desc"));
  };

  const handleToggleTranslation = () => {
    setIsTranslation((prev) => !prev);
  };

  const onResetAll = () => {
    setIsTranslation(false);
    setTone("All Tones");
  };

  const selectedItem: HistoryItem | null =
    mockHistory.find((item) => item.id === selectedId) ??
    mockHistory[0] ??
    null;

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      <PageHeader
        title="History"
        description="View and manage your text transformations"
      />

      {isEmpty ? (
        <EmptyState />
      ) : (
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <aside className="flex min-h-0 w-90 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
            <HistoryListToolBox
              sortOrder={sortOrder}
              onToggleSort={toggleSort}
              isTranslation={isTranslation}
              onToggleTranslation={handleToggleTranslation}
              tone={tone}
              onToneChange={(newTone: typeof tone) => {
                setTone(newTone);
              }}
              onResetAll={onResetAll}
            />
            <div className="flex-1 overflow-y-auto">
              <HistoryList
                items={mockHistory}
                selectedId={selectedId}
                onSelect={(id: string) => setSelectedId(id)}
              />
            </div>
          </aside>

          <HistoryDetail item={selectedItem} />
        </div>
      )}
    </main>
  );
}

export default HistoryPage;
