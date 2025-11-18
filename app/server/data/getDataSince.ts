"use server";
import { findOne } from "@db";
import { DBKey } from "@types";

export type GetDataSinceParams = {
  key: DBKey;
  index: number;
};
export async function getDataSince({ key, index }: GetDataSinceParams) {
  const items = findOne<any[]>(key);
  return items?.slice(index);
}
