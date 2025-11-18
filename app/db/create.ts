import { db } from "./index";
import type { DBKey } from "@types";

export const create = async <T>(key: DBKey, value: T) => {
  db.set(key, value);
  return value;
};

export default create;
