import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import PageHeader from "@/renderer/layouts/PageHeader";
import HistoryListToolBox from "./list/tool-box/HistoryListToolBox";
import HistoryList from "./list/HistoryList";
import HistoryDetail from "./details/HistoryDetail";
import EmptyState from "./EmptyState";

import { useHistoryStore } from "@/renderer/stores/history";
import useFilteredHistoryIds from "@/renderer/hooks/useFilteredHistoryIds";
import useHistoryControls from "@/renderer/hooks/useHistoryControls";
import useEffectiveTone from "@/renderer/hooks/useEffectiveTone";

function HistoryPage() {
  const { initAll, historyList, selectedId, toneOptions } = useHistoryStore(
    useShallow((s) => ({
      initAll: s.initAll,
      historyList: s.historyList,
      selectedId: s.selectedId,
      toneOptions: s.toneOptions,
    })),
  );

  useEffect(() => {
    initAll();
  }, [initAll]);

  const {
    filters,
    searchKeyword,
    handleSearchKeyword,
    toggleSort,
    toggleTranslation,
    changeTone,
    resetAll,
  } = useHistoryControls();

  const { dropdownTones, effectiveTone } = useEffectiveTone(
    filters.tone,
    toneOptions,
  );

  const filteredHistoryIds = useFilteredHistoryIds(searchKeyword, {
    ...filters,
    tone: effectiveTone,
  });

  const effectiveSelectedId = useMemo(() => {
    if (filteredHistoryIds.length === 0) return null;
    if (selectedId && filteredHistoryIds.includes(selectedId))
      return selectedId;
    return filteredHistoryIds[0] ?? null;
  }, [filteredHistoryIds, selectedId]);

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
              tone={effectiveTone}
              toneOptions={dropdownTones}
              onToggleSort={toggleSort}
              onToggleTranslation={toggleTranslation}
              onToneChange={changeTone}
              onResetAll={resetAll}
              onSearchKeywordChange={handleSearchKeyword}
            />

            <div className="flex-1 overflow-y-auto">
              <HistoryList
                searchKeyword={searchKeyword}
                ids={filteredHistoryIds}
                selectedId={effectiveSelectedId}
              />
            </div>
          </aside>

          {effectiveSelectedId && (
            <HistoryDetail selectedId={effectiveSelectedId} />
          )}
        </div>
      )}
    </main>
  );
}

export default HistoryPage;
