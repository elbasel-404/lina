import { db } from "./index";
import type { DBKey } from "@types";

export const findMany = <T>(keys?: DBKey[]) => {
  if (keys && keys.length) {
    return keys.map((k) => ({ key: k, value: db.get(k) as T | undefined }));
  }
  const entries: Array<{ key: DBKey; value: T | undefined }> = [];
  for (const [key, value] of db.entries()) {
    entries.push({ key, value: value as T | undefined });
  }
  return entries;
};

export default findMany;
