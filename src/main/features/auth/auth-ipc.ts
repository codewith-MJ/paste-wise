import { ipcMain } from "electron";
import { IPC } from "@/shared/constants/ipc-channels";
import { loginWithGooglePKCE } from "./auth-service";

const registerAuthIpc = () => {
  ipcMain.handle(IPC.AUTH_GOOGLE_LOGIN, async () => {
    return await loginWithGooglePKCE();
  });
};

export default registerAuthIpc;
