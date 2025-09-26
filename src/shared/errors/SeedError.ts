import AppError from "./AppError";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/constants/error";

class SeedError extends AppError {
  constructor(details?: unknown, message?: string) {
    super(
      ERROR_CODES.SEED_FAILED,
      message ?? ERROR_MESSAGES[ERROR_CODES.SEED_FAILED],
      details,
    );
  }
}

export default SeedError;
