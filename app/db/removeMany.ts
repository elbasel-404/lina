import { remove as removeFn } from "./remove";
import type { DBKey } from "@types";

export const removeMany = (keys: DBKey[]) => {
  return keys.map((k) => removeFn(k));
};

export default removeMany;
