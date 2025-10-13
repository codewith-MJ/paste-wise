import { app, BrowserWindow, ipcMain, screen } from "electron";
import path from "node:path";
import { IPC } from "@/shared/constants/ipc-channels";

let hudWin: BrowserWindow | null = null;
let followTimer: NodeJS.Timeout | null = null;
let lastX = -1;
let lastY = -1;
let autoHideTimer: NodeJS.Timeout | null = null;

const hudHtmlPath = () => {
  return app.isPackaged
    ? path.join(process.resourcesPath, "hud/index.html")
    : path.join(process.cwd(), "src/hud/index.html");
};

const createHudWindow = () => {
  if (hudWin && !hudWin.isDestroyed()) return;

  hudWin = new BrowserWindow({
    width: 40,
    height: 40,
    frame: false,
    transparent: true,
    resizable: false,
    movable: false,
    focusable: false,
    hasShadow: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    show: false,
  });

  hudWin.setIgnoreMouseEvents(true, { forward: true });
  hudWin.loadFile(hudHtmlPath());
};

const startFollow = () => {
  stopFollow();
  const OFFSET_X = 12;
  const OFFSET_Y = 12;

  followTimer = setInterval(() => {
    const { x, y } = screen.getCursorScreenPoint();

    if (Math.abs(x - lastX) <= 2 && Math.abs(y - lastY) <= 2) {
      return;
    }
    lastX = x;
    lastY = y;

    try {
      hudWin?.setPosition(x + OFFSET_X, y + OFFSET_Y, false);
    } catch {
      hudWin?.setBounds({
        x: x + OFFSET_X,
        y: y + OFFSET_Y,
        width: 40,
        height: 40,
      });
    }
  }, 120);
};

const stopFollow = () => {
  if (followTimer) {
    clearInterval(followTimer);
  }
  followTimer = null;
  lastX = -1;
  lastY = -1;
};

const showHud = () => {
  createHudWindow();
  hudWin?.showInactive();
  startFollow();

  if (autoHideTimer) {
    clearTimeout(autoHideTimer);
  }
  autoHideTimer = setTimeout(() => {
    stopFollow();
    hudWin?.hide();
  }, 15000);
};

const hideHud = () => {
  if (autoHideTimer) {
    clearTimeout(autoHideTimer);
  }
  autoHideTimer = null;
  stopFollow();
  if (hudWin && !hudWin.isDestroyed()) hudWin.hide();
};

const initHudOverlayIpc = () => {
  ipcMain.handle(IPC.HUD_SHOW, async () => {
    showHud();
    return true;
  });
  ipcMain.handle(IPC.HUD_HIDE, async () => {
    hideHud();
    return true;
  });
};

export { initHudOverlayIpc };
