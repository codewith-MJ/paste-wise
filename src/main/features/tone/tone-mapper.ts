import type { ToneItemUI } from "@/shared/types/tone";

const mapListRowToToneUI = (row: {
  toneId: number;
  toneName: string;
  isDefault: 0 | 1;
}): ToneItemUI => {
  return {
    toneId: String(row.toneId),
    toneName: row.toneName,
    isDefault: row.isDefault === 1,
    source: "global",
    deleted: false,
  };
};

const mapDetailRowToToneUI = (row: {
  toneId: number;
  toneName: string;
  tonePrompt: string;
  toneStrength: number;
  emojiAllowed: 0 | 1;
  isDefault: 0 | 1;
}): ToneItemUI => {
  return {
    toneId: String(row.toneId),
    toneName: row.toneName,
    isDefault: row.isDefault === 1,
    tonePrompt: row.tonePrompt,
    toneStrength: row.toneStrength,
    emojiAllowed: row.emojiAllowed === 1,
    source: "global",
    deleted: false,
  };
};

export { mapListRowToToneUI, mapDetailRowToToneUI };
