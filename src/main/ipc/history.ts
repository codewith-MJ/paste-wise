import { ipcMain } from "electron";
import {
  deleteHistory,
  getHistoryById,
  getHistoryList,
} from "../services/history";

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

  ipcMain.handle("history:getById", async (_event, historyId: string) => {
    try {
      const history = await getHistoryById(Number(historyId));
      return {
        ok: true,
        data: history,
      };
    } catch (error: any) {
      return { ok: false, error: String(error.message ?? error) };
    }
  });

  ipcMain.handle("history:delete", async (_event, historyId: string) => {
    try {
      const isDeleted = await deleteHistory(Number(historyId));
      return {
        ok: true,
        isDeleted,
      };
    } catch (error: any) {
      return { ok: false, error: String(error.message ?? error) };
    }
  });
}

export default registerHistoryIpc;
