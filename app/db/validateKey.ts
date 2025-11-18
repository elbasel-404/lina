"use server";
import { formatError } from "zod";
import { log } from "@server";
import { DBKey, dbKeysSchema } from "@types";

export const validateKey = async (key: string) => {
  const { data, success, error } = dbKeysSchema.safeParse(key);
  if (!success) {
    const formattedError = formatError(error);
    log({
      logKey: "logKeyValidationError",
      text: `Invalid DB key attempted: ${key} - Errors: ${JSON.stringify(
        formattedError
      )}`,
    });
    return { data: "unknown" as DBKey, error: formattedError };
  }
  return { data, error: null };
};
