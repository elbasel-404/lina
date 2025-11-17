export function getGlobal<T>(key: string): T | undefined {
  const globalAny = globalThis as any;
  return globalAny[key] as T | undefined;
}

export function setGlobal<T>(key: string, value: T): T {
  const globalAny = globalThis as any;
  globalAny[key] = value;
  return value;
}

export function ensureGlobal<T>(key: string, init: () => T): T {
  const globalAny = globalThis as any;
  if (typeof globalAny[key] === "undefined") {
    globalAny[key] = init();
  }
  return globalAny[key] as T;
}

// Convenience typed helpers for common keys used in this app
export const LINA_KEYS = {
  LOGS: "__lina_logs",
  LOGS_VERSION: "__lina_logs_version",
  STREAM_SESSIONS: "__lina_streamSessions",
} as const;

export type LinaKeys = (typeof LINA_KEYS)[keyof typeof LINA_KEYS];

export function ensureLinaLogs<T extends any[]>(init: () => T) {
  return ensureGlobal<T>(LINA_KEYS.LOGS, init);
}

export function ensureLinaLogsVersion(init: () => number) {
  return ensureGlobal<number>(LINA_KEYS.LOGS_VERSION, init);
}

export function ensureLinaStreamSessionStore<T extends Map<any, any>>(
  init: () => T
) {
  return ensureGlobal<T>(LINA_KEYS.STREAM_SESSIONS, init);
}

// Simple key/value database stored on globalThis under a single map
const DB_KEY = "__lina_db";

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
