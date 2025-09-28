import DetailsHeader from "./DetailsHeader";
import MessageCard from "./MessageCard";
import { HistoryItemUI } from "@/shared/types/history";
import Arrow from "./Arrow";

type HistoryDetailsProps = {
  item: HistoryItemUI;
};

function HistoryDetail({ item }: HistoryDetailsProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
      <DetailsHeader
        createdAt={item.createdAt}
        toneTitle={item.toneTitle}
        toneStrength={item.toneStrength}
        emojiAllowed={item.emojiAllowed!}
        isTranslated={item.isTranslated}
      />

      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        <MessageCard label="Original" text={item.originalText} />
        <Arrow />
        <MessageCard label="Transformed" text={item.transformedText!} />
      </div>
    </section>
  );
}

export default HistoryDetail;
