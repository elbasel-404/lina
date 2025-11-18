import { DBKey } from "@types";

export type DBEntry<T = unknown> = {
  id: string;
  key: DBKey;
  data: T;
};
