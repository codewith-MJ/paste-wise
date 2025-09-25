export type ToneListItem = {
  toneId: number;
  toneTitle: string;
  isDefault: 0 | 1;
};

export type Tone = {
  toneId: number;
  toneTitle: string;
  tonePrompt: string;
  toneStrength: number;
  emojiAllowed: 0 | 1;
  isDefault: 0 | 1;
};
