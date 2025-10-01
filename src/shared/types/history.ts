type HistoryListItem = {
  historyId: number;
  originalText: string;
  emojiAllowed: number;
  isTranslated: 0 | 1;
  languageIn?: string;
  languageOut?: string;
  toneName: string | null;
  createdAt: number;
  isActive?: number;
};

type History = {
  historyId: number;
  originalText: string;
  transformedText: string;
  toneName: string | null;
  tonePrompt: string | null;
  isTranslated: 0 | 1;
  languageIn: string | null;
  languageOut: string | null;
  toneStrength: number | null;
  emojiAllowed: 0 | 1;
  createdAt: number;
};

type NewHistoryInput = {
  originalText: string;
  transformedText: string;
  toneId?: number | null;
  toneName?: string | null;
  tonePrompt?: string | null;
  isTranslated?: 0 | 1;
  languageIn?: string | null;
  languageOut?: string | null;
  toneStrength?: number | null;
  emojiAllowed?: 0 | 1;
};

type HistoryItemUI = {
  historyId: string;
  originalText: string;
  transformedText?: string;
  toneName?: string;
  tonePrompt?: string;
  isTranslated: boolean;
  languageIn?: string;
  languageOut?: string;
  toneStrength?: number;
  emojiAllowed?: boolean;
  createdAt: string;
  isActive?: boolean;
};

export { HistoryListItem, History, NewHistoryInput, HistoryItemUI };
