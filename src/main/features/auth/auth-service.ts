import { randomBytes, createHash } from "crypto";
import { URL } from "url";
import { shell } from "electron";
import toBase64Url from "./base64-url";
import createLoopbackServer from "./create-loopback-server";
import { AuthUser } from "@/shared/types/auth";
import requireEnv from "@/main/utils/require-env";

const OAUTH_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const SCOPES = "openid email profile";

function createPKCE() {
  const verifier = toBase64Url(randomBytes(32));
  const challenge = toBase64Url(createHash("sha256").update(verifier).digest());
  return { verifier, challenge };
}

export const loginWithGooglePKCE = async (): Promise<{ user: AuthUser }> => {
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

  const resp = await fetch(`${BACKEND_URL}/auth/google/native-callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    throw new Error(`native-callback failed: ${resp.status}`);
  }

  return (await resp.json()) as { user: AuthUser };
};
