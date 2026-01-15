import ChatShell from "./ChatShell";

export default function ChatPage() {
  // Server component: render a client ChatShell for interactive parts.
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 w-full">
      <ChatShell />
    </div>
  );
}
