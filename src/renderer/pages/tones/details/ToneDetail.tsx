import { useEffect, useState } from "react";
import { tonesMock as tones } from "@/renderer/mocks/tones";

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
    return (
      <section className="flex-1 overflow-y-auto">
        <div className="p-8 text-gray-500">선택된 말투가 없습니다.</div>
      </section>
    );
  }

  return (
    <section className="relative flex-1 overflow-y-auto bg-white">
      <div className="mx-auto max-w-3xl px-8 py-6">
        <div className="space-y-6">
          <div className="grid grid-cols-[140px_1fr] items-center px-2">
            <label className="text-base font-medium text-gray-700">
              말투 이름
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 💖 Lovely Tone"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center px-2">
            <label className="text-base font-medium text-gray-700">
              기본 말투
            </label>
            <button
              onClick={() => setIsDefault((v) => !v)}
              aria-pressed={isDefault}
              className={`relative h-5 w-10 rounded-full transition-colors ${
                isDefault ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  isDefault ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-[140px_1fr] items-start px-2">
            <label className="pt-2 text-base font-medium text-gray-700">
              말투 설명
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              placeholder="예: 다정하고 따뜻한 말투로 답변합니다."
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="my-6 border-t border-gray-100" />

        <div className="mb-6 grid grid-cols-[140px_1fr] items-center px-2">
          <label className="text-base font-medium text-gray-700">
            적용 강도
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={100}
              value={strength}
              onChange={(e) => setStrength(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">
              {strength}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[140px_1fr] items-center px-2">
          <label className="text-base font-medium text-gray-700">
            이모지 사용
          </label>
          <button
            onClick={() => setUseEmoji((v) => !v)}
            aria-pressed={useEmoji}
            className={`relative h-5 w-10 rounded-full transition-colors ${
              useEmoji ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                useEmoji ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

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
