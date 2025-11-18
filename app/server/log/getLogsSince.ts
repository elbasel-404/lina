"use server";
import { getLogs } from "@server";
import { LogKey } from "@types";

export type GetLogsSinceParams = {
  logKey: LogKey;
  index: number;
};
export async function getLogsSince({ logKey, index }: GetLogsSinceParams) {
  const logs = await getLogs({ logKey });
  return logs?.slice(index);
}
