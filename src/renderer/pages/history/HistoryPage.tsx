import { useEffect, useState } from "react";
import PageHeader from "@/renderer/layouts/PageHeader";
import HistoryListToolBox from "./list/tool-box/HistoryListToolBox";
import HistoryList from "./list/HistoryList";
import HistoryDetail from "./details/HistoryDetail";
import EmptyState from "./EmptyState";
import { useHistoryStore } from "@/renderer/stores/history";

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

  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchList = useHistoryStore((state) => state.fetchList);
  const historyList = useHistoryStore((state) => state.historyList);
  const selectedId = useHistoryStore((state) => state.selectedId);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleSearchKeyword = (searchKeyword: string) =>
    setSearchKeyword(searchKeyword);

  const toggleSort = () =>
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "desc" ? "asc" : "desc",
    }));

  const toggleTranslation = () =>
    setFilters((prev) => ({ ...prev, isTranslation: !prev.isTranslation }));

  const changeTone = (tone: typeof filters.tone) =>
    setFilters((prev) => ({ ...prev, tone }));

  const resetAll = () =>
    setFilters({ sortOrder: "desc", isTranslation: false, tone: "모든 말투" });

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      <PageHeader
        title="변환 기록"
        description="변환된 텍스트 기록을 확인하고 관리해보세요!"
      />

      {historyList.length === 0 ? (
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
              onSearchKeywordChange={handleSearchKeyword}
            />
            <div className="flex-1 overflow-y-auto">
              <HistoryList searchKeyword={searchKeyword} filters={filters} />
            </div>
          </aside>

          {selectedId && <HistoryDetail selectedId={selectedId} />}
        </div>
      )}
    </main>
  );
}

export default HistoryPage;
