import type { ErrorCode } from "@/shared/constants/error";
import { ERROR_MESSAGES } from "@/shared/constants/error";

class IpcError extends Error {
  readonly code: ErrorCode;
  readonly details?: unknown;

  constructor(code: ErrorCode, message?: string, details?: unknown) {
    super(message ?? ERROR_MESSAGES[code]);
    this.code = code;
    this.details = details;
  }
}

export default IpcError;
