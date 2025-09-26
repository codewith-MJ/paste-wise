import { HistoryItemUI, HistoryListItem } from "@/shared/types/history";
import { getHistoryList as repoGetHistoryList } from "../infra/db/dao/history";

async function getHistoryList(): Promise<HistoryItemUI[]> {
  const historyList = await Promise.resolve(repoGetHistoryList());

  return historyList.map(formatHistoryItem);
}

function formatHistoryItem(item: HistoryListItem): HistoryItemUI {
  return {
    historyId: String(item.historyId),
    originalText: item.originalText,
    isTranslated: item.isTranslated === 1,
    toneTitle: item.toneTitle ?? "",
    createdAt: new Date(item.createdAt).toISOString(),
  };
}

export { getHistoryList };
