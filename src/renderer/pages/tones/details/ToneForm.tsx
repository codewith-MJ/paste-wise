import DetailField from "./DetailField";

type ToneFormProps = {
  editable?: boolean;

  name: string;
  prompt: string;
  strength: number;
  useEmoji: boolean;
  isDefault: boolean;

  onNameChange: (v: string) => void;
  onPromptChange: (v: string) => void;
  onStrengthChange: (v: number) => void;
  onUseEmojiChange: (v: boolean) => void;
  onIsDefaultChange: (v: boolean) => void;
};

function ToneForm({
  editable = true,
  name,
  prompt,
  strength,
  useEmoji,
  isDefault,
  onNameChange,
  onPromptChange,
  onStrengthChange,
  onUseEmojiChange,
  onIsDefaultChange,
}: ToneFormProps) {
  const readOnlyFieldCls = !editable ? "bg-gray-50 cursor-default" : "";

  return (
    <div className="mx-auto max-w-3xl px-8 py-4">
      <div className="space-y-6">
        <DetailField labelName="말투 이름">
          <input
            type="text"
            value={name}
            onChange={(e) => editable && onNameChange(e.target.value)}
            placeholder="예: 💖 다정한 말투"
            readOnly={!editable}
            tabIndex={!editable ? -1 : 0}
            title={!editable ? "로그인하면 수정할 수 있어요" : undefined}
            className={[
              "w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none",
              readOnlyFieldCls,
            ].join(" ")}
          />
        </DetailField>

        <DetailField labelName="기본 말투">
          <button
            type="button"
            aria-pressed={isDefault}
            aria-disabled={!editable}
            disabled={!editable}
            title={!editable ? "로그인하면 변경할 수 있어요" : undefined}
            className={[
              "relative h-5 w-10 rounded-full transition-colors",
              isDefault ? "bg-blue-500" : "bg-gray-300",
              !editable ? "cursor-not-allowed opacity-60" : "",
            ].join(" ")}
            onClick={() => editable && onIsDefaultChange(!isDefault)}
          >
            <span
              className={[
                "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform",
                isDefault ? "translate-x-5" : "translate-x-0",
              ].join(" ")}
            />
          </button>
        </DetailField>

        <DetailField labelName="말투 설명">
          <textarea
            value={prompt}
            onChange={(e) => editable && onPromptChange(e.target.value)}
            rows={5}
            placeholder="예: 다정하고 따뜻한 말투로 답변합니다."
            readOnly={!editable}
            tabIndex={!editable ? -1 : 0}
            title={!editable ? "로그인하면 수정할 수 있어요" : undefined}
            className={[
              "w-full resize-none rounded-lg border border-gray-200 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none",
              readOnlyFieldCls,
            ].join(" ")}
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
            onChange={(e) =>
              editable && onStrengthChange(Number(e.target.value))
            }
            disabled={!editable}
            title={!editable ? "로그인하면 조절할 수 있어요" : undefined}
            className={[
              "h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-blue-500",
              !editable ? "cursor-not-allowed opacity-60" : "",
            ].join(" ")}
          />
          <span className="text-sm font-medium text-gray-900">{strength}%</span>
        </div>
      </DetailField>

      <DetailField labelName="이모지 사용">
        <button
          type="button"
          aria-pressed={useEmoji}
          aria-disabled={!editable}
          disabled={!editable}
          title={!editable ? "로그인하면 변경할 수 있어요" : undefined}
          className={[
            "relative h-5 w-10 rounded-full transition-colors",
            useEmoji ? "bg-blue-500" : "bg-gray-300",
            !editable ? "cursor-not-allowed opacity-60" : "",
          ].join(" ")}
          onClick={() => editable && onUseEmojiChange(!useEmoji)}
        >
          <span
            className={[
              "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform",
              useEmoji ? "translate-x-5" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </DetailField>
    </div>
  );
}

export default ToneForm;
