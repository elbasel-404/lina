import type { Route } from "next";

export const ENDPOINTS = {
  simpleStream: "/api/simple-stream",
  streamPoll: "/api/stream/poll",
  streamStart: "/api/stream/start",
  root: "/",
} as const satisfies Record<string, Route>;
