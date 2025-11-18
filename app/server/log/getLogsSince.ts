"use server";
import { db } from "@db";
import { LogKey } from "@types";

export type GetLogsSinceParams = {
  logKey: LogKey;
  index: number;
};
export async function getLogsSince({ logKey, index }: GetLogsSinceParams) {
  // Read directly from the underlying db map so an SSE subscriber gets
  // immediate updates. Using `getLogs` goes through a cache-tagged helper
  // that may return a stale value inside the same request.
  const logs = (db.get(logKey) as Array<any> | undefined) ?? [];
  return logs.slice(index);
}
