"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

export default function ChatList({ messages }: { messages: ChatMessageType[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  return (
    <div className="flex flex-col gap-2 pb-4">
      <ul role="list" aria-live="polite" className="space-y-2">
        {messages.map((m) => (
          <li key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <ChatMessage role={m.role} content={m.content} />
          </li>
        ))}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
}
