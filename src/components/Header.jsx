import React from "react";
import { FiGithub, FiLinkedin, FiFileText, FiSun, FiMoon, FiMenu } from "react-icons/fi";
import BholuAvatar from "./BholuAvatar.jsx";
import { useTheme } from "../hooks/useTheme.js";

const GITHUB_URL = "https://github.com/Ashu0609-cyber";
const LINKEDIN_URL = "https://www.linkedin.com/in/ashutosh-thakur-735673357";

export default function Header({ onNavigate, onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 glass border-b border-line px-4 sm:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-white/5 focus-ring text-ink-lo"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={18} />
        </button>
        <button
          onClick={() => onNavigate("chat")}
          className="flex items-center gap-2 focus-ring rounded-lg"
          aria-label="Go to chat"
        >
          <BholuAvatar size="sm" />
          <span className="font-display font-semibold text-lg tracking-tight">Bholu</span>
        </button>
      </div>

      <nav className="flex items-center gap-1 sm:gap-2">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-white/5 text-ink-lo hover:text-ink-hi transition-colors focus-ring"
          aria-label="GitHub profile"
        >
          <FiGithub size={17} />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-white/5 text-ink-lo hover:text-ink-hi transition-colors focus-ring"
          aria-label="LinkedIn profile"
        >
          <FiLinkedin size={17} />
        </a>
        <button
          onClick={() => onNavigate("resume")}
          className="p-2 rounded-lg hover:bg-white/5 text-ink-lo hover:text-ink-hi transition-colors focus-ring"
          aria-label="Resume"
        >
          <FiFileText size={17} />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-white/5 text-ink-lo hover:text-ink-hi transition-colors focus-ring"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
        </button>
      </nav>
    </header>
  );
}
