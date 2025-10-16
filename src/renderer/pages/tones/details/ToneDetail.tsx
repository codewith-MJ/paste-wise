import { useEffect, useState } from "react";
import NothingSelected from "./NothingSelected";
import ToneForm from "./ToneForm";
import { ToneItemUI } from "@/shared/types/tone";
import { useAuthStore } from "@/renderer/stores/auth";

type ToneDetailProps = { selectedId: string };

function ToneDetail({ selectedId }: ToneDetailProps) {
  const { isAuthenticated } = useAuthStore();

  const [tone, setTone] = useState<ToneItemUI | null>(null);
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [strength, setStrength] = useState(50);
  const [useEmoji, setUseEmoji] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (!selectedId) {
      setTone(null);
      return;
    }
    window.api.tone.get(selectedId).then((data: ToneItemUI) => {
      setTone(data);
      setName(data.toneName);
      setPrompt(data.tonePrompt ?? "");
      setStrength(data.toneStrength ?? 50);
      setUseEmoji(Boolean(data.emojiAllowed));
      setIsDefault(Boolean(data.isDefault));
    });
  }, [selectedId]);

  if (!selectedId || !tone) return <NothingSelected />;

  return (
    <section className="relative flex-1 overflow-y-auto bg-white">
      <ToneForm
        editable={isAuthenticated}
        name={name}
        prompt={prompt}
        strength={strength}
        useEmoji={useEmoji}
        isDefault={isDefault}
        onNameChange={setName}
        onPromptChange={setPrompt}
        onStrengthChange={setStrength}
        onUseEmojiChange={setUseEmoji}
        onIsDefaultChange={setIsDefault}
      />

      {isAuthenticated && (
        <div className="border-t border-gray-100 py-3">
          <div className="mx-auto flex max-w-3xl justify-end gap-2 px-8 py-3">
            <button className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              삭제
            </button>
            <button className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
              저장
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ToneDetail;
