export type ChatAvatarProps = { role: string };

export default function ChatAvatar({ role }: ChatAvatarProps) {
  const label = role === "user" ? "You" : role === "assistant" ? "AI" : role;
  return (
    <div
      className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-semibold text-zinc-700"
      role="img"
      aria-label={`${label} avatar`}
    >
      {label[0].toUpperCase()}
    </div>
  );
}
