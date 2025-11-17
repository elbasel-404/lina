import { getLogsSince } from "@/app/log";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const since = Number(url.searchParams.get("since") ?? 0);

  const stream = new ReadableStream({
    async pull(controller) {
      let index = since;

      while (true) {
        const next = await getLogsSince(index);
        if (next.length > 0) {
          for (const entry of next) {
            const event = `data: ${JSON.stringify(entry)}\n\n`;
            controller.enqueue(new TextEncoder().encode(event));
            index++;
          }
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
