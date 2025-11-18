import { DBEntry } from "@types";
import { get } from "./get";
import { getDbKeys } from "./getDbKeys";

export const getAllData = () => {
  const allData = {} as Record<string, DBEntry>;
  const dbKeys = getDbKeys();
  dbKeys.forEach((key) => {
    const entry = get<any>({ key });
    allData[key] = entry;
  });
  return allData;
};
