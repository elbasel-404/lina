import type { Route } from "next";

export const ENDPOINTS = {
  root: "/",
} as const satisfies Record<string, Route>;
