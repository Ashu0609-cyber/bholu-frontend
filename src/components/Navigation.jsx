import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { PORTFOLIO_DATA } from "../data/portfolioData.js";

export default function Navigation({ onOpenChat, onReplaySpell }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "The Great Hall", href: "#great-hall" },
    { label: "The Wizard", href: "#the-wizard" },
    { label: "The Spellbook", href: "#spellbook" },
    { label: "The Houses", href: "#skills" },
    { label: "The Journey", href: "#journey" },
    { label: "The Scroll", href: "#resume" },
    { label: "Owl Post", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-midnight/90 backdrop-blur-md border-b border-line shadow-chamber-depth py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Crest / Logo */}
          <a
            href="#great-hall"
            className="flex items-center gap-3 group focus-ring rounded-lg px-2 py-1"
          >
            <div className="w-9 h-9 rounded-full bg-chamber border border-gold/40 flex items-center justify-center shadow-gold-glow-sm group-hover:border-gold transition-colors">
              <span className="font-cinzel text-gold text-lg font-bold group-hover:scale-110 transition-transform">
                ⚡
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-base tracking-wider text-parchment font-semibold group-hover:text-gold transition-colors">
                ASHUTOSH THAKUR
              </span>
              <span className="text-[10px] tracking-widest text-parchment-faint uppercase font-mono">
                AI/ML Engineer • Hogwarts
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-cinzel text-xs uppercase tracking-wider text-parchment-muted hover:text-gold hover:bg-gold/5 px-3 py-1.5 rounded-md transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onReplaySpell && (
              <button
                onClick={() => onReplaySpell()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-400/40 hover:border-cyan-300 text-cyan-200 hover:text-white text-xs font-cinzel tracking-wider uppercase transition-all shadow-[0_0_12px_rgba(56,189,248,0.25)] focus-ring group"
                title="Cast Expecto Patronum spell"
              >
                <span className="text-cyan-300 group-hover:scale-125 transition-transform">⚡</span>
                <span className="hidden md:inline">Expecto Patronum</span>
              </button>
            )}

            <button
              onClick={() => onOpenChat()}
              className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-chamber border border-gold/40 hover:border-gold hover:shadow-gold-glow-sm text-gold text-xs font-cinzel tracking-wider uppercase transition-all focus-ring group"
              aria-label="Open Bholu AI Assistant"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/60 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              <HiSparkles className="group-hover:rotate-12 transition-transform text-gold-light" />
              <span>Consult Bholu</span>
            </button>

            <a
              href={PORTFOLIO_DATA.personal.resumePdf}
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold text-parchment text-xs font-cinzel tracking-wider uppercase transition-all focus-ring"
            >
              <FiDownload size={13} className="text-gold" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenChat()}
              className="p-2 rounded-lg bg-chamber border border-gold/30 text-gold focus-ring"
              aria-label="Consult Bholu AI"
            >
              <HiSparkles size={16} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-chamber border border-line text-parchment focus-ring"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-midnight/95 backdrop-blur-xl border-b border-line px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-cinzel text-sm uppercase tracking-wider text-parchment hover:text-gold px-3 py-2 rounded-lg hover:bg-gold/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-line flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-chamber border border-gold/40 text-gold font-cinzel text-xs uppercase tracking-wider"
              >
                <HiSparkles />
                <span>Consult Bholu (AI Assistant)</span>
              </button>
              <a
                href={PORTFOLIO_DATA.personal.resumePdf}
                download
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gold/10 border border-gold/30 text-parchment font-cinzel text-xs uppercase tracking-wider"
              >
                <FiDownload />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
