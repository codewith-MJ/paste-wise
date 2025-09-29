const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const RTF_KO = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

export { SECOND, MINUTE, HOUR, DAY, RTF_KO };
