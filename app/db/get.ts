"use server";
import { cacheTag } from "next/cache";
import { DBKey } from "./keys";
import { db } from ".";

export const get = async <T>(key: DBKey) => {
  "use cache";
  cacheTag(`db:${key}`);
  return db.get(key) as T | undefined;
};
