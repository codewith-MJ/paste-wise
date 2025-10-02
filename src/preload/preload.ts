import { contextBridge } from "electron";
import safeInvoke from "./safe-invoke";
import { HistoryItemUI } from "@/shared/types/history";
import { IPC } from "@/shared/constants/ipc-channels";
import { ToneItemUI } from "@/shared/types/tone";
import { ShortcutUI } from "@/shared/types/shortcut";

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
    async dropdownList(): Promise<string[]> {
      return safeInvoke<string[]>(IPC.HISTORY_DROPDOWN_LIST);
    },
  },
  tone: {
    async list(): Promise<ToneItemUI[]> {
      return safeInvoke<ToneItemUI[]>(IPC.TONE_LIST);
    },
    async get(id: string): Promise<ToneItemUI> {
      return safeInvoke<ToneItemUI>(IPC.TONE_DETAIL, id);
    },
  },
  shortcut: {
    async list(): Promise<ShortcutUI[]> {
      return safeInvoke<ShortcutUI[]>(IPC.SHORTCUT_LIST);
    },
  },
} as const;

contextBridge.exposeInMainWorld("api", api);
