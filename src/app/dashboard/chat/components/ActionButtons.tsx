import { Plus, Paperclip, MoreHorizontal } from "lucide-react";

export default function ActionButtons({
  onAttach,
  onLink,
  onMore,
  disabled,
}: {
  onAttach: () => void;
  onLink?: () => void;
  onMore: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="mb-2 flex items-center gap-2 text-zinc-500">
      <button
        type="button"
        onClick={() => !disabled && onAttach()}
        disabled={disabled}
        aria-label="Attach file"
        className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-zinc-200 text-xs hover:bg-zinc-300 disabled:cursor-default disabled:opacity-60"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => !disabled && (onLink ? onLink() : onAttach())}
        disabled={disabled}
        aria-label="Add link"
        className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-zinc-200 text-xs hover:bg-zinc-300 disabled:cursor-default disabled:opacity-60"
      >
        <Paperclip className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => !disabled && onMore()}
        disabled={disabled}
        aria-label="More options"
        className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-zinc-200 text-xs hover:bg-zinc-300 disabled:cursor-default disabled:opacity-60"
      >
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
