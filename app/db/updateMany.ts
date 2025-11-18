import { update as updateFn } from "./update";
import type { DBKey } from "@types";

export const updateMany = <T>(
  entries: Array<[DBKey, (c: T | undefined) => T]>
) => {
  const results: Record<string, T> = {};
  for (const [key, updater] of entries) {
    results[key] = updateFn(key as DBKey, updater as any) as T;
  }
  return results;
};

export default updateMany;
