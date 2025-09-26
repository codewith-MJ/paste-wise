import { ipcMain } from "electron";
import { getToneById, getToneList } from "../services/tone";

function registerToneIpc() {
  ipcMain.handle("tone:getList", async () => {
    try {
      const toneList = await getToneList();
      return {
        ok: true,
        data: toneList,
      };
    } catch (error: any) {
      return { ok: false, error: String(error.message ?? error) };
    }
  });

  ipcMain.handle("tone:getById", async (_event, toneId: string) => {
    try {
      const tone = await getToneById(Number(toneId));
      return {
        ok: true,
        data: tone,
      };
    } catch (error: any) {
      return { ok: false, error: String(error.message ?? error) };
    }
  });
}

export default registerToneIpc;
