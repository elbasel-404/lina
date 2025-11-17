"use server";

import { updateTag } from "next/cache";

// import { cacheTag } from "next/cache";

declare global {
  interface GlobalThis {
    __globalDB?: Map<string, any>;
  }
}

const globalAny = globalThis as any;

const db = (globalAny.__globalDB ||= new Map<string, any>());

export const set = async <T>(key: string, value: T) => {
  // "use cache";
  // cacheTag(`db:${key}`);
  db.set(key, value);
  updateTag(`db:${key}`);
};
