import { ipcMain } from "electron";
import { IPC } from "@/shared/constants/ipc-channels";
import { startGoogleLogin } from "./auth-service";

const registerAuthIpc = () => {
  ipcMain.handle(IPC.AUTH_GOOGLE_START, async () => {
    return await startGoogleLogin();
  });
};

export default registerAuthIpc;
