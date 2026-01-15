import { ChatMessage } from "@/types/chat";

export type AIReply = {
  id: string;
  role: "assistant";
  content: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function mockReply(
  messages: ChatMessage[],
  options?: { temperature?: number }
) {
  // Very simple mock: echo last user message with canned prefix
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const prompt = lastUser ? lastUser.content : "hello";
  const trimmed = prompt.trim();
  const shortPrompt =
    trimmed.length > 140 ? `${trimmed.slice(0, 140)}…` : trimmed;
  const replyText = shortPrompt
    ? `Here's a quick next step:

- ${shortPrompt}`
    : "Here's a quick suggestion to get you unstuck.";
  const reply: AIReply = {
    id: createId(),
    role: "assistant",
    content: replyText,
  };
  const delayMs = options?.temperature ? 600 : 800;
  await sleep(delayMs);
  return reply;
}
