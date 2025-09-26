import { ipcMain } from "electron";
import { getToneById, getToneList } from "../services/tone";
import formatErrorResponse from "@/shared/errors/format-error-response";
import { RecordNotFoundError } from "@/shared/errors";

function registerToneIpc() {
  ipcMain.handle("tone:getList", async () => {
    try {
      const toneList = await getToneList();
      return {
        ok: true,
        data: toneList,
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  });

  ipcMain.handle("tone:getById", async (_event, toneId: string) => {
    try {
      const tone = await getToneById(Number(toneId));

      if (!tone) {
        throw new RecordNotFoundError({ id: toneId });
      }

      return {
        ok: true,
        data: tone,
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  });
}

export default registerToneIpc;
