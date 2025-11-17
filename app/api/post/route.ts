import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Backend /api/post GET response" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: "Backend /api/post POST response",
      body,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON or error reading body" },
      { status: 400 }
    );
  }
}
