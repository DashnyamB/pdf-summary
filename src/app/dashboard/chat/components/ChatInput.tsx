"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MoreHorizontal, SendHorizonalIcon } from "lucide-react";
import EmojiPicker from "./EmojiPicker";
import ActionButtons from "./ActionButtons";

export default function ChatInput({
  onSend,
  isLoading = false,
}: {
  onSend?: (text: string) => void;
  isLoading?: boolean;
}) {
  const [text, setText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading]);

  const handleEmojiClick = (emoji: string) => setText((p) => p + emoji);

  const handleSend = useCallback(() => {
    if (!text.trim() || isLoading) return;
    onSend?.(text.trim());
    setText("");
    setShowEmojis(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [text, isLoading, onSend]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // autosize textarea height
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    const max = 160;
    const newH = Math.min(el.scrollHeight, max);
    el.style.height = `${newH}px`;
  }, [text]);

  return (
    <div className="border-t border-zinc-200 px-4 py-3">
      <div className="mx-auto max-w-2xl space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setText((p) => (p ? `${p} ` : "") + `[Attached: ${file.name}]`);
          }}
        />

        <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-500">
          <ActionButtons
            disabled={isLoading}
            onAttach={() => fileInputRef.current?.click()}
            onMore={() => {}}
          />

          <button
            type="button"
            onClick={() => setShowEmojis((s) => !s)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-lg leading-none text-zinc-500 shadow-sm hover:bg-zinc-100"
            aria-label="Toggle emoji picker"
          >
            😀
          </button>
        </div>

        {showEmojis && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm">
            <EmojiPicker onSelect={handleEmojiClick} />
          </div>
        )}

        <div className="flex items-end gap-3 rounded-4xl border border-zinc-200 bg-white px-1 py-1 shadow-sm">
          <textarea
            ref={inputRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message the assistant..."
            className="min-h-8 max-h-40 w-full resize-none border-none bg-transparent py-1 px-2 text-sm placeholder:text-zinc-400 focus:outline-none"
          />

          <button
            onClick={handleSend}
            disabled={isLoading}
            aria-label="Send message"
            className="inline-flex h-9 w-10 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-white text-xs shadow-sm transition hover:bg-zinc-800 disabled:cursor-default disabled:opacity-60"
          >
            {isLoading ? (
              <span>
                <MoreHorizontal size={16} />
              </span>
            ) : (
              <SendHorizonalIcon size={16} />
            )}
          </button>
        </div>
        <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-400">
          <div>AI may be incorrect — verify outputs</div>
        </div>
      </div>
    </div>
  );
}
