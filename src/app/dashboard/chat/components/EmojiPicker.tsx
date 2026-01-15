import React from "react";

export default function EmojiPicker({ onSelect }: { onSelect: (emoji: string) => void }) {
  const emojis = ["😀", "😅", "🤔", "👍"];
  return (
    <div className="mb-2 flex gap-2 text-lg">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className="cursor-pointer hover:scale-110"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
