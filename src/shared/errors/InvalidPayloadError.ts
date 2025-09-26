import AppError from "./AppError";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/constants/error";

class InvalidPayloadError extends AppError {
  constructor(details?: unknown, message?: string) {
    super(
      ERROR_CODES.INVALID_PAYLOAD,
      message ?? ERROR_MESSAGES[ERROR_CODES.INVALID_PAYLOAD],
      details,
    );
  }
}

export default InvalidPayloadError;
