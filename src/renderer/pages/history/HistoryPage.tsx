import { useEffect, useState } from "react";
import PageHeader from "@/renderer/layouts/PageHeader";
import HistoryListToolBox from "./list/tool-box/HistoryListToolBox";
import HistoryList from "./list/HistoryList";
import HistoryDetail from "./details/HistoryDetail";
import { HistoryItemUI } from "@/shared/types/history";
import EmptyState from "./EmptyState";

function HistoryPage() {
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [isTranslation, setIsTranslation] = useState(false);
  const [tone, setTone] = useState<
    "모든 말투" | "정중한" | "캐주얼" | "격식 있는" | "다정한"
  >("모든 말투");
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

  const isEmpty = items.length === 0;

  const toggleSort = () => {
    setSortOrder((prevState) => (prevState === "desc" ? "asc" : "desc"));
  };

  const handleToggleTranslation = () => {
    setIsTranslation((prev) => !prev);
  };

  const onResetAll = () => {
    setIsTranslation(false);
    setTone("모든 말투");
  };

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      <PageHeader
        title="변환 기록"
        description="변환된 텍스트 기록을 확인하고 관리해보세요!"
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
