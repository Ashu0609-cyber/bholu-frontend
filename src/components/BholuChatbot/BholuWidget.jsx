import React, { useState, useRef, useEffect } from "react";
import { FiX, FiSend, FiTrash2, FiMinimize2, FiMaximize2, FiCopy, FiCheck } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { PORTFOLIO_DATA } from "../../data/portfolioData.js";
import { renderMarkdown } from "../../utils/markdown.jsx";

export default function BholuWidget({
  isOpen,
  onToggle,
  onClose,
  chatState,
  pendingPrompt,
  onPendingPromptConsumed,
}) {
  const { messages, sendMessage, isSending, clearChat } = chatState;
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Consume any external prompt triggered from project cards or hero
  useEffect(() => {
    if (pendingPrompt && isOpen) {
      sendMessage(pendingPrompt);
      onPendingPromptConsumed?.();
    }
  }, [pendingPrompt, isOpen, sendMessage, onPendingPromptConsumed]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim() || isSending) return;
    const text = input;
    setInput("");
    sendMessage(text);
  };

  const handleQuestionClick = (question) => {
    sendMessage(question);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Ambient Toggle Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-chamber border border-gold/50 hover:border-gold text-parchment shadow-chamber-depth hover:shadow-gold-glow transition-all duration-300 focus-ring cursor-pointer"
          aria-label="Open Bholu AI Portfolio Assistant"
        >
          {/* Pulsing indicator orb */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/75 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
          </span>

          <div className="w-7 h-7 rounded-full bg-midnight border border-gold/40 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
            <span className="text-sm">⚡</span>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-cinzel text-xs font-bold text-gold tracking-wider uppercase">
              Consult Bholu
            </span>
            <span className="text-[10px] text-parchment-faint font-mono hidden sm:inline">
              Ask AI about Ashutosh
            </span>
          </div>
        </button>
      )}

      {/* Floating Chat Drawer / Popover Window */}
      {isOpen && (
        <div
          className={`flex flex-col bg-midnight/95 backdrop-blur-xl border border-gold/40 rounded-3xl shadow-magical-card overflow-hidden transition-all duration-300 ${
            isExpanded
              ? "w-[92vw] sm:w-[680px] h-[85vh] max-h-[850px]"
              : "w-[92vw] sm:w-[420px] h-[580px] max-h-[80vh]"
          }`}
        >
          {/* Drawer Header */}
          <div className="p-4 bg-chamber/90 border-b border-line flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-midnight border border-gold/60 flex items-center justify-center text-gold shadow-gold-glow-sm">
                <span className="text-sm">⚡</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-cinzel text-sm font-bold text-parchment tracking-wide">
                    BHOLU
                  </h3>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald/30 border border-slytherin-subtle text-silver">
                    RAG Assistant
                  </span>
                </div>
                <p className="text-[10px] text-parchment-faint font-mono">
                  Grounded in Ashutosh's Projects & Lore
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1.5 text-parchment-faint">
              <button
                onClick={clearChat}
                title="Clear Conversation"
                className="p-1.5 rounded-lg hover:text-gold hover:bg-white/5 transition-colors focus-ring"
                aria-label="Clear chat"
              >
                <FiTrash2 size={14} />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Collapse" : "Expand"}
                className="p-1.5 rounded-lg hover:text-gold hover:bg-white/5 transition-colors focus-ring hidden sm:block"
                aria-label={isExpanded ? "Collapse window" : "Expand window"}
              >
                {isExpanded ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
              </button>

              <button
                onClick={onClose}
                title="Close"
                className="p-1.5 rounded-lg hover:text-gold hover:bg-white/5 transition-colors focus-ring"
                aria-label="Close chat"
              >
                <FiX size={16} />
              </button>
            </div>
          </div>

          {/* Suggested Questions Bar */}
          <div className="px-3 py-2 bg-stone/80 border-b border-line overflow-x-auto flex gap-1.5 no-scrollbar">
            {PORTFOLIO_DATA.suggestedQuestions.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleQuestionClick(sq)}
                disabled={isSending}
                className="text-[11px] font-body text-parchment-muted hover:text-gold hover:bg-gold/10 px-2.5 py-1 rounded-full border border-line whitespace-nowrap transition-colors shrink-0 disabled:opacity-40"
              >
                {sq}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 font-body text-sm">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-chamber border border-gold/40 flex items-center justify-center text-gold text-xs shrink-0 mt-1">
                      <span>⚡</span>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "bg-chamber-hi border border-gold/30 text-parchment rounded-br-none"
                        : "bg-stone/90 border border-line text-parchment/95 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    ) : (
                      <div className="relative group">
                        {renderMarkdown(m.content, (code) => handleCopy(code, m.id))}
                        {m.streaming && (
                          <span className="inline-block w-1.5 h-3.5 ml-1 bg-gold animate-pulse" />
                        )}
                      </div>
                    )}

                    {!isUser && m.content && !m.streaming && (
                      <div className="mt-2 pt-1 border-t border-line/40 flex items-center justify-end">
                        <button
                          onClick={() => handleCopy(m.content, m.id)}
                          className="text-[10px] text-parchment-faint hover:text-gold flex items-center gap-1 focus-ring rounded"
                        >
                          {copiedId === m.id ? (
                            <>
                              <FiCheck size={10} className="text-emerald-glow" /> Copied
                            </>
                          ) : (
                            <>
                              <FiCopy size={10} /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-stone border border-line flex items-center justify-center text-parchment-muted text-xs shrink-0 mt-1">
                      <span>👤</span>
                    </div>
                  )}
                </div>
              );
            })}

            {isSending && (
              <div className="flex gap-2.5 items-center text-parchment-faint text-xs italic">
                <div className="w-7 h-7 rounded-full bg-chamber border border-gold/40 flex items-center justify-center text-gold text-xs shrink-0">
                  <span>⚡</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone/90 border border-line flex items-center gap-2">
                  <HiSparkles className="animate-spin text-gold" size={13} />
                  <span>Consulting the archives...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Drawer Footer Input */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-chamber/90 border-t border-line flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Ashutosh's projects, RAG, GPT..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-midnight border border-line focus:border-gold focus:ring-1 focus:ring-gold text-parchment placeholder:text-parchment-faint text-xs outline-none"
              disabled={isSending}
            />

            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className="p-2.5 rounded-xl bg-gold-gradient text-midnight font-bold disabled:opacity-40 hover:brightness-110 transition-all focus-ring cursor-pointer"
              aria-label="Send message"
            >
              <FiSend size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
