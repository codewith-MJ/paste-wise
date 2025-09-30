const IPC = {
  HISTORY_LIST: "history:getList",
  HISTORY_DETAIL: "history:getById",
  HISTORY_DELETE: "history:delete",
  HISTORY_DROPDOWN_LIST: "history:getDropdownList",
} as const;

export { IPC };
