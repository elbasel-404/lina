import { sleep } from "@/app/util/sleep";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// In-memory streaming sessions - for demo and local development only
import { streamSessions } from "@/app/lib/streamSessions";

async function produceStream(id: string, prompt?: string) {
  const session = streamSessions.get(id);
  if (!session) return;

  //   const encoder = new TextEncoder();

  // Simulate streaming by periodically pushing chunks
  const defaultChunks = [
    `Starting streaming for prompt: ${prompt ?? "(no prompt)"}\n`,
    "Thinking and computing...\n",
    "Composing response piece 1\n",
    "Composing response piece 2\n",
    "Finalizing and done",
  ];

  for (const chunk of defaultChunks) {
    session.chunks.push(chunk);
    await sleep(2000);
  }

  session.finished = true;
}

export async function POST(request: Request) {
  const { prompt } = (await request.json()) ?? {};

  const id = uuidv4();
  streamSessions.set(id, { chunks: [], finished: false });

  // Start the producer, don't await so we can run it in background for poll clients
  produceStream(id, prompt).catch((e) => {
    console.error("stream producer error:", e);
    const s = streamSessions.get(id);
    if (s) s.finished = true;
  });

  return NextResponse.json({ id });
}

export async function GET(request: Request) {
  // quick helper to debug sessions
  const body = Array.from(streamSessions.entries()).map(([id, s]) => ({
    id,
    len: s.chunks.length,
    finished: s.finished,
  }));
  return NextResponse.json(body);
}
