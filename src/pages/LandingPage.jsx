import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "../components/Hero.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import { useChat } from "../hooks/useChat.js";

export default function LandingPage({ externalPrompt, onExternalPromptConsumed }) {
  const { messages, sendMessage, isSending } = useChat();
  const [prefill, setPrefill] = useState(null);

  // Hero is shown until the user has actually sent a message (only the
  // static welcome message exists at that point - conversationStarted
  // stays false, so no /chat call has happened yet).
  const conversationStarted = messages.some((m) => m.role === "user");

  useEffect(() => {
    if (externalPrompt) {
      setPrefill(externalPrompt);
      onExternalPromptConsumed?.();
    }
  }, [externalPrompt, onExternalPromptConsumed]);

  const handlePrefill = (text) => setPrefill(text);
  const handleSend = (text) => {
    setPrefill(null);
    sendMessage(text);
  };

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence>
        {!conversationStarted && (
          <motion.div exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
            <Hero onPrefill={handlePrefill} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 min-h-0">
        <ChatWindow messages={messages} onSend={handleSend} isSending={isSending} prefill={prefill} />
      </div>
    </div>
  );
}
