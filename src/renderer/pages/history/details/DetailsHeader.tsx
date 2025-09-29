import ToneBadge from "@/renderer/components/ToneBadge";
import MetaItem from "./MetaItem";
import TranslationBadge from "@/renderer/components/TranslationBadge";

type DetailsHeaderProps = {
  createdAt: string;
  toneTitle?: string;
  tonePrompt?: string;
  toneStrength?: number;
  emojiAllowed: boolean;
  isTranslated: boolean;
  languageIn?: string;
  languageOut?: string;
};

function DetailsHeader({
  createdAt,
  toneTitle,
  tonePrompt,
  toneStrength,
  emojiAllowed,
  isTranslated,
  languageIn,
  languageOut,
}: DetailsHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white px-6 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">{"변환 내용 보기"}</h1>
        <time className="rounded-lg bg-gray-50 px-3 py-1 text-sm text-gray-500">
          🕑 {createdAt}
        </time>
      </div>

      <div className="flex flex-col text-sm text-gray-700">
        <div className="flex items-center">
          {toneTitle && (
            <MetaItem
              label="말투"
              className="border-0 pr-3 pl-0 first:border-0 first:pl-0"
            >
              <ToneBadge toneTitle={toneTitle} />
            </MetaItem>
          )}

          {typeof toneStrength === "number" && (
            <MetaItem
              label="말투 세기"
              className="border-l border-gray-200 pr-3 pl-3 first:border-0 first:pl-0"
            >
              <span className="text-gray-600">{toneStrength}%</span>
            </MetaItem>
          )}
          {toneTitle && (
            <MetaItem
              label="이모지"
              className="border-l border-gray-200 pr-3 pl-3 first:border-0 first:pl-0"
            >
              {emojiAllowed ? "✔️" : "X"}
            </MetaItem>
          )}

          {isTranslated && languageIn && languageOut && (
            <MetaItem
              label="번역"
              className="border-l border-gray-200 pl-3 first:border-0 first:pl-0"
            >
              <TranslationBadge
                languageIn={languageIn}
                languageOut={languageOut}
              />
            </MetaItem>
          )}
        </div>

        {/* 2행 */}
        {tonePrompt && (
          <div className="mt-2">
            <MetaItem label="말투 설명">
              <span className="text-gray-600">{tonePrompt}</span>
            </MetaItem>
          </div>
        )}
      </div>
    </header>
  );
}

export default DetailsHeader;
