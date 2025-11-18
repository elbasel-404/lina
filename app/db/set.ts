// "use server";

// import { updateTag } from "next/cache";
import { db } from "@db";
import { DBKey } from "@types";

export const set = <T>(key: DBKey, value: T) => {
  db.set(key, value);
  // updateTag(key);
};
