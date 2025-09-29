import { ipcMain } from "electron";
import {
  deleteHistory,
  getHistoryById,
  getHistoryList,
} from "./history-service";
import { IdSchema, validateWith } from "@/shared/validation/common";
import { RecordNotFoundError } from "@/shared/errors";
import formatErrorResponse from "@/shared/errors/format-error-response";
import { IPC } from "@/shared/constants/ipc-channels";

const { HISTORY_LIST, HISTORY_DETAIL, HISTORY_DELETE } = IPC;

const registerHistoryIpc = () => {
  ipcMain.handle(HISTORY_LIST, async () => {
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

  ipcMain.handle(HISTORY_DETAIL, async (_event, id: string) => {
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

  ipcMain.handle(HISTORY_DELETE, async (_event, id: string) => {
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
};

export default registerHistoryIpc;
