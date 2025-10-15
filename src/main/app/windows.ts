import { BrowserWindow } from "electron";
import path from "node:path";

let _mainWindow: BrowserWindow | null = null;

const createMainWindow = () => {
  const win = new BrowserWindow({
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
    win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  win.once("ready-to-show", () => win.show());

  _mainWindow = win;
  return win;
};

const getMainWindow = () => _mainWindow;

const hideOnClose = (
  win: BrowserWindow,
  shouldQuit: () => boolean,
  onHide?: () => void,
) => {
  win.on("close", (e) => {
    if (!shouldQuit() && !win.isDestroyed() && win.isVisible()) {
      e.preventDefault();
      win.hide();
      onHide?.();
    }
  });
};

export { createMainWindow, getMainWindow, hideOnClose };
