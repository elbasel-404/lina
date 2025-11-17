import { ensureLinaStreamSessionStore } from "@/app/lib/globalStore";

export const streamSessions = ensureLinaStreamSessionStore<
  Map<string, { chunks: string[]; finished: boolean }>
>(() => new Map());
