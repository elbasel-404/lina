# Lina

## Vercel & SSE notes

- The SSE endpoint at `app/api/logs/route.ts` streams logs from an in-memory Map during local development. This works locally because the dev server is a single long-lived process that keeps global state between requests.
- In production (Vercel), serverless Node functions are ephemeral and may buffer responses; the connection may be dropped or buffered, and global memory doesn't persist across instances. To fix this:
  - The SSE endpoint now uses `export const runtime = "edge"` so it runs in the Edge runtime and supports streaming.
  - Use a persistent store (Redis, Upstash, Supabase, Postgres, or Vercel KV) for shared logs if you need to keep logs or share state between instances.
  - Prefer relative `/api/logs` endpoints from clients to avoid cross-origin issues when deploying to different domains.
  - If you need advanced realtime features or horizontal scale, consider a WebSocket provider (Ably, Pusher, Socket.io) or a managed solution like Supabase Realtime.
