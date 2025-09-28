import { Languages } from "lucide-react";
import ToneBadge from "@/renderer/components/ToneBadge";
import MetaItem from "./MetaItem";

type DetailsHeaderProps = {
  title?: string;
  createdAt: string;
  toneTitle?: string;
  toneStrength?: number;
  emojiAllowed: boolean;
  isTranslated: boolean;
};

function DetailsHeader({
  title = "History Details",
  createdAt,
  toneTitle,
  toneStrength,
  emojiAllowed,
  isTranslated,
}: DetailsHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white px-6 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <time className="rounded-lg bg-gray-50 px-3 py-1 text-sm text-gray-500">
          🕑 {createdAt}
        </time>
      </div>

      <div className="flex items-center divide-x divide-gray-200 text-sm text-gray-700">
        <MetaItem label="Tone" className="gap-2 pr-3">
          {toneTitle && <ToneBadge toneTitle={toneTitle} />}
        </MetaItem>

        {isTranslated ? (
          <span className="flex items-center px-3">
            <Languages className="h-5 w-5" />
          </span>
        ) : null}

        <MetaItem label="Strength" className="px-3">
          <span className="text-gray-600">{toneStrength}</span>
        </MetaItem>

        <MetaItem label="Emoji" className="pl-3">
          {emojiAllowed ? "✔️" : "X"}
        </MetaItem>
      </div>
    </header>
  );
}

export default DetailsHeader;
