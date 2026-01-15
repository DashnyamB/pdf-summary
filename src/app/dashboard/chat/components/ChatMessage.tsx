import ChatAvatar from "./ChatAvatar";
import ChatBubble from "./ChatBubble";

export type ChatMessageProps = {
  role: string;
  content: string;
};

export default function ChatMessage({ role, content }: ChatMessageProps) {
  // Presentational: avatar + bubble. Alignment handled by parent (ChatList).
  const isUser = role === "user";
  return (
    <div className="max-w-[80%] flex items-start">
      {!isUser && <ChatAvatar role={role} />}
      <ChatBubble role={role} content={content} />
    </div>
  );
}
