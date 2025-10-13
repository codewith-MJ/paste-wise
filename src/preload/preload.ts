import { contextBridge, ipcRenderer } from "electron";
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

const hud = {
  show(): Promise<boolean> {
    return safeInvoke<boolean>("hud:show");
  },
  hide(): Promise<boolean> {
    return safeInvoke<boolean>("hud:hide");
  },
};

const loading = {
  onChange(handler: (isLoading: boolean) => void) {
    const onStart = (
      _: Electron.IpcRendererEvent,
      _payload: { jobId: string },
    ) => {
      handler(true);
    };
    const onDone = (
      _: Electron.IpcRendererEvent,
      _payload: { jobId: string; ok: boolean },
    ) => {
      handler(false);
    };

    ipcRenderer.on("conversion:start", onStart);
    ipcRenderer.on("conversion:done", onDone);

    return () => {
      ipcRenderer.removeListener("conversion:start", onStart);
      ipcRenderer.removeListener("conversion:done", onDone);
    };
  },
};

contextBridge.exposeInMainWorld("api", api);
contextBridge.exposeInMainWorld("hud", hud);
contextBridge.exposeInMainWorld("loading", loading);
