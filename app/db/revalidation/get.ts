"use server";
import { cacheTag } from "next/cache";
import { db } from ".";
import { DBKey } from "./keys";

export const get = async <T>(key: DBKey) => {
  "use cache";
  cacheTag(`db:${key}`);
  return db.get(key) as T | undefined;
};
