"use server";

import { updateTag } from "next/cache";
import { DBKey } from "./keys";
import { db } from ".";

export const set = async <T>(key: DBKey, value: T) => {
  db.set(key, value);
  updateTag(`db:${key}`);
};
