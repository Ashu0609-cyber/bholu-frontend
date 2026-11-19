import React from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { PORTFOLIO_DATA } from "../data/portfolioData.js";

export default function Footer() {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-midnight border-t border-line py-12 px-4 sm:px-6 lg:px-8 text-parchment-muted text-xs">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-center">
        {/* Crest */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-chamber border border-gold/40 flex items-center justify-center text-gold shadow-gold-glow-sm">
            <span className="text-sm">⚡</span>
          </div>
          <span className="font-cinzel text-sm font-bold text-parchment tracking-widest uppercase">
            ASHUTOSH SANJAY THAKUR
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald/20 border border-slytherin-subtle text-silver">
            Slytherin Craft
          </span>
        </div>

        <p className="font-cinzel italic text-parchment-faint max-w-md">
          "{personal.tagline}"
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-parchment-muted">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-gold hover:bg-chamber transition-colors focus-ring"
            aria-label="GitHub"
          >
            <FiGithub size={18} />
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-gold hover:bg-chamber transition-colors focus-ring"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={18} />
          </a>

          <a
            href={`mailto:${personal.email}`}
            className="p-2 rounded-lg hover:text-gold hover:bg-chamber transition-colors focus-ring"
            aria-label="Email"
          >
            <FiMail size={18} />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg hover:text-gold hover:bg-chamber transition-colors focus-ring ml-2 flex items-center gap-1 font-cinzel text-[11px] uppercase"
            aria-label="Back to top"
          >
            <FiArrowUp size={14} /> Top
          </button>
        </div>

        <div className="border-t border-line/50 pt-6 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-parchment-faint font-mono gap-2">
          <span>© {new Date().getFullYear()} Ashutosh Sanjay Thakur. All rights reserved.</span>
          <span>Crafted with Hogwarts Inspiration & Modern Web Engineering</span>
        </div>
      </div>
    </footer>
  );
}
