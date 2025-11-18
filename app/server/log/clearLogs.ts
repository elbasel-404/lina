"use server";

import { LogKey } from "@types";
import { set } from "@db";

export type ClearLogsParams = {
  logKey: LogKey;
};
export async function clearLogs({ logKey }: ClearLogsParams) {
  console.log("Clearing logs for key:", logKey);
  set(logKey, []);
}
