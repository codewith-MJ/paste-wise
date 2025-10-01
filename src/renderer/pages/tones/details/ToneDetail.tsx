import { useEffect, useState } from "react";
import NothingSelected from "./NothingSelected";
import ToneForm from "./ToneForm";
import { ToneItemUI } from "@/shared/types/tone";

type ToneDetailProps = { selectedId: string };

function ToneDetail({ selectedId }: ToneDetailProps) {
  const [tone, setTone] = useState<ToneItemUI | null>(null);

  useEffect(() => {
    if (!selectedId) {
      setTone(null);
      return;
    }

    window.api.tone.get(selectedId).then((data: ToneItemUI) => setTone(data));
  }, [selectedId]);

  if (!selectedId || !tone) {
    return <NothingSelected />;
  }

  return (
    <section className="relative flex-1 overflow-y-auto bg-white">
      <ToneForm
        name={tone.toneName}
        prompt={tone.tonePrompt!}
        strength={tone.toneStrength!}
        useEmoji={tone.emojiAllowed!}
        isDefault={tone.isDefault}
      />

      <div className="border-t border-gray-100 py-3">
        <div className="mx-auto flex max-w-3xl justify-end gap-2 px-8 py-3">
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            삭제
          </button>
          <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
            저장
          </button>
        </div>
      </div>
    </section>
  );
}

export default ToneDetail;
