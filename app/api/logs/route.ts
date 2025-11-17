import { NextResponse } from "next/server";
import { getLogs } from "@/app/log";

export async function GET() {
  const body = getLogs();
  return NextResponse.json(body);
}
