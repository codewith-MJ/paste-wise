import DetailField from "./DetailField";

type ToneFormProps = {
  title: string;
  prompt: string;
  strength: number;
  useEmoji: boolean;
  isDefault: boolean;
};

function ToneForm({
  title,
  prompt,
  strength,
  useEmoji,
  isDefault,
}: ToneFormProps) {
  return (
    <div className="mx-auto max-w-3xl px-8 py-4">
      <div className="space-y-6">
        <DetailField labelName="말투 이름">
          <input
            type="text"
            value={title}
            placeholder="예: 💖 다정한 말투"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </DetailField>

        <DetailField labelName="기본 말투">
          <button
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
        </DetailField>

        <DetailField labelName="말투 설명">
          <textarea
            value={prompt}
            rows={5}
            placeholder="예: 다정하고 따뜻한 말투로 답변합니다."
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </DetailField>
      </div>

      <div className="my-6 border-t border-gray-100" />

      <DetailField labelName="적용 강도">
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={100}
            value={strength}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-blue-500"
          />
          <span className="text-sm font-medium text-gray-900">{strength}%</span>
        </div>
      </DetailField>

      <DetailField labelName="이모지 사용">
        <button
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
      </DetailField>
    </div>
  );
}

export default ToneForm;
