import { ArrowDown } from "lucide-react";
import DetailsHeader from "./DetailsHeader";
import MessageCard from "./MessageCard";
import { HistoryItem } from "@/types/history-item";
import Arrow from "./Arrow";

type HistoryDetailsProps = {
  item: HistoryItem;
};

function HistoryDetails({ item }: HistoryDetailsProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
      <DetailsHeader
        createdAt={item.createdAt}
        mode={item.mode}
        strength={item.strength}
        emoji={item.emoji}
      />

      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        <MessageCard label="Original" text={item.original} />
        <Arrow />
        <MessageCard label="Transformed" text={item.transformed} />
      </div>
    </section>
  );
}

export default HistoryDetails;
