export type HistoryListItem = {
  historyId: number;
  originalText: string;
  emojiAllowed: number;
  isTranslated: 0 | 1;
  toneTitle: string | null;
  createdAt: number;
  isActive?: number;
};

export type History = {
  historyId: number;
  originalText: string;
  transformedText: string;
  toneId: number | null;
  toneTitle: string | null;
  tonePrompt: string | null;
  isTranslated: 0 | 1;
  languageIn: string | null;
  languageOut: string | null;
  toneStrength: number | null;
  emojiAllowed: 0 | 1;
  createdAt: number;
};

export type NewHistoryInput = {
  originalText: string;
  transformedText: string;
  toneId?: number | null;
  toneTitle?: string | null;
  tonePrompt?: string | null;
  isTranslated?: 0 | 1;
  languageIn?: string | null;
  languageOut?: string | null;
  toneStrength?: number | null;
  emojiAllowed?: 0 | 1;
};

export type HistoryItemUI = {
  historyId: string;
  createdAt: string;
  toneTitle: string;
  toneStrength?: string;
  emojiAllowed?: boolean;
  isTranslated: boolean;
  originalText: string;
  transformedText?: string;
  isActive?: boolean;
};
