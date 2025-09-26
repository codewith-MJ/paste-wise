import AppError from "./AppError";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/constants/error";

class RecordNotFoundError extends AppError {
  constructor(details?: unknown, message?: string) {
    super(
      ERROR_CODES.RECORD_NOT_FOUND,
      message ?? ERROR_MESSAGES[ERROR_CODES.RECORD_NOT_FOUND],
      details,
    );
  }
}
export default RecordNotFoundError;
