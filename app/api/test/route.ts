// 1. Store session metadata in Redis/DB
// 2. Use Server-Sent Events (SSE) or WebSockets for real streaming
// 3. Or use Next.js streaming responses directly

import { sleep } from "@/app/sleep";

export async function POST(request: Request) {
  const { prompt } = (await request.json()) as { prompt?: string };

  // Split the incoming prompt into chunks for streaming; adapt as needed
  const chunks = (prompt ?? "").split(/\r?\n/).filter(Boolean);
  if (chunks.length === 0) {
    // ensure we stream at least one chunk
    chunks.push("");
  }

  // Stream directly instead of polling
  const stream = new ReadableStream({
    async start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(new TextEncoder().encode(chunk));
        await sleep(2000);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
