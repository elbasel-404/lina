import { globalAny } from "../globalAny";

export function getGlobal<T>(key: string): T | undefined {
  return globalAny[key] as T | undefined;
}

export function setGlobal<T>(key: string, value: T): T {
  globalAny[key] = value;
  return value;
}

export function ensureGlobal<T>(key: string, init: () => T): T {
  if (typeof globalAny[key] === "undefined") {
    globalAny[key] = init();
  }
  return globalAny[key] as T;
}

export const GLOBAL_LOGS_KEYS = {
  LOGS: "__global_logs",
  LOGS_VERSION: "__global_logs_version",
  STREAM_SESSIONS: "__global_streamSessions",
} as const;

export type GlobalLogKey =
  (typeof GLOBAL_LOGS_KEYS)[keyof typeof GLOBAL_LOGS_KEYS];

export function ensureGlobalLogs<T extends any[]>(init: () => T) {
  return ensureGlobal<T>(GLOBAL_LOGS_KEYS.LOGS, init);
}

export function ensureGlobalLogsVersion(init: () => number) {
  return ensureGlobal<number>(GLOBAL_LOGS_KEYS.LOGS_VERSION, init);
}

export function ensureGlobalStreamSessionStore<T extends Map<any, any>>(
  init: () => T
) {
  return ensureGlobal<T>(GLOBAL_LOGS_KEYS.STREAM_SESSIONS, init);
}

// Simple key/value database stored on globalThis under a single map
const DB_KEY = "__global_db";

function getDbMap(): Map<string, any> {
  return ensureGlobal<Map<string, any>>(DB_KEY, () => new Map());
}

export const db = {
  get<T>(key: string): T | undefined {
    return getDbMap().get(key) as T | undefined;
  },
  set<T>(key: string, value: T): T {
    getDbMap().set(key, value);
    return value;
  },
  has(key: string) {
    return getDbMap().has(key);
  },
  delete(key: string) {
    return getDbMap().delete(key);
  },
  ensure<T>(key: string, init: () => T): T {
    const m = getDbMap();
    if (!m.has(key)) {
      m.set(key, init());
    }
    return m.get(key) as T;
  },
  keys(): string[] {
    return Array.from(getDbMap().keys());
  },
};
