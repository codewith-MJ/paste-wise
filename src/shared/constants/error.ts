const ERROR_CODES = {
  INVALID_PAYLOAD: "INVALID_PAYLOAD",
  RECORD_NOT_FOUND: "RECORD_NOT_FOUND",
  MIGRATION_FAILED: "MIGRATION_FAILED",
  SEED_FAILED: "SEED_FAILED",
  INTERNAL: "INTERNAL",
} as const;

type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ERROR_CODES.INVALID_PAYLOAD]: "Invalid payload",
  [ERROR_CODES.RECORD_NOT_FOUND]: "Record not found",
  [ERROR_CODES.MIGRATION_FAILED]: "Database migration failed.",
  [ERROR_CODES.SEED_FAILED]: "Database seeding failed.",
  [ERROR_CODES.INTERNAL]: "Internal error",
};

const VALIDATION_MESSAGES = {
  ID_MUST_BE_NUMBER: "ID must be a number",
  ID_MUST_BE_INTEGER: "ID must be an integer",
  ID_POSITIVE_INTEGER: "ID must be a positive integer",
} as const;

export { ERROR_CODES, ErrorCode, ERROR_MESSAGES, VALIDATION_MESSAGES };
