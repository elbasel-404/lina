import { db } from "@/app/lib/globalStore";

export const streamSessions = db.ensure<
  Map<string, { chunks: string[]; finished: boolean }>
>("streamSessions", () => new Map());
