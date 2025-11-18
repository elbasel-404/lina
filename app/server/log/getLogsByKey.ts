"use server";

import { get } from "@db";
import { LogKey, LogEntry } from "@types";

export async function getLogsByKey({ logKey }: { logKey: LogKey }) {
  const logs = await get<LogEntry[]>({ key: logKey });
  return logs || [];
}
