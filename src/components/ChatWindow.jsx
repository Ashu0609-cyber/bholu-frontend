import React, { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble.jsx";
import ChatInput from "./ChatInput.jsx";

export default function ChatWindow({ messages, onSend, isSending, prefill }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
        </AnimatePresence>
      </div>

      <div className="px-4 sm:px-6 pb-5 pt-2">
        <ChatInput onSend={onSend} disabled={isSending} prefill={prefill} />
        <p className="text-[11px] text-ink-lo text-center mt-2">
          Bholu answers from Ashutosh's real portfolio data — it'll say so honestly if something isn't documented yet.
        </p>
      </div>
    </div>
  );
}
