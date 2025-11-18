import { db } from "./index";
import type { DBKey } from "@types";

export const remove = (key: DBKey) => {
  return db.delete(key);
};

export default remove;
