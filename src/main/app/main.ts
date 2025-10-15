import { app, BrowserWindow } from "electron";
import path from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";
import bootstrap from "./bootstrap";
import { initHudOverlayIpc } from "../hud/overlay";

const require = createRequire(import.meta.url);

const squirrelStartup =
  process.platform === "win32" ? require("electron-squirrel-startup") : false;

if (squirrelStartup) {
  app.quit();
}

function loadEnv() {
  const devEnv = path.resolve(process.cwd(), ".env");
  const packagedEnv = path.resolve(
    process.resourcesPath ?? process.cwd(),
    "../.env",
  );

  const envPath = fs.existsSync(devEnv) ? devEnv : packagedEnv;

  const dotenv = require("dotenv");
  dotenv.config({ path: envPath });
}

export let mainWindow: BrowserWindow | null = null;
let isQuitting = false;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 976,
    height: 664,
    minWidth: 960,
    minHeight: 576,
    title: "PasteWise",
    center: true,
    show: false,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, "../build/preload.js"),
      sandbox: true,
      nodeIntegration: false,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.once("ready-to-show", () => mainWindow!.show());

  mainWindow.on("close", (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow?.hide();
    }
  });
};

let cleanupAppResources: (() => void) | null = null;

app.whenReady().then(() => {
  try {
    loadEnv();

    const appContext = bootstrap();
    cleanupAppResources = appContext.cleanupAppResources;

    createWindow();
    initHudOverlayIpc();

    app.on("activate", () => {
      if (mainWindow) mainWindow.show();
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  cleanupAppResources?.();
});
