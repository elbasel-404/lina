import { db } from "./index";
import type { DBKey } from "@types";

type UpdateFn<T> = (current: T | undefined) => T;

export const update = <T>(key: DBKey, updater: UpdateFn<T>) => {
  const current = db.get(key) as T | undefined;
  const updated = updater(current);
  db.set(key, updated);
  return updated;
};

export default update;
