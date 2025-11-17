import { NextResponse } from "next/server";

const streamSessions: Map<string, { chunks: string[]; finished: boolean }> =
  (global as any).__lina_streamSessions || new Map();
if (!(global as any).__lina_streamSessions) {
  (global as any).__lina_streamSessions = streamSessions;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const session = streamSessions.get(id ?? "");
  if (!session) return new NextResponse("Not found", { status: 404 });

  const stream = new ReadableStream({
    async pull(controller) {
      // If there are no chunks yet and not finished, wait
      // We'll poll the session for new chunks and push them as SSE
      let pushed = 0;
      while (!session.finished || session.chunks.length > pushed) {
        while (session.chunks.length > pushed) {
          const next = session.chunks[pushed++];
          const event = `data: ${JSON.stringify({ text: next })}\n\n`;
          controller.enqueue(new TextEncoder().encode(event));
        }
        if (session.finished && session.chunks.length <= pushed) {
          break;
        }
        await new Promise((r) => setTimeout(r, 150));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
