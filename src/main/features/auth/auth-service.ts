import { randomBytes, createHash } from "crypto";
import { URL } from "url";
import { shell } from "electron";
import toBase64Url from "./base64-url";
import createLoopbackServer from "./create-loopback-server";
import { AuthUser, LoginResponse } from "@/shared/types/auth";
import requireEnv from "@/main/utils/require-env";
import {
  clearTokens,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/main/infra/auth/token-store";
import logger from "@/main/utils/logger";

const OAUTH_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const SCOPES = "openid email profile";

const createPKCE = () => {
  const verifier = toBase64Url(randomBytes(32));
  const challenge = toBase64Url(createHash("sha256").update(verifier).digest());
  return { verifier, challenge };
};

const loginWithGooglePKCE = async (): Promise<{ user: AuthUser }> => {
  const GOOGLE_CLIENT_ID = requireEnv("GOOGLE_CLIENT_ID");
  const BACKEND_URL = requireEnv("BACKEND_URL");

  const state = toBase64Url(randomBytes(16));
  const { verifier, challenge } = createPKCE();
  const { redirectUri, waitForCode, close } = await createLoopbackServer();

  const url = new URL(OAUTH_AUTH_URL);
  url.search = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: SCOPES,
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
    prompt: "consent",
  }).toString();

  await shell.openExternal(url.toString());

  const { code, state: returned } = await waitForCode();
  close();

  if (!code || returned !== state) {
    throw new Error("OAuth state mismatch or missing code");
  }

  const payload = { code, codeVerifier: verifier, redirectUri, state };

  const response = await fetch(`${BACKEND_URL}/auth/google/native-callback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-App-Secret": requireEnv("APP_SECRET"),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`native-callback failed: ${response.status}`);
  }

  const data = (await response.json()) as LoginResponse;

  setAccessToken(data.accessToken);
  setRefreshToken(data.refreshToken);

  return { user: data.user };
};

const logoutUser = async (userId: string): Promise<{ ok: true }> => {
  const BACKEND_URL = requireEnv("BACKEND_URL");
  const APP_SECRET = requireEnv("APP_SECRET");
  const refreshToken = getRefreshToken();

  if (refreshToken && userId) {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Secret": APP_SECRET,
        },
        body: JSON.stringify({ userId, refreshToken }),
      });

      if (response.ok) {
        logger.info("[auth] backend refresh token revoked");
      } else {
        logger.warn(`[auth] backend revoke failed (${response.status})`);
      }
    } catch (err) {
      logger.error("[auth] logout request failed", err);
    }
  } else {
    logger.info("[auth] skip backend revoke (no token or userId)");
  }

  clearTokens();
  logger.info("[auth] logout completed — local tokens cleared");

  return { ok: true };
};

export { loginWithGooglePKCE, logoutUser };
