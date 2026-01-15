import { mockReply } from "@/lib/ai";
import { ChatMessage } from "@/types/chat";
import { NextResponse } from "next/server";

const jitter = () => 100 + Math.floor(Math.random() * 200);
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages ?? [];

    // Simulate a small network delay on every request
    await sleep(jitter());
    const aiReply = await mockReply(messages);

    return NextResponse.json({ ok: true, reply: aiReply });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }
}
