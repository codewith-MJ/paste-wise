import { ipcRenderer } from "electron";
import { IpcError } from "@/shared/errors";

const safeInvoke = async <T>(
  channel: string,
  payload?: unknown,
): Promise<T> => {
  try {
    const response = await ipcRenderer.invoke(channel, payload);

    if (response && typeof response === "object" && "ok" in response) {
      if (!response.ok) {
        throw new IpcError(
          "IPC_INVOCATION_FAILED",
          "IPC Failed",
          response.error,
        );
      }
      return response.data as T;
    }

    return response as T;
  } catch (error) {
    throw new IpcError(
      "IPC_INVOCATION_FAILED",
      (error as Error).message,
      error,
    );
  }
};

export default safeInvoke;
