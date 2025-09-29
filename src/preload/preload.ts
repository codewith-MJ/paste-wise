import { contextBridge } from "electron";
import safeInvoke from "./safe-invoke";
import { HistoryItemUI } from "@/shared/types/history";
import { IPC } from "@/shared/constants/ipc-channels";

const api = {
  history: {
    async list(): Promise<HistoryItemUI[]> {
      return safeInvoke<HistoryItemUI[]>(IPC.HISTORY_LIST);
    },
    async get(id: string): Promise<HistoryItemUI> {
      return safeInvoke<HistoryItemUI>(IPC.HISTORY_DETAIL, id);
    },
    async delete(id: string): Promise<boolean> {
      return safeInvoke<boolean>(IPC.HISTORY_DELETE, id);
    },
  },
} as const;

contextBridge.exposeInMainWorld("api", api);
