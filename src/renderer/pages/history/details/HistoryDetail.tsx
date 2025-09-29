import DetailsHeader from "./DetailsHeader";
import MessageCard from "./MessageCard";
import Arrow from "./Arrow";
import useHistoryDetail from "@/renderer/hooks/useHistoryDeatil";

type HistoryDetailsProps = {
  selectedId: string;
};

function HistoryDetail({ selectedId }: HistoryDetailsProps) {
  const item = useHistoryDetail(selectedId);

  return (
    <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
      {item && (
        <>
          <DetailsHeader
            createdAt={item.createdAt}
            toneTitle={item.toneTitle}
            toneStrength={item.toneStrength}
            emojiAllowed={item.emojiAllowed!}
            isTranslated={item.isTranslated}
          />
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            <MessageCard label="내가 쓴 글" text={item.originalText} />
            <Arrow />
            <MessageCard label="바뀐 글" text={item.transformedText!} />
          </div>
        </>
      )}
    </section>
  );
}

export default HistoryDetail;
