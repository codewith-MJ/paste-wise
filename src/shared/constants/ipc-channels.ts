const IPC = {
  HISTORY_LIST: "history:getList",
  HISTORY_DETAIL: "history:getById",
  HISTORY_DELETE: "history:delete",
  HISTORY_DROPDOWN_LIST: "history:getDropdownList",
  TONE_LIST: "tone:getList",
  TONE_DETAIL: "tone:getById",
  SHORTCUT_LIST: "shortcut:getList",
} as const;

export { IPC };
