import { z, ZodType } from "zod";
import InvalidPayloadError from "@/shared/errors/InvalidPayloadError";
import { VALIDATION_MESSAGES } from "../constants/error";

const IdSchema = z.coerce
  .number({ error: VALIDATION_MESSAGES.ID_MUST_BE_NUMBER })
  .int({ error: VALIDATION_MESSAGES.ID_MUST_BE_INTEGER })
  .positive({ error: VALIDATION_MESSAGES.ID_POSITIVE_INTEGER });

function validateWith<T extends ZodType>(schema: T, payload: unknown) {
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    throw new InvalidPayloadError(parsed.error.issues);
  }

  return parsed.data as z.infer<T>;
}

export { IdSchema, validateWith };
