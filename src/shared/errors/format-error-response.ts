import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/constants/error";
import AppError from "@/shared/errors/AppError";
import InvalidPayloadError from "@/shared/errors/InvalidPayloadError";

type ErrorResponse = {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

function formatErrorResponse(error: unknown): ErrorResponse {
  if (error instanceof InvalidPayloadError) {
    return {
      ok: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    };
  }

  if (error instanceof AppError) {
    return {
      ok: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    };
  }

  return {
    ok: false,
    error: {
      code: ERROR_CODES.INTERNAL,
      message: ERROR_MESSAGES[ERROR_CODES.INTERNAL],
      details: String((error as Error)?.message ?? error),
    },
  };
}

export default formatErrorResponse;
