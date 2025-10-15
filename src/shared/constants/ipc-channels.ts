const IPC = {
  HISTORY_LIST: "history:getList",
  HISTORY_DETAIL: "history:getById",
  HISTORY_DELETE: "history:delete",
  HISTORY_DROPDOWN_LIST: "history:getDropdownList",
  TONE_LIST: "tone:getList",
  TONE_DETAIL: "tone:getById",
  SHORTCUT_LIST: "shortcut:getList",
  HUD_SHOW: "hud:show",
  HUD_HIDE: "hud:hide",
  TOAST_PUSH: "toast:push",
  TOAST_READY: "toast:ready",
  TOAST_RESIZE: "toast:resize",
  CONVERSION_START: "conversion:start",
  CONVERSION_DONE: "conversion:done",
  AUTH_GOOGLE_LOGIN: "auth:google-login",
  AUTH_LOGOUT: "auth:logout",
} as const;

export { IPC };
