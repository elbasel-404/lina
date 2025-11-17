import { formatError } from "zod";
import { log } from "../../server/log";
import { KEYS } from "./keys";

export const validateKey = (key: string) => {
  const { data, success, error } = KEYS.safeParse(key);
  if (!success) {
    const formattedError = formatError(error);
    log(`[ERROR:validateKey] Invalid key: ${key} - ${formattedError}`);
    return formattedError;
  }
  return data;
};
