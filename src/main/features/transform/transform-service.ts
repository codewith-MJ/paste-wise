import { Tone } from "@/shared/types/tone";

const transform = async (source: string, tone: Tone) =>
  `${source} — transformed(tone=${JSON.stringify(tone)})`;

export { transform };
