import { ToneItemUI } from "@/shared/types/tone";

type ToneListItemProps = {
  tone: ToneItemUI;
  selectedId: string;
  onSelectItem: (selectedId: string) => void;
};

function ToneListItem({ tone, selectedId, onSelectItem }: ToneListItemProps) {
  return (
    <button
      key={tone.toneId}
      onClick={() => onSelectItem(tone.toneId)}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
        selectedId === tone.toneId
          ? "border-2 border-blue-200 bg-blue-50"
          : "border-2 border-gray-100 bg-white hover:border-gray-200"
      }`}
    >
      <span className="text-2xl">{tone.isDefault}</span>
      <span className="text-base font-medium text-gray-900">
        {tone.toneTitle}
      </span>
    </button>
  );
}

export default ToneListItem;
