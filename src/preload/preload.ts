import { contextBridge, ipcRenderer } from "electron";
import safeInvoke from "./safe-invoke";
import { HistoryItemUI } from "@/shared/types/history";
import { IPC } from "@/shared/constants/ipc-channels";
import { ToneItemUI } from "@/shared/types/tone";
import { ShortcutUI } from "@/shared/types/shortcut";
import { TOAST_TYPE } from "@/shared/constants/toast";
import { AuthUser } from "@/shared/types/auth";

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
  auth: {
    async loginWithGoogle(): Promise<{ user: AuthUser }> {
      return await safeInvoke<{ user: AuthUser }>(IPC.AUTH_GOOGLE_LOGIN);
    },
    async logout(id: string): Promise<{ ok: true }> {
      return await safeInvoke<{ ok: true }>(IPC.AUTH_LOGOUT, id);
    },
  },
} as const;

const hud = {
  show(): Promise<boolean> {
    return safeInvoke<boolean>(IPC.HUD_SHOW);
  },
  hide(): Promise<boolean> {
    return safeInvoke<boolean>(IPC.HUD_HIDE);
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

    ipcRenderer.on(IPC.CONVERSION_START, onStart);
    ipcRenderer.on(IPC.CONVERSION_DONE, onDone);

    return () => {
      ipcRenderer.removeListener(IPC.CONVERSION_START, onStart);
      ipcRenderer.removeListener(IPC.CONVERSION_DONE, onDone);
    };
  },
};

const toast = {
  success(message: string, duration = 3000) {
    return safeInvoke<boolean>(IPC.TOAST_PUSH, {
      type: TOAST_TYPE.SUCCESS,
      message,
      duration,
    });
  },
  error(message: string, duration = 3000) {
    return safeInvoke<boolean>(IPC.TOAST_PUSH, {
      type: TOAST_TYPE.ERROR,
      message,
      duration,
    });
  },
};

contextBridge.exposeInMainWorld("api", api);
contextBridge.exposeInMainWorld("hud", hud);
contextBridge.exposeInMainWorld("loading", loading);
contextBridge.exposeInMainWorld("toast", toast);
