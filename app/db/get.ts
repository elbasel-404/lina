"use server";
import { cacheTag } from "next/cache";
import { db } from "@db";
import { DBKey } from "@types";

export const get = async <T>({ key }: { key: DBKey }) => {
  "use cache";
  cacheTag(key);
  return db.get(key) as T | undefined;
};
