import { DBKey } from "../types";

const globalAny = globalThis as any;

export const db = (globalAny.__globalDB ||= new Map<DBKey, any>()) as Map<
  DBKey,
  unknown
>;

export { get } from "./get";
export { set } from "./set";
export { getDbKeys } from "./getDbKeys";
export { validateKey } from "./validateKey";
