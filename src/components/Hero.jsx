import React from "react";
import { motion } from "framer-motion";
import BholuAvatar from "./BholuAvatar.jsx";
import SuggestionCard from "./SuggestionCard.jsx";
import RecruiterCard from "./RecruiterCard.jsx";

const SUGGESTIONS = [
  { emoji: "🧠", label: "Tell me about Ashutosh", prompt: "Tell me about Ashutosh." },
  { emoji: "🚀", label: "Explain his GPT Project", prompt: "Explain his GPT project in detail." },
  { emoji: "💻", label: "Show AI Projects", prompt: "Show me his AI projects." },
  { emoji: "📄", label: "View Resume", prompt: "Walk me through his resume." },
];

export default function Hero({ onPrefill }) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <BholuAvatar size="lg" />
        <h1 className="font-display text-3xl sm:text-4xl font-semibold mt-6 leading-tight">
          👋 Hey! I'm <span className="text-gradient">Bholu</span>
        </h1>
        <p className="text-ink-lo mt-3 text-base sm:text-lg">
          Ashutosh's Personal AI Portfolio Assistant.
        </p>
        <p className="text-ink-lo mt-1 text-sm sm:text-base max-w-md">
          Instead of browsing a traditional portfolio, just ask me anything —
          projects, skills, resume, AI journey, or future goals.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8"
      >
        {SUGGESTIONS.map((s) => (
          <SuggestionCard key={s.label} emoji={s.emoji} label={s.label} onClick={() => onPrefill(s.prompt)} />
        ))}
      </motion.div>

      <div className="mt-6 text-left">
        <RecruiterCard onPrefill={onPrefill} />
      </div>
    </div>
  );
}
