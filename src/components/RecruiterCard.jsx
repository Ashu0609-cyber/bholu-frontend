import React from "react";
import { motion } from "framer-motion";

const ACTIONS = [
  { emoji: "🚀", label: "Best AI Project", prompt: "What is Ashutosh's best AI project?" },
  { emoji: "💻", label: "Technical Skills", prompt: "What are Ashutosh's technical skills?" },
  { emoji: "📄", label: "Resume", prompt: "Give me a quick summary of Ashutosh's resume." },
  { emoji: "🧠", label: "Why Hire Ashutosh?", prompt: "Why should I hire Ashutosh?" },
];

/**
 * Amber is used ONLY here, deliberately - it's the single warm accent in
 * an otherwise violet/teal product, so a recruiter's eye lands here first
 * as a distinct, purposeful moment rather than a decorative repeat.
 */
export default function RecruiterCard({ onPrefill }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="glass rounded-2xl p-4 border-amber/20"
      style={{ borderColor: "rgba(245,166,35,0.25)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-amber text-sm font-semibold tracking-wide uppercase">Hiring? Start here</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            onClick={() => onPrefill(a.prompt)}
            className="flex items-center gap-2 text-left text-xs sm:text-sm px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-amber/30 transition-colors focus-ring"
          >
            <span aria-hidden="true">{a.emoji}</span>
            <span className="text-ink-hi">{a.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
