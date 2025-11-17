import { NextResponse } from "next/server";

// Must match the same memory store used by start
// If started in a separate function invocation (serverless) this will not persist!
import { streamSessions } from "@/app/lib/streamSessions";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const cursorStr = url.searchParams.get("cursor");
  const cursor = cursorStr ? Number(cursorStr) : 0;

  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }

  const session = streamSessions.get(id);

  if (!session) {
    return NextResponse.json({ error: "unknown id" }, { status: 404 });
  }

  const newChunks = session.chunks.slice(cursor);
  const newCursor = cursor + newChunks.length;

  return NextResponse.json({
    id,
    chunks: newChunks,
    cursor: newCursor,
    finished: session.finished,
  });
}
