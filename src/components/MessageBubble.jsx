import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiCheck, FiAlertCircle } from "react-icons/fi";
import BholuAvatar from "./BholuAvatar.jsx";
import TypingIndicator from "./TypingIndicator.jsx";
import { renderMarkdown } from "../utils/markdown.jsx";

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageBubble({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text ?? message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const showTyping = message.streaming && !message.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isUser && <BholuAvatar size="sm" active={message.streaming} />}

      <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`relative group rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-bholu-gradient text-white rounded-tr-sm"
              : `glass rounded-tl-sm ${message.isError ? "border-red-400/30" : ""}`
          }`}
        >
          {message.isError && (
            <div className="flex items-center gap-1.5 text-red-300 text-xs mb-1.5">
              <FiAlertCircle size={13} />
              Connection issue
            </div>
          )}

          {showTyping ? (
            <TypingIndicator />
          ) : isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            renderMarkdown(message.content, handleCopy)
          )}

          {!isUser && !showTyping && message.content && (
            <button
              onClick={() => handleCopy()}
              className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full glass hover:bg-white/10 focus-ring"
              aria-label="Copy message"
            >
              {copied ? <FiCheck size={12} className="text-accent-2" /> : <FiCopy size={12} />}
            </button>
          )}
        </div>
        <span className="text-[11px] text-ink-lo mt-1 px-1">{formatTime(message.timestamp)}</span>
      </div>
    </motion.div>
  );
}
