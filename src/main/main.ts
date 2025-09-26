import { app, BrowserWindow, globalShortcut } from "electron";
import path from "node:path";
import { getDb, closeDb } from "./infra/db/connection";
import { applyMigrations } from "./infra/db/migration";

const squirrelStartup =
  process.platform === "win32" ? require("electron-squirrel-startup") : false;

if (squirrelStartup) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 920,
    height: 660,
    minWidth: 800,
    minHeight: 576,
    title: "PasteWise",
    center: true,
    show: false,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.ts"),
      contextIsolation: true,
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
const db = getDb();

app.whenReady().then(() => {
  applyMigrations(db);

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
  closeDb();
});
