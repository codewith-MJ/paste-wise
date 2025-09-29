import { useEffect, useState } from "react";
import PageHeader from "@/renderer/layouts/PageHeader";
import HistoryListToolBox from "./list/tool-box/HistoryListToolBox";
import HistoryList from "./list/HistoryList";
import HistoryDetail from "./details/HistoryDetail";
import { HistoryItemUI } from "@/shared/types/history";
import EmptyState from "./EmptyState";

function HistoryPage() {
  const [filters, setFilters] = useState({
    sortOrder: "desc" as "desc" | "asc",
    isTranslation: false,
    tone: "모든 말투" as
      | "모든 말투"
      | "정중한"
      | "캐주얼"
      | "격식 있는"
      | "다정한",
  });
  const [items, setItems] = useState<HistoryItemUI[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    window.api.history
      .list()
      .then((response) => {
        setItems(response);
        if (response.length > 0) {
          setSelectedId(response[0].historyId);
        }
      })
      .catch((error) => {
        console.error("history list error", error);
      });
  }, []);

  const toggleSort = () => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "desc" ? "asc" : "desc",
    }));
  };

  const toggleTranslation = () => {
    setFilters((prev) => ({ ...prev, isTranslation: !prev.isTranslation }));
  };

  const changeTone = (newTone: typeof filters.tone) => {
    setFilters((prev) => ({ ...prev, tone: newTone }));
  };

  const resetAll = () => {
    setFilters({ sortOrder: "desc", isTranslation: false, tone: "모든 말투" });
  };

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      <PageHeader
        title="변환 기록"
        description="변환된 텍스트 기록을 확인하고 관리해보세요!"
      />

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <aside className="flex min-h-0 w-90 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
            <HistoryListToolBox
              sortOrder={filters.sortOrder}
              isTranslation={filters.isTranslation}
              tone={filters.tone}
              onToggleSort={toggleSort}
              onToggleTranslation={toggleTranslation}
              onToneChange={changeTone}
              onResetAll={resetAll}
            />
            <div className="flex-1 overflow-y-auto">
              <HistoryList
                items={items}
                selectedId={selectedId}
                onSelect={(id: string) => setSelectedId(id)}
              />
            </div>
          </aside>
          {selectedId && <HistoryDetail selectedId={selectedId} />}
        </div>
      )}
    </main>
  );
}

export default HistoryPage;
