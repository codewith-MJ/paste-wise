import DetailsHeader from "./DetailsHeader";
import MessageCard from "./MessageCard";
import Arrow from "./Arrow";
import useHistoryDetail from "@/renderer/hooks/useHistoryDeatil";

type HistoryDetailsProps = {
  selectedId: string;
};

function HistoryDetail({ selectedId }: HistoryDetailsProps) {
  const history = useHistoryDetail(selectedId);

  return (
    <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
      {history && (
        <>
          <DetailsHeader
            createdAt={history.createdAt}
            toneTitle={history.toneTitle}
            toneStrength={history.toneStrength}
            emojiAllowed={!!history.emojiAllowed}
            isTranslated={history.isTranslated}
            languageIn={history.languageIn}
            languageOut={history.languageOut}
          />
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            <MessageCard label="내가 쓴 글" text={history.originalText} />
            <Arrow />
            <MessageCard label="바뀐 글" text={history.transformedText ?? ""} />
          </div>
        </>
      )}
    </section>
  );
}

export default HistoryDetail;
