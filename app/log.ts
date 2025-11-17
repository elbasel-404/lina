"use server";
type LogEntry = {
  id: string;
  timestamp: string;
  text: string;
};

const globalAny = globalThis as any;
globalAny.__lina_logs ||= [] as LogEntry[];
const logs: LogEntry[] = globalAny.__lina_logs;

import { v4 as uuidv4 } from "uuid";

export async function log(text: string) {
  const entry: LogEntry = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    text,
  };
  logs.push(entry);
  return entry;
}

export async function getLogs() {
  return logs.slice();
}

export async function getLogsSince(index: number) {
  return logs.slice(index);
}

export async function clearLogs() {
  logs.length = 0;
  // bump a version marker so SSE connections know logs were cleared
  const globalAny = globalThis as any;
  globalAny.__lina_logs_version = (globalAny.__lina_logs_version ?? 0) + 1;
}
