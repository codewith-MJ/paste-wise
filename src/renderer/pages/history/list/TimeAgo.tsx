import useTimeStore from "@/renderer/stores/time";
import formatRelativeTime from "@/shared/utils/format-relative-time";
import toMs from "@/shared/utils/to-ms";

type TimeAgoProps = {
  createdAt: string | number | Date;
};

function TimeAgo({ createdAt }: TimeAgoProps) {
  const now = useTimeStore((state) => state.now);
  const ts = toMs(createdAt);

  return (
    <span className="ml-auto tabular-nums">{formatRelativeTime(ts, now)}</span>
  );
}

export default TimeAgo;
