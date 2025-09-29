import { SECOND, MINUTE, HOUR, DAY, RTF_KO } from "@/shared/constants/time";

const formatRelativeTime = (ts: number, now = Date.now()) => {
  const diff = ts - now;
  const abs = Math.abs(diff);

  if (abs < 10 * SECOND) return "방금 전";
  if (abs < MINUTE) return RTF_KO.format(Math.round(diff / SECOND), "second");
  if (abs < HOUR) return RTF_KO.format(Math.round(diff / MINUTE), "minute");
  if (abs < DAY) return RTF_KO.format(Math.round(diff / HOUR), "hour");
  return RTF_KO.format(Math.round(diff / DAY), "day");
};

export default formatRelativeTime;
