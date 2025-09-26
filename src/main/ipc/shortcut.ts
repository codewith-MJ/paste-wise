import { ipcMain } from "electron";
import { getShortcutList } from "../services/shortcut";

function registerShortcutIpc() {
  ipcMain.handle("shortcut:getList", async () => {
    try {
      const shortcutList = await getShortcutList();
      return {
        ok: true,
        data: shortcutList,
      };
    } catch (error: any) {
      return { ok: false, error: String(error.message ?? error) };
    }
  });
}

export default registerShortcutIpc;
