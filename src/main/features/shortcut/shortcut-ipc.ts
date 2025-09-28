import { ipcMain } from "electron";
import { getShortcutList } from "./shortcut-service";
import formatErrorResponse from "@/shared/errors/format-error-response";

const registerShortcutIpc = () => {
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
};

export default registerShortcutIpc;
