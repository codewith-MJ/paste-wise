import { ipcMain } from "electron";
import { IPC } from "@/shared/constants/ipc-channels";
import { loginWithGooglePKCE, logoutUser } from "./auth-service";

const registerAuthIpc = () => {
  ipcMain.handle(IPC.AUTH_GOOGLE_LOGIN, async () => {
    return await loginWithGooglePKCE();
  });
  ipcMain.handle(IPC.AUTH_LOGOUT, async (_event, userId: string) => {
    return await logoutUser(userId);
  });
};

export default registerAuthIpc;
