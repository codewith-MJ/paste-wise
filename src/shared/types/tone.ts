type ToneListItem = {
  toneId: number;
  toneTitle: string;
  isDefault: 0 | 1;
};

type Tone = {
  toneId: number;
  toneTitle: string;
  tonePrompt: string;
  toneStrength: number;
  emojiAllowed: 0 | 1;
  isDefault: 0 | 1;
};

type ToneItemUI = {
  toneId: string;
  toneTitle: string;
  isDefault: boolean;
  tonePrompt?: string;
  toneStrength?: number;
  emojiAllowed?: boolean;
};

export { ToneListItem, Tone, ToneItemUI };
