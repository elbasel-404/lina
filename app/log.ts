type LogEntry = {
  id: string;
  timestamp: string;
  text: string;
};

const globalAny = globalThis as any;
globalAny.__lina_logs ||= [] as LogEntry[];
const logs: LogEntry[] = globalAny.__lina_logs;

import { v4 as uuidv4 } from "uuid";

export function log(text: string) {
  const entry: LogEntry = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    text,
  };
  logs.push(entry);
  return entry;
}

export function getLogs() {
  return logs.slice();
}

// Helper used by the streaming API - returns logs starting at index
export function getLogsSince(index: number) {
  return logs.slice(index);
}

export function clearLogs() {
  logs.length = 0;
}
