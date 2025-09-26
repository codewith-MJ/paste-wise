import { ipcMain } from "electron";
import { getToneList } from "../services/tone";

async function registerToneIpc() {
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
}

export default registerToneIpc;
