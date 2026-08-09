import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";

/**
 * Controlled from the parent via `prefill` so suggestion/recruiter cards
 * can populate the box WITHOUT sending - the actual /chat call only
 * happens on explicit submit (Enter or the Send button).
 */
export default function ChatInput({ onSend, disabled, prefill }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (prefill !== undefined && prefill !== null) {
      setValue(prefill);
      textareaRef.current?.focus();
    }
  }, [prefill]);

  const submit = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  return (
    <div className="glass rounded-2xl p-2 flex items-end gap-2 focus-within:border-accent-1/40 focus-within:shadow-glow-sm transition-all">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Ask Bholu anything..."
        rows={1}
        disabled={disabled}
        aria-label="Message Bholu"
        className="flex-1 bg-transparent resize-none outline-none text-sm text-ink-hi placeholder:text-ink-lo px-3 py-2.5 max-h-40"
      />
      <button
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="shrink-0 w-10 h-10 rounded-xl bg-bholu-gradient flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-glow transition-shadow focus-ring"
      >
        <FiSend size={16} />
      </button>
    </div>
  );
}
