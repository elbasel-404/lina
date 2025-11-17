"use server";

type LogEntry = {
  id: string;
  timestamp: string;
  text: string;
};

import {
  ensureLinaLogs,
  setGlobal,
  LINA_KEYS,
  getGlobal,
} from "@/app/lib/globalStore";

const logs = ensureLinaLogs<LogEntry[]>(() => []);

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
  // bump a global version marker so SSE connections know logs were cleared
  const current = (getGlobal<number>(LINA_KEYS.LOGS_VERSION) ?? 0) + 1;
  setGlobal<number>(LINA_KEYS.LOGS_VERSION, current);
}
