import { DBEntry } from "@types";
import { get } from "./get";
import { getDbKeys } from "./getDbKeys";

export const getAllData = () => {
  const allData: DBEntry[] = [];
  const dbKeys = getDbKeys();
  dbKeys.forEach((key) => {
    const entry = get<any>({ key });
    allData.push(entry);
  });
  return allData;
};
