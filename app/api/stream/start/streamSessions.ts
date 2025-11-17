// In-memory streaming sessions - for demo and local development only

export const streamSessions: Map<
  string,
  { chunks: string[]; finished: boolean }
> = (global as any).__lina_streamSessions || new Map();
