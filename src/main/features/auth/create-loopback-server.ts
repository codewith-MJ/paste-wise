import { createServer, IncomingMessage, ServerResponse } from "http";
import { URL } from "url";

export type OAuthCodeResult = { code: string; state: string };

const LOOPBACK_HOST = "127.0.0.1";
const CALLBACK_PATH = "/callback";
const DEFAULT_TIMEOUT_MS = 120_000;
const COMPLETED_HTML = `<!doctype html><html><body style="font-family:system-ui;padding:24px;text-align:center">
  <h2>로그인이 완료되었습니다 ✅</h2>
  <p>이 창은 닫아도 됩니다.</p>
  <script>setTimeout(()=>window.close(),700)</script>
</body></html>`;

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
