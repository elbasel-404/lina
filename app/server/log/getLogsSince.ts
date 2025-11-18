"use server";
import { getDataSince } from "@server";
import { LogKey } from "@types";

export type GetLogsSinceParams = {
  logKey: LogKey;
  index: number;
};
export async function getLogsSince({ logKey, index }: GetLogsSinceParams) {
  // Reuse the generic getDataSince helper so we retrieve the logs array
  // stored under the named `logKey` DB key. This keeps backwards
  // compatibility for log-specific callers and avoids duplication.
  const items = await getDataSince({ key: logKey, index });
  return items;
}
