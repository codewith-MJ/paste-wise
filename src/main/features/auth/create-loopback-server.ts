import { createServer, IncomingMessage, ServerResponse } from "http";
import { URL } from "url";

export type OAuthCodeResult = { code: string; state: string };

const LOOPBACK_HOST = "127.0.0.1";
const CALLBACK_PATH = "/callback";
const DEFAULT_TIMEOUT_MS = 120_000;
const APP_SCHEME = "pastewise://oauth/success";
const COMPLETED_HTML = `<!doctype html>
<html lang="ko">
  <meta charset="utf-8" />
  <title>로그인 완료</title>
  <body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans KR,sans-serif;text-align:center;padding:60px 20px;background:#f8fafc;color:#1e293b;">
    <h2 style="font-size:1.6rem;margin-bottom:12px;">로그인이 완료되었습니다 ✅</h2>
    <a href="${APP_SCHEME}" style="display:inline-block;margin-top:10px;padding:10px 22px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:9999px;font-weight:500;">
      앱으로 돌아가기
    </a>
    <script>setTimeout(()=>location.href="${APP_SCHEME}",500);</script>
  </body>
</html>`;

const createLoopbackServer = async (): Promise<{
  redirectUri: string;
  waitForCode: (timeoutMs?: number) => Promise<OAuthCodeResult>;
  close: () => void;
}> => {
  return new Promise((resolve) => {
    let settled = false;
    let result: OAuthCodeResult | null = null;
    const waiters: Array<(v: OAuthCodeResult) => void> = [];

    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      if (!req.url) {
        res.statusCode = 400;
        return res.end();
      }

      const url = new URL(req.url, `http://${LOOPBACK_HOST}`);
      if (
        !(
          url.pathname === CALLBACK_PATH || url.pathname === `${CALLBACK_PATH}/`
        )
      ) {
        res.statusCode = 404;
        return res.end("Not Found");
      }

      const code = url.searchParams.get("code") || "";
      const state = url.searchParams.get("state") || "";

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(COMPLETED_HTML);

      if (settled) return;
      result = { code, state };
      settled = true;

      if (waiters.length > 0) {
        const toResolve = waiters.splice(0, waiters.length);
        setImmediate(() => {
          for (const fn of toResolve) fn(result!);
        });
      }
    });

    const waitForCode = (timeoutMs = DEFAULT_TIMEOUT_MS) =>
      new Promise<OAuthCodeResult>((resolveCode, rejectCode) => {
        if (settled && result) return resolveCode(result);

        let timer: NodeJS.Timeout | null = setTimeout(() => {
          timer = null;
          if (!settled) {
            settled = true;
            rejectCode(new Error("OAuth callback timed out"));
          }
        }, timeoutMs);

        waiters.push((v) => {
          if (timer) clearTimeout(timer);
          resolveCode(v);
        });
      });

    server.listen(0, LOOPBACK_HOST, () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr?.port ? addr.port : 0;
      const redirectUri = `http://${LOOPBACK_HOST}:${port}${CALLBACK_PATH}`;

      resolve({
        redirectUri,
        waitForCode,
        close: () => server.close(),
      });
    });
  });
};

export default createLoopbackServer;
