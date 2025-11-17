import { globalAny } from "../globalAny";
import { DBKey } from "./keys";

export const db = (globalAny.__globalDB ||= new Map<DBKey, any>());
