import { DBKey } from "../types";

const globalAny = globalThis as any;

export const db = (globalAny.__globalDB ||= new Map<DBKey, any>()) as Map<
  DBKey,
  unknown
>;

// modern ORM-style client
// modern ORM-style client (moved to per-function files)
export { create } from "./create";
export { update } from "./update";
export { updateMany } from "./updateMany";
export { remove } from "./remove";
export { removeMany } from "./removeMany";
export { findOne } from "./findOne";
export { findMany } from "./findMany";
export { count } from "./count";
export { keys } from "./keys";
export { getDbKeys } from "./getDbKeys";

// legacy helpers kept for backward compatibility
export { validateKey } from "./validateKey";
