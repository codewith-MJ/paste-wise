import AppError from "./AppError";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/constants/error";

class MigrationError extends AppError {
  constructor(details?: unknown, message?: string) {
    super(
      ERROR_CODES.MIGRATION_FAILED,
      message ?? ERROR_MESSAGES[ERROR_CODES.MIGRATION_FAILED],
      details,
    );
  }
}

export default MigrationError;
