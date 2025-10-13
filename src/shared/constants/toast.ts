const TOAST_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
} as const;

export type ToastType = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];

export { TOAST_TYPE };
