import { app, BrowserWindow, ipcMain, screen } from "electron";
import path from "node:path";

let toastWindow: BrowserWindow | null = null;
let isToastRendererReady = false;

type ToastPayload = {
  id: string;
  type: "success" | "error";
  message: string;
  duration: number;
};

const pendingToastQueue: ToastPayload[] = [];

const TOAST_WINDOW_WIDTH = 400;
const TOAST_WINDOW_MIN_HEIGHT = 40;
const TOAST_WINDOW_INIT_HEIGHT = 80;

const getToastHtmlPath = (): string => {
  return app.isPackaged
    ? path.join(process.resourcesPath, "toast/index.html")
    : path.join(process.cwd(), "src/toast/index.html");
};

const clampHeightToDisplay = (
  desiredHeight: number,
  displayWorkAreaHeight: number,
): number => {
  return Math.max(
    TOAST_WINDOW_MIN_HEIGHT,
    Math.min(desiredHeight, displayWorkAreaHeight),
  );
};

const setToastWindowToRightTopOnDisplay = (
  display = screen.getPrimaryDisplay(),
  nextHeight?: number,
): void => {
  if (!toastWindow) return;

  const { x, y, width, height: displayHeight } = display.workArea;
  const computedHeight =
    typeof nextHeight === "number"
      ? clampHeightToDisplay(nextHeight, displayHeight)
      : toastWindow.getBounds().height;

  toastWindow.setBounds({
    x: x + width - TOAST_WINDOW_WIDTH,
    y,
    width: TOAST_WINDOW_WIDTH,
    height: computedHeight,
  });
};

const createToastBrowserWindow = (
  targetDisplay = screen.getPrimaryDisplay(),
): void => {
  if (toastWindow && !toastWindow.isDestroyed()) return;

  toastWindow = new BrowserWindow({
    width: TOAST_WINDOW_WIDTH,
    height: TOAST_WINDOW_INIT_HEIGHT,
    frame: false,
    transparent: true,
    resizable: false,
    movable: false,
    focusable: false,
    hasShadow: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  toastWindow.setAlwaysOnTop(true, "screen-saver");
  toastWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  toastWindow.setFocusable(false);

  isToastRendererReady = false;
  setToastWindowToRightTopOnDisplay(targetDisplay, TOAST_WINDOW_INIT_HEIGHT);

  const htmlPath = getToastHtmlPath();
  toastWindow.loadFile(htmlPath);

  toastWindow.webContents.on("did-fail-load", (_e, code, desc, url) => {
    console.error("[toast] did-fail-load", { code, desc, url });
  });
};

export const pushToast = (
  type: "success" | "error",
  message: string,
  duration = 3000,
): void => {
  const nearestDisplay = screen.getDisplayNearestPoint(
    screen.getCursorScreenPoint(),
  );

  if (!toastWindow || toastWindow.isDestroyed()) {
    createToastBrowserWindow(nearestDisplay);
  } else {
    setToastWindowToRightTopOnDisplay(nearestDisplay);
  }

  const payload: ToastPayload = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type,
    message,
    duration,
  };

  if (!isToastRendererReady) {
    pendingToastQueue.push(payload);
    return;
  }

  const win = toastWindow;
  if (!win || win.isDestroyed()) return;

  win.showInactive();
  win.setAlwaysOnTop(true, "screen-saver", 1);
  win.moveTop?.();
  win.webContents.send("toast:push", payload);
};

ipcMain.on("toast:ready", () => {
  isToastRendererReady = true;

  toastWindow?.showInactive();
  toastWindow?.setAlwaysOnTop(true, "screen-saver", 1);
  toastWindow?.moveTop?.();

  while (pendingToastQueue.length) {
    const item = pendingToastQueue.shift()!;
    toastWindow!.webContents.send("toast:push", item);
  }
});

ipcMain.on("toast:resize", (_event, payload: { height: number }) => {
  if (!toastWindow || toastWindow.isDestroyed()) return;

  const currentBounds = toastWindow.getBounds();
  const display = screen.getDisplayNearestPoint({
    x: currentBounds.x,
    y: currentBounds.y,
  });
  setToastWindowToRightTopOnDisplay(display, payload.height);
});

export const initToastOverlayIpc = (): void => {
  ipcMain.handle(
    "toast:push",
    (
      _event,
      payload: {
        type: "success" | "error";
        message: string;
        duration?: number;
      },
    ) => {
      pushToast(payload.type, payload.message, payload.duration ?? 3000);
      return true;
    },
  );
};
