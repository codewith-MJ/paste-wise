import { shell } from "electron";
import { randomUUID } from "crypto";

const BE_AUTH_BASE_URL = process.env.BACKEND_URL ?? "http://localhost:3000";
const LOGIN_START_PATH = "/auth/google";

const startGoogleLogin = async (): Promise<{ loginTransactionId: string }> => {
  const loginTransactionId = randomUUID();
  const url = `${BE_AUTH_BASE_URL}${LOGIN_START_PATH}?loginTransactionId=${loginTransactionId}`;

  await shell.openExternal(url);

  return { loginTransactionId };
};

export { startGoogleLogin };
