"use client";

import { useCallback, useEffect, useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatList from "./components/ChatList";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

function createClientId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function ChatShell() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(
    async (text: string) => {
      const msg: ChatMessageType = {
        id: createClientId(),
        role: "user",
        content: text,
      };
      setMessages((s) => [...s, msg]);
      setIsLoading(true);
      try {
        const history = (prev: ChatMessageType[]) => [...prev, msg];
        const currentHistory = history(messages);

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: currentHistory }),
        });
        const data = await res.json();
        if (data?.reply) {
          setMessages((s) => [...s, data.reply]);
        }
      } catch (err) {
        // fallback: echo
        setMessages((s) => [
          ...s,
          { id: createClientId(), role: "assistant", content: "(no reply)" },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const hasMessages = messages.length > 0;

  const handleSuggestion = (prompt: string) => {
    void handleSend(prompt);
  };

  useEffect(() => {
    // no-op for now, could initialize conversation here
  }, []);

  return (
    <div className="flex h-160 w-full max-w-md flex-col rounded-4xl bg-zinc-50 shadow-sm ring-1 ring-zinc-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="h-4 w-6 rounded-full bg-zinc-200" />
        <div className="h-6 w-6 rounded-full bg-zinc-300" />
      </div>

      <div className="flex-1 overflow-hidden px-4 pb-2">
        <div className="chat-scroll h-full overflow-y-auto overflow-x-hidden">
          {!hasMessages && (
            <div className="flex h-full flex-col items-center justify-center text-center text-zinc-700">
              <p className="text-lg font-medium">What can I help with?</p>
              <div className="mt-6 flex w-full flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleSuggestion("What's causing this error?")}
                  className="w-full cursor-pointer rounded-full bg-zinc-200 px-4 py-2 text-sm text-zinc-800 text-left hover:bg-zinc-300"
                >
                  What's causing this error?
                </button>
                <button
                  type="button"
                  onClick={() => handleSuggestion("Is contrast strong enough?")}
                  className="w-full cursor-pointer rounded-full bg-zinc-200 px-4 py-2 text-sm text-zinc-800 text-left hover:bg-zinc-300"
                >
                  Is contrast strong enough?
                </button>
              </div>
            </div>
          )}
          {hasMessages && <ChatList messages={messages} />}
        </div>
      </div>
      {isLoading && (
        <div className="px-4 pb-1 text-left text-[11px] text-zinc-400">
          AI is thinking...
        </div>
      )}

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
