import { useEffect, useState } from "react";
import { tonesMock as tones } from "@/renderer/mocks/tones";
import NothingSelected from "./NothingSelected";
import ToneForm from "./ToneForm";

type ToneDetailProps = { selectedId: string };

function ToneDetail({ selectedId }: ToneDetailProps) {
  const tone = tones.find((t) => t.toneId === selectedId);

  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [strength, setStrength] = useState(60);
  const [useEmoji, setUseEmoji] = useState(true);
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (!tone) return;
    setTitle(tone.toneTitle ?? "");
    setPrompt(tone.tonePrompt ?? "");
    setStrength(typeof tone.toneStrength === "number" ? tone.toneStrength : 60);
    setUseEmoji(!!tone.emojiAllowed);
    setIsDefault(tone.isDefault);
  }, [tone?.toneId]);

  if (!tone) {
    return <NothingSelected />;
  }

  return (
    <section className="relative flex-1 overflow-y-auto bg-white">
      <ToneForm
        title={title}
        prompt={prompt}
        strength={strength}
        useEmoji={useEmoji}
        isDefault={isDefault}
        onChangeTitle={setTitle}
        onChangePrompt={setPrompt}
        onChangeStrength={setStrength}
        onToggleEmoji={() => setUseEmoji((value) => !value)}
        onToggleDefault={() => setIsDefault((value) => !value)}
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
