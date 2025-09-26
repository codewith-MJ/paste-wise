import { ipcMain } from "electron";
import {
  deleteHistory,
  getHistoryById,
  getHistoryList,
} from "../services/history";
import { IdSchema, validateWith } from "@/shared/validation/common";
import formatErrorResponse from "@/shared/errors/format-error-response";
import RecordNotFoundError from "@/shared/errors/RecordNotFoundError";

function registerHistoryIpc() {
  ipcMain.handle("history:getList", async () => {
    try {
      const historyList = await getHistoryList();
      return {
        ok: true,
        data: historyList,
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  });

  ipcMain.handle("history:getById", async (_event, id: string) => {
    try {
      const historyId = validateWith(IdSchema, id);
      const history = await getHistoryById(Number(historyId));

      if (!history) {
        throw new RecordNotFoundError({ id: historyId });
      }

      return {
        ok: true,
        data: history,
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  });

  ipcMain.handle("history:delete", async (_event, id: string) => {
    try {
      const historyId = validateWith(IdSchema, id);
      const isDeleted = await deleteHistory(Number(historyId));

      if (!isDeleted) {
        throw new RecordNotFoundError({ id: historyId });
      }

      return {
        ok: true,
        isDeleted,
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  });
}

export default registerHistoryIpc;
