import { ipcMain } from "electron";
import { getShortcutList } from "./shortcut-service";
import formatErrorResponse from "@/shared/errors/format-error-response";
import { IPC } from "@/shared/constants/ipc-channels";

const registerShortcutIpc = () => {
  ipcMain.handle(IPC.SHORTCUT_LIST, async () => {
    try {
      const shortcutList = await getShortcutList();
      return {
        ok: true,
        data: shortcutList,
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  });
};

export default registerShortcutIpc;
