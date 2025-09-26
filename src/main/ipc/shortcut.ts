import { ipcMain } from "electron";
import { getShortcutList } from "../services/shortcut";
import formatErrorResponse from "@/shared/errors/format-error-response";

function registerShortcutIpc() {
  ipcMain.handle("shortcut:getList", async () => {
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
}

export default registerShortcutIpc;
