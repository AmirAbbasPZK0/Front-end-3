import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch("http://141.11.123.21:8003/api/tts/english/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
