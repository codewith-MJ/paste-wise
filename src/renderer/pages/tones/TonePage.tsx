import { useEffect, useState } from "react";
import PageHeader from "@/renderer/layouts/PageHeader";
import ToneDetail from "./details/ToneDetail";
import ToneList from "./list/ToneList";
import { ToneItemUI } from "@/shared/types/tone";

function TonePage() {
  const [selectedId, setSelectedId] = useState<string>("");
  const [tones, setTones] = useState<ToneItemUI[]>([]);

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
        title="말투 설정"
        description="원하는 말투를 선택하고 나만의 스타일을 설정해보세요!"
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
