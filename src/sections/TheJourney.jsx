import React from "react";
import { FiAward, FiCalendar, FiMapPin, FiCompass } from "react-icons/fi";
import { PORTFOLIO_DATA } from "../data/portfolioData.js";

export default function TheJourney() {
  const { achievements, photography } = PORTFOLIO_DATA;

  return (
    <section id="journey" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-midnight overflow-hidden">
      {/* Background photographic cloister arches */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src={photography.stoneCloister}
          alt="Gothic Cloister stone corridor"
          className="w-full h-full object-cover filter brightness-40"
        />
        <div className="absolute inset-0 bg-midnight/90" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chamber border border-gold/20 mb-3">
            <FiAward className="text-gold text-xs" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-gold font-semibold">
              Section V • The Hall of Honors
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-parchment tracking-tight mb-4">
            EXPERIENCE & <span className="text-gold-gradient">ACHIEVEMENTS</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-parchment-muted leading-relaxed">
            Proven engineering milestones, national hackathons, and high-impact competitive challenges.
          </p>
        </div>

        {/* Milestone Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="glass-gilded rounded-2xl p-7 flex flex-col justify-between hover:border-gold/50 transition-all duration-300 relative group shadow-chamber-depth"
            >
              {/* Top Accent Bar */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-gold-light block mb-1">
                    {item.category} • {item.organization}
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-parchment group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                </div>

                <span className="font-cinzel text-xs font-bold px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold shrink-0 shadow-gold-glow-sm">
                  {item.badge}
                </span>
              </div>

              {/* Body */}
              <p className="text-xs sm:text-sm text-parchment/90 leading-relaxed font-body mb-6 flex-1">
                {item.description}
              </p>

              {/* Meta Footer */}
              <div className="pt-4 border-t border-line flex items-center justify-between text-xs text-parchment-faint font-mono">
                <span className="flex items-center gap-1.5">
                  <FiAward className="text-gold" />
                  <span>{item.role}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="text-gold" />
                  <span>{item.date}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
