import { findOne } from "@db";
import { LogKey, LogEntry } from "@types";

export function getLogsByKey({ logKey }: { logKey: LogKey }) {
  const logs = findOne<LogEntry[]>(logKey);
  return logs || [];
}
