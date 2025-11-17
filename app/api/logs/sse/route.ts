import { getLogsSince } from "@/app/server/log";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const since = Number(url.searchParams.get("since") ?? 0);

  const stream = new ReadableStream({
    async pull(controller) {
      let index = since;
      const globalAny = globalThis as any;
      let lastVersion = globalAny.__lina_logs_version ?? 0;

      while (true) {
        const next = await getLogsSince(index);
        if (next.length > 0) {
          for (const entry of next) {
            const event = `data: ${JSON.stringify(entry)}\n\n`;
            controller.enqueue(new TextEncoder().encode(event));
            index++;
          }
        }

        // If logs were cleared, emit a `clear` event so clients can reset
        const newVersion = globalAny.__lina_logs_version ?? 0;
        if (newVersion > lastVersion) {
          const event = `event: clear\ndata: ${JSON.stringify({
            version: newVersion,
          })}\n\n`;
          controller.enqueue(new TextEncoder().encode(event));
          lastVersion = newVersion;
          // reset index after a clear so we don't rely on previous indices
          index = 0;
        }

        // Wait for a bit before checking for more logs
        await new Promise((r) => setTimeout(r, 150));
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
