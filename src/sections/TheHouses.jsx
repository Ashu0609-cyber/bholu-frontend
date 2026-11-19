import React from "react";
import { FiCheck, FiCpu, FiDatabase, FiLayers, FiTerminal, FiZap } from "react-icons/fi";
import { PORTFOLIO_DATA } from "../data/portfolioData.js";

export default function TheHouses() {
  const { skillCategories, personal, photography } = PORTFOLIO_DATA;

  const categoryIcons = {
    "Programming Languages": <FiTerminal className="text-gold" size={18} />,
    "Generative AI & LLMs": <FiZap className="text-gold" size={18} />,
    "Agentic AI & Orchestration": <FiCpu className="text-emerald-accent" size={18} />,
    "AI & Machine Learning": <FiLayers className="text-burgundy" size={18} />,
    "Backend & Cloud Engineering": <FiTerminal className="text-gold" size={18} />,
    "Databases & Vector Storage": <FiDatabase className="text-emerald-accent" size={18} />,
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-stone overflow-hidden">
      {/* Background photographic texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          src={photography.chamberBooks}
          alt="Ancient library shelves texture"
          className="w-full h-full object-cover filter brightness-50"
        />
        <div className="absolute inset-0 bg-stone" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chamber border border-gold/20 mb-3">
            <FiZap className="text-gold text-xs" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-gold font-semibold">
              Section IV • The Houses of Knowledge
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-parchment tracking-tight mb-4">
            TECHNICAL <span className="text-gold-gradient">MASTERY</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-parchment-muted leading-relaxed">
            Organized across generative systems, agentic orchestration, core machine learning, and resilient cloud backends.
          </p>
        </div>

        {/* LeetCode & Problem Solving Banner */}
        <div className="mb-12 glass-gilded rounded-2xl p-6 sm:p-8 border-slytherin-subtle bg-gradient-to-r from-chamber via-stone to-chamber flex flex-col md:flex-row items-center justify-between gap-6 shadow-magical-card">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-midnight border border-gold/40 flex items-center justify-center shrink-0 shadow-gold-glow-sm">
              <span className="font-cinzel text-2xl font-bold text-gold">100+</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-lg font-bold text-parchment">
                  Algorithmic Rigor & Data Structures
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald/30 border border-emerald/40 text-silver">
                  LeetCode
                </span>
              </div>
              <p className="text-xs sm:text-sm text-parchment-muted mt-1 font-body">
                Demonstrated mastery in Binary Search, Trees, Graphs, Dynamic Programming, and Linked Lists.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["Binary Search", "Dynamic Programming", "Graphs & Trees", "HashMaps", "Two Pointers"].map((topic) => (
              <span
                key={topic}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-midnight/80 border border-line text-parchment"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Skill Houses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.name}
              className={`glass-gilded rounded-2xl p-6 flex flex-col justify-between hover:border-gold/40 transition-all duration-300 ${
                cat.accent === "emerald" ? "border-slytherin-subtle" : ""
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-midnight border border-line flex items-center justify-center">
                      {categoryIcons[cat.name] || <FiTerminal className="text-gold" />}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gold-light">
                      {cat.houseMotif}
                    </span>
                  </div>
                  {cat.accent === "emerald" && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald/30 text-silver">
                      Slytherin Accent
                    </span>
                  )}
                </div>

                <h3 className="font-cinzel text-lg font-semibold text-parchment mb-4">
                  {cat.name}
                </h3>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-lg bg-stone/90 border border-line text-parchment/90 hover:text-gold hover:border-gold/30 transition-colors"
                    >
                      <FiCheck size={11} className="text-gold shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
