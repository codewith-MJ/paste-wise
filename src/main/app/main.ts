import { app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import bootstrap from "./bootstrap";
import { initHudOverlayIpc } from "../hud/overlay";
import loadEnv from "./env-loader";
import registerAppProtocol from "./protocols";
import { createMainWindow, hideOnClose } from "./windows";

const require = createRequire(import.meta.url);

const squirrelStartup =
  process.platform === "win32" ? require("electron-squirrel-startup") : false;
if (squirrelStartup) {
  app.quit();
}

let isQuitting = false;
let cleanupAppResources: (() => void) | null = null;
let mainWin: BrowserWindow | null = null;

const getOrCreateMainWindow = () => {
  if (mainWin && !mainWin.isDestroyed()) return mainWin;

  mainWin = createMainWindow();
  hideOnClose(mainWin, () => isQuitting);

  return mainWin;
};

app.whenReady().then(() => {
  try {
    loadEnv();

    const appContext = bootstrap();
    cleanupAppResources = appContext.cleanupAppResources;

    registerAppProtocol(() => mainWin);
    getOrCreateMainWindow();
    initHudOverlayIpc();

    app.on("activate", () => {
      getOrCreateMainWindow().show();
    });
  } catch {
    cleanupAppResources?.();
    app.quit();
  }
});

app.on("before-quit", () => {
  isQuitting = true;
  cleanupAppResources?.();
});

app.on("will-quit", () => {
  cleanupAppResources?.();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
