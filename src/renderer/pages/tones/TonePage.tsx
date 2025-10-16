import { useEffect, useState } from "react";
import PageHeader from "@/renderer/layouts/PageHeader";
import ToneDetail from "./details/ToneDetail";
import ToneList from "./list/ToneList";
import { ToneItemUI } from "@/shared/types/tone";
import { useAuthStore } from "@/renderer/stores/auth";

function TonePage() {
  const [selectedId, setSelectedId] = useState<string>("");
  const [tones, setTones] = useState<ToneItemUI[]>([]);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    window.api.tone.list().then((data: ToneItemUI[]) => {
      setTones(data);
      if (data.length > 0) {
        setSelectedId(data[0].toneId);
      }
    });
  }, []);

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      <PageHeader
        title={isAuthenticated ? "말투 설정" : "말투"}
        description={
          isAuthenticated
            ? "PasteWise에서는 다양한 말투로 문장을 다듬을 수 있어요. 나만의 말투를 설정하고 자유롭게 관리해보세요!"
            : "PasteWise에서는 다양한 말투로 문장을 다듬을 수 있어요. 로그인해서 나만의 말투를 직접 설정해보세요!"
        }
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <ToneList
          tones={tones}
          selectedId={selectedId}
          onSelectItem={(selectedId: string) => setSelectedId(selectedId)}
        />
        <ToneDetail selectedId={selectedId} />
      </div>
    </main>
  );
}

export default TonePage;
