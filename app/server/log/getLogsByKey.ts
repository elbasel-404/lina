import { get } from "@db";
import { LogKey, LogEntry } from "@types";

export function getLogsByKey({ logKey }: { logKey: LogKey }) {
  const logs = get<LogEntry[]>({ key: logKey });
  return logs || [];
}
