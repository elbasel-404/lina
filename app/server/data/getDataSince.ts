"use server";
import { get } from "@db";
import { DBKey } from "@types";

export type GetDataSinceParams = {
  key: DBKey;
  index: number;
};
export async function getDataSince({ key, index }: GetDataSinceParams) {
  const items = get<any[]>({ key });
  return items?.slice(index);
}
