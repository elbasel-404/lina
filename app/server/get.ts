"use server";
import { cacheTag } from "next/cache";

declare global {
  interface GlobalThis {
    __globalDB?: Map<string, any>;
  }
}

const globalAny = globalThis as any;

const db = (globalAny.__globalDB ||= new Map<string, any>());

export const get = async <T>(key: string) => {
  "use cache";
  cacheTag(`db:${key}`);
  return db.get(key) as T | undefined;
};
