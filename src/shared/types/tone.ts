type ToneListItem = {
  toneId: number;
  toneName: string;
  isDefault: 0 | 1;
};

type Tone = {
  toneId: number;
  toneName: string;
  tonePrompt: string;
  toneStrength: number;
  emojiAllowed: 0 | 1;
  isDefault: 0 | 1;
};

type ToneItemUI = {
  toneId: string;
  toneName: string;
  isDefault: boolean;
  tonePrompt?: string;
  toneStrength?: number;
  emojiAllowed?: boolean;
};

export { ToneListItem, Tone, ToneItemUI };
