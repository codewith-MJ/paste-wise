import { app, BrowserWindow } from "electron";
import path from "node:path";

const PROTOCOL = "pastewise";

const registerAppProtocol = (mainGetter: () => BrowserWindow | null) => {
  if (process.defaultApp) {
    app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  } else {
    app.setAsDefaultProtocolClient(PROTOCOL);
  }

  app.on("open-url", (event) => {
    event.preventDefault();
    const win = mainGetter();
    if (win) {
      win.show();
      win.focus();
    }
  });

  const gotLock = app.requestSingleInstanceLock();
  if (!gotLock) {
    app.quit();
    return;
  }

  app.on("second-instance", (_e, argv) => {
    const deepLink = argv.find((a) => a.startsWith(`${PROTOCOL}://`));
    if (deepLink) {
      const win = mainGetter();
      if (win) {
        win.show();
        win.focus();
      }
    }
  });
};

export default registerAppProtocol;
