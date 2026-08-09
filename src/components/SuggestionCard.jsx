import React from "react";
import { motion } from "framer-motion";

export default function SuggestionCard({ emoji, label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="glass rounded-2xl px-4 py-4 text-left flex items-center gap-3 hover:border-accent-1/40 hover:shadow-glow-sm transition-all focus-ring"
    >
      <span className="text-xl" aria-hidden="true">{emoji}</span>
      <span className="text-sm text-ink-hi font-medium">{label}</span>
    </motion.button>
  );
}
