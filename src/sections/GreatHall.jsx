import React from "react";
import { FiArrowDown, FiDownload, FiBookOpen } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { PORTFOLIO_DATA } from "../data/portfolioData.js";

export default function GreatHall({ onOpenChat }) {
  const { personal, photography } = PORTFOLIO_DATA;

  return (
    <section
      id="great-hall"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-midnight"
    >
      {/* Real Photographic Background with Cinematic Grading */}
      <div className="absolute inset-0 z-0">
        <img
          src={photography.greatHall}
          alt="Atmospheric Gothic Great Hall with historic stone arches and warm candlelight"
          className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.15] scale-105 animate-candle-flicker"
          loading="eager"
        />
        {/* Layered cinematic overlays: Midnight vignette & warm candle radial */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone via-stone/70 to-midnight/90" />
        <div className="absolute inset-0 bg-candle-glow opacity-80" />
        <div className="absolute inset-0 bg-parchment-vignette opacity-90" />
      </div>

      {/* Floating dust & ember particles overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(#F3E5AB_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Subtle House Crest / Motif */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-chamber/90 border border-gold/30 backdrop-blur-md mb-6 shadow-gold-glow-sm">
          <span className="text-gold font-cinzel text-xs font-semibold tracking-widest uppercase">
            ⚡ Welcome to the Great Hall
          </span>
          <span className="w-1 h-1 rounded-full bg-emerald-accent" />
          <span className="text-[11px] font-mono tracking-wider text-parchment-faint">
            Slytherin Craft • AI Engineering
          </span>
        </div>

        {/* Main Name Heading */}
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-parchment mb-4 leading-tight">
          ASHUTOSH <span className="text-gold-gradient">THAKUR</span>
        </h1>

        {/* Professional Introduction */}
        <div className="flex items-center gap-2 sm:gap-3 text-gold-light text-base sm:text-xl font-cinzel tracking-wider uppercase mb-3">
          <span>AI/ML Engineer</span>
          <span className="text-line-bright">•</span>
          <span>Generative AI Developer</span>
        </div>

        {/* Academic Affiliation */}
        <p className="text-xs sm:text-sm text-parchment-muted font-body max-w-xl mb-6">
          B.E. Computer Science & Engineering •{" "}
          <span className="text-parchment font-medium">BMS Institute of Technology & Management</span>, Bengaluru
          <span className="ml-2 inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-emerald/30 border border-slytherin-subtle text-silver">
            CGPA: 8.89
          </span>
        </p>

        {/* Tagline */}
        <blockquote className="font-cinzel italic text-lg sm:text-2xl text-parchment/90 max-w-2xl mb-8 border-y border-line py-3">
          "{personal.tagline}"
        </blockquote>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#spellbook"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-midnight font-cinzel text-xs font-bold tracking-widest uppercase shadow-gold-glow hover:brightness-110 transition-all focus-ring"
          >
            <FiBookOpen size={16} />
            <span>Explore My Work</span>
          </a>

          <button
            onClick={() => onOpenChat()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-chamber/90 hover:bg-chamber-hi border border-gold/40 hover:border-gold text-gold font-cinzel text-xs font-bold tracking-widest uppercase shadow-chamber-depth transition-all focus-ring group"
          >
            <HiSparkles className="group-hover:rotate-12 transition-transform text-gold-light" size={16} />
            <span>Meet Bholu (AI Assistant)</span>
          </button>

          <a
            href={personal.resumePdf}
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone/80 hover:bg-stone border border-line hover:border-gold/30 text-parchment-muted hover:text-parchment font-cinzel text-xs font-semibold tracking-wider uppercase transition-all focus-ring"
          >
            <FiDownload size={15} />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#the-wizard"
          className="mt-14 inline-flex flex-col items-center gap-2 text-parchment-faint hover:text-gold transition-colors group focus-ring rounded-lg p-2"
          aria-label="Scroll down to About Me"
        >
          <span className="font-cinzel text-[10px] tracking-widest uppercase">Descend to Chambers</span>
          <FiArrowDown className="group-hover:translate-y-1 transition-transform text-gold animate-bounce" size={16} />
        </a>
      </div>
    </section>
  );
}
