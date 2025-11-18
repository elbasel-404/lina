import { getDataSince } from "@server";
import type { DBKey } from "@types";
import { findOne } from "@db";
import { sleep } from "@util";
// DBKey type is imported above for use when reading the `key` query param.

export async function GET(req: Request) {
  const url = new URL(req.url);
  const since = Number(url.searchParams.get("since") ?? 0);
  // Allow clients to subscribe to a specific log key (default to 'default')
  // Allow clients to subscribe to a specific data key (default to 'default')
  // The `key` parameter maps to a DB key and lets the SSE endpoint stream
  // any array stored in the DB under that key.
  const keyParam = (url.searchParams.get("key") ?? "default") as string;
  const key = keyParam as DBKey;

  const stream = new ReadableStream({
    start(controller) {
      // Send an initial comment to flush any proxy/HTTP buffers so clients
      // start receiving events immediately.
      controller.enqueue(new TextEncoder().encode(`: connected\n\n`));

      const encoder = new TextEncoder();
      const heartbeat = () => {
        try {
          controller.enqueue(encoder.encode(`: heartbeat\n\n`));
        } catch (_) {
          // ignore — controller may be closed
        }
      };

      let index = since;
      const versionKey = `${key}:version`;
      let lastVersion =
        (findOne<number>(versionKey as any) as number | undefined) ?? 0;

      const signal = (req as unknown as { signal?: AbortSignal }).signal;

      const hb = setInterval(heartbeat, 15_000);

      (async function loop() {
        try {
          while (true) {
            if (signal?.aborted) {
              try {
                controller.close();
              } catch (_) {
                // ignore
              }
              break;
            }

            const next = (await getDataSince({ key, index })) ?? [];
            if (next.length > 0) {
              for (const entry of next) {
                const event = `data: ${JSON.stringify(entry)}\n\n`;
                try {
                  controller.enqueue(encoder.encode(event));
                } catch (_) {
                  break;
                }
                index++;
              }
              await sleep(50);
            } else {
              await sleep(150);
            }

            const newVersion =
              (findOne<number>(versionKey as any) as number | undefined) ?? 0;
            if (newVersion > lastVersion) {
              const event = `event: clear\ndata: ${JSON.stringify({
                version: newVersion,
                key,
              })}\n\n`;
              try {
                controller.enqueue(encoder.encode(event));
              } catch (_) {
                // ignore
              }
              lastVersion = newVersion;
              index = 0;
            }
          }
        } finally {
          clearInterval(hb);
        }
      })();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      // Prevent intermediate proxies from transforming or buffering the
      // response body. On some CDNs setting `no-transform` helps keep
      // the stream from being buffered and ensures SSE arrives in time.
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      // if you're running behind nginx you may want to set 'X-Accel-Buffering': 'no'
      "X-Accel-Buffering": "no",
      // If a client is on a different origin, allow basic cross-origin
      // access for testing. In production consider limiting this to
      // your app domain instead of '*' for security.
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// Use the Edge runtime for long-lived server-sent events
// Vercel serverless (Node) functions often buffer responses and are not
// suitable for long-lived SSE connections. The Edge runtime supports
// streaming responses and is what we want for an SSE endpoint.
export const runtime = "edge";
