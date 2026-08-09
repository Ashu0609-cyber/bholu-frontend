import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BholuAvatar from "./BholuAvatar.jsx";

const LINES = [
  "Initializing Bholu...",
  "Loading Ashutosh's AI Portfolio...",
  "Connecting Knowledge Base...",
  "Optimizing Responses...",
  "Ready.",
];

/**
 * A short (~2s), non-skippable terminal-style boot sequence. This is the
 * one place the product spends its "boldness" on motion - everything
 * after this is quiet by comparison. Lines type in one at a time, then
 * the whole screen fades into the landing page.
 */
export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (visibleLines < LINES.length) {
      const delay = visibleLines === LINES.length - 1 ? 320 : 260;
      const t = setTimeout(() => setVisibleLines((v) => v + 1), delay);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setFadingOut(true), 350);
    return () => clearTimeout(t);
  }, [visibleLines]);

  useEffect(() => {
    if (fadingOut) {
      const t = setTimeout(onComplete, 450);
      return () => clearTimeout(t);
    }
  }, [fadingOut, onComplete]);

  return (
    <AnimatePresence>
      {!fadingOut && (
        <motion.div
          className="fixed inset-0 z-50 bg-base flex flex-col items-center justify-center px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mb-8">
            <BholuAvatar size="lg" active />
          </div>
          <div className="font-mono text-sm sm:text-base text-ink-lo space-y-2 w-full max-w-md">
            {LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={i === visibleLines - 1 && i === LINES.length - 1 ? "text-accent-2" : ""}
              >
                <span className="text-accent-1 mr-2">$</span>
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
