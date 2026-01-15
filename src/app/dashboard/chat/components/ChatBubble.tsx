export type ChatBubbleProps = {
  role: string;
  content: string;
};

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user";
  const authorLabel = isUser ? "You" : role === "assistant" ? "AI" : role;
  return (
    <div className="max-w-[80%] break-words">
      <div
        className="mb-1 text-[10px] font-medium uppercase tracking-wide text-zinc-400"
        aria-hidden
      >
        {authorLabel}
      </div>
      <div
        role="article"
        aria-label={`${authorLabel} message`}
        className={
          isUser
            ? "inline-block max-w-full rounded-2xl bg-zinc-900 px-4 py-2 text-sm text-zinc-50 break-words whitespace-pre-wrap"
            : "inline-block max-w-full rounded-2xl bg-zinc-200 px-4 py-2 text-sm text-zinc-800 break-words whitespace-pre-wrap"
        }
      >
        {content}
      </div>
    </div>
  );
}
