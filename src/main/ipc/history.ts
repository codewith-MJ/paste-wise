import { ipcMain } from "electron";
import { getHistoryList } from "../services/history";

function registerHistoryIpc() {
  ipcMain.handle("history:getList", async () => {
    try {
      const historyList = await getHistoryList();
      return {
        ok: true,
        data: historyList,
      };
    } catch (error: any) {
      return { ok: false, error: String(error.message ?? error) };
    }
  });
}

export default registerHistoryIpc;
