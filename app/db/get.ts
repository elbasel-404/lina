import { db } from "@db";
import { DBKey } from "@types";

export const get = <T>({ key }: { key: DBKey }) => {
  return db.get(key) as T | undefined;
};
