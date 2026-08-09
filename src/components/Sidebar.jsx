import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiUser,
  FiFolder,
  FiCode,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiSettings,
  FiX,
} from "react-icons/fi";

const NAV_ITEMS = [
  { id: "chat", label: "Chat", icon: FiMessageSquare },
  { id: "about", label: "About", icon: FiUser },
  { id: "projects", label: "Projects", icon: FiFolder },
  { id: "skills", label: "Skills", icon: FiCode },
  { id: "resume", label: "Resume", icon: FiFileText },
];

const EXTERNAL_ITEMS = [
  { label: "GitHub", icon: FiGithub, href: "https://github.com/Ashu0609-cyber" },
  { label: "LinkedIn", icon: FiLinkedin, href: "https://www.linkedin.com/in/ashutosh-thakur-735673357" },
];

export default function Sidebar({ activeView, onNavigate, isOpen, onClose }) {
  const content = (
    <div className="flex flex-col h-full glass border-r border-line w-64 p-4">
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <span className="font-display font-semibold">Menu</span>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 focus-ring" aria-label="Close menu">
          <FiX size={18} />
        </button>
      </div>

      <nav className="flex flex-col gap-1" aria-label="Main navigation">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              onNavigate(id);
              onClose?.();
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors focus-ring ${
              activeView === id
                ? "bg-white/[0.08] text-ink-hi shadow-glow-sm"
                : "text-ink-lo hover:bg-white/[0.04] hover:text-ink-hi"
            }`}
            aria-current={activeView === id ? "page" : undefined}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-line flex flex-col gap-1">
        {EXTERNAL_ITEMS.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-lo hover:bg-white/[0.04] hover:text-ink-hi transition-colors focus-ring"
          >
            <Icon size={17} />
            {label}
          </a>
        ))}
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-lo hover:bg-white/[0.04] hover:text-ink-hi transition-colors focus-ring"
          aria-label="Settings (coming soon)"
          disabled
        >
          <FiSettings size={17} />
          Settings
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden lg:block h-full">{content}</div>

      {/* Mobile: slide-over */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
