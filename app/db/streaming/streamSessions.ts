import { db } from ".";

export const streamSessions = db.ensure<
  Map<string, { chunks: string[]; finished: boolean }>
>("streamSessions", () => new Map());
