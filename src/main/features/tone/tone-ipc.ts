import { ipcMain } from "electron";
import { getToneList, getToneById } from "./tone-service";
import formatErrorResponse from "@/shared/errors/format-error-response";
import { RecordNotFoundError } from "@/shared/errors";
import { IPC } from "@/shared/constants/ipc-channels";

const { TONE_LIST, TONE_DETAIL } = IPC;

const registerToneIpc = () => {
  ipcMain.handle(TONE_LIST, async () => {
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

  ipcMain.handle(TONE_DETAIL, async (_event, toneId: string) => {
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
};

export default registerToneIpc;
