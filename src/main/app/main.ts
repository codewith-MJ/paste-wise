import { app, BrowserWindow } from "electron";
import path from "node:path";
import bootstrap from "./bootstrap";

const squirrelStartup =
  process.platform === "win32" ? require("electron-squirrel-startup") : false;

if (squirrelStartup) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
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

  // mainWindow.webContents.openDevTools();
  mainWindow.once("ready-to-show", () => mainWindow.show());
};

let cleanupAppResources: (() => void) | null = null;

app.whenReady().then(() => {
  try {
    const appContext = bootstrap();
    cleanupAppResources = appContext.cleanupAppResources;

    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  } catch {
    cleanupAppResources?.();
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  cleanupAppResources?.();
});
