import React from "react";
import { motion } from "framer-motion";

/**
 * The signature element of the whole product: a glowing orb that stands
 * in for Bholu everywhere (boot sequence, header, chat avatar). It pulses
 * gently at rest and glows brighter while a response is streaming in -
 * this is the "living AI" cue that replaces a generic bot icon.
 *
 * size: "sm" | "md" | "lg"
 */
export default function BholuAvatar({ size = "md", active = false }) {
  const dims = { sm: 28, md: 40, lg: 88 }[size];

  return (
    <motion.div
      className="relative rounded-full flex items-center justify-center shrink-0"
      style={{ width: dims, height: dims }}
      animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={{ duration: 1.6, repeat: active ? Infinity : 0, ease: "easeInOut" }}
    >
      <div
        className="absolute inset-0 rounded-full bg-bholu-gradient opacity-90"
        style={{ filter: active ? "blur(6px) brightness(1.15)" : "blur(2px)" }}
      />
      <div className="absolute inset-[2px] rounded-full bg-base/90" />
      <div
        className="absolute inset-[2px] rounded-full bg-bholu-gradient opacity-30"
        style={{ animation: "spin 6s linear infinite" }}
      />
      <span
        className="relative font-display font-semibold text-ink-hi select-none"
        style={{ fontSize: dims * 0.4 }}
      >
        B
      </span>
    </motion.div>
  );
}
