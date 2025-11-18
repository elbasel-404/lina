import { db } from "./index";
import type { DBKey } from "@types";

export const findOne = <T>(key: DBKey) => {
  return db.get(key) as T | undefined;
};

export default findOne;
