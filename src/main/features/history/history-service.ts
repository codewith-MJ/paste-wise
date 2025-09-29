import {
  HistoryItemUI,
  History,
  HistoryListItem,
} from "@/shared/types/history";
import {
  getHistoryList as repoGetHistoryList,
  getHistoryById as repoGetHistoryById,
  deleteHistory as repoDeleteHistory,
  deleteExpiredHistories as repoDeleteExpiredHistories,
} from "../../infra/db/dao/history";

const getHistoryList = async (): Promise<HistoryItemUI[]> => {
  const historyList = await Promise.resolve(repoGetHistoryList());

  return historyList.map(formatHistoryItem);
};

const getHistoryById = async (
  historyId: number,
): Promise<HistoryItemUI | null> => {
  const history = await Promise.resolve(repoGetHistoryById(historyId));

  if (history) {
    const formattedHistory: HistoryItemUI = formatHistory(history);

    return formattedHistory;
  }

  return history;
};

const deleteHistory = async (historyId: number): Promise<boolean> => {
  const isDeleted = await Promise.resolve(repoDeleteHistory(historyId));

  return isDeleted;
};

const deleteExpiredHistory = async (): Promise<number> => {
  return repoDeleteExpiredHistories();
};

export { getHistoryList, getHistoryById, deleteHistory, deleteExpiredHistory };

function formatHistoryItem(item: HistoryListItem): HistoryItemUI {
  return {
    historyId: String(item.historyId),
    originalText: item.originalText,
    isTranslated: item.isTranslated === 1,
    languageIn: item.languageIn ?? "",
    languageOut: item.languageOut ?? "",
    toneTitle: item.toneTitle ?? "",
    createdAt: new Date(item.createdAt).toISOString(),
  };
}

function formatHistory(item: History): HistoryItemUI {
  return {
    historyId: String(item.historyId),
    originalText: item.originalText,
    transformedText: item.transformedText ?? undefined,
    toneTitle: item.toneTitle ?? "",
    tonePrompt: item.tonePrompt ?? undefined,
    isTranslated: item.isTranslated === 1,
    languageIn: item.languageIn ?? undefined,
    languageOut: item.languageOut ?? undefined,
    toneStrength: item.toneStrength ?? undefined,
    emojiAllowed: item.emojiAllowed === 1,
    createdAt: new Date(item.createdAt).toISOString(),
  };
}
