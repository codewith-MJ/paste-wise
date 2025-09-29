const IPC = {
  HISTORY_LIST: "history:getList",
  HISTORY_DETAIL: "history:getById",
  HISTORY_DELETE: "history:delete",
} as const;

export { IPC };
