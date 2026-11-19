import React from "react";
import { FiAward, FiBook, FiCompass, FiCode, FiTerminal } from "react-icons/fi";
import { PORTFOLIO_DATA } from "../data/portfolioData.js";

export default function TheWizard() {
  const { personal, photography } = PORTFOLIO_DATA;

  const highlights = [
    {
      icon: <FiCode className="text-gold" size={20} />,
      title: "First-Principles AI",
      desc: "Architected a 124M-parameter decoder-only GPT transformer in pure PyTorch without external model libraries.",
    },
    {
      icon: <FiTerminal className="text-emerald-accent" size={20} />,
      title: "RAG & Agentic Systems",
      desc: "Designed low-latency RAG architectures using PostgreSQL, pgvector, and tool-calling agent orchestrations.",
    },
    {
      icon: <FiAward className="text-gold" size={20} />,
      title: "Competitive Rigor",
      desc: "Ranked Top 2100 in Amazon ML Challenge among 89,000+ teams; 100+ LeetCode algorithmic challenges solved.",
    },
    {
      icon: <FiBook className="text-silver" size={20} />,
      title: "Academic Distinction",
      desc: "Pursuing B.E. in CSE at BMSIT&M Bengaluru with 8.89 / 10.00 CGPA in core algorithmic & system disciplines.",
    },
  ];

  return (
    <section id="the-wizard" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-stone overflow-hidden">
      {/* Background photographic accent with subtle blur & dark overlay */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-10 pointer-events-none overflow-hidden">
        <img
          src={photography.gothicLibrary}
          alt="Ancient Gothic Library bookshelves"
          className="w-full h-full object-cover filter brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone via-stone/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chamber border border-gold/20 mb-3">
            <FiCompass className="text-gold text-xs" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-gold font-semibold">
              Section II • Profile & Lore
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-parchment tracking-tight mb-4">
            THE WIZARD'S <span className="text-gold-gradient">JOURNEY</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-parchment-muted leading-relaxed">
            Bridging fundamental mathematics, deep learning internals, and modern generative AI architectures.
          </p>
        </div>

        {/* Editorial Layout: Left Photo & Profile Card, Right Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Atmospheric Portrait / Scholar Plate */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-gilded rounded-2xl overflow-hidden p-3 relative group">
              {/* Real Photograph with Dark Cinematic Grading */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] max-h-[460px]">
                <img
                  src={photography.gothicLibrary}
                  alt="Ancient Gothic Library with high wooden bookshelves"
                  className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />

                {/* Overlaid Profile Banner */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-chamber/90 backdrop-blur-md border border-line">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-cinzel text-base font-bold text-parchment">Ashutosh Sanjay Thakur</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald/30 border border-slytherin-subtle text-silver">
                      Slytherin Craft
                    </span>
                  </div>
                  <p className="text-xs text-gold-light font-cinzel">BMSIT&M • Class of 2026</p>
                  <p className="text-[11px] text-parchment-faint mt-1">
                    Based in Bengaluru, India • AI/ML & Generative AI
                  </p>
                </div>
              </div>

              {/* Slytherin Subtle Touch Badge */}
              <div className="mt-3 p-3.5 rounded-xl bg-chamber/70 border border-slytherin-subtle flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald/20 border border-emerald/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-silver font-cinzel font-bold text-sm">🐍</span>
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-semibold text-parchment">
                    House Affiliation & Engineering Philosophy
                  </h4>
                  <p className="text-[11px] text-parchment-muted mt-0.5 leading-relaxed">
                    Inspired by Slytherin values: resourcefulness, ambition, and surgical technical precision. Every project is built from first principles for durability and peak performance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Strategic Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="glass-gilded rounded-2xl p-6 sm:p-8">
              <h3 className="font-cinzel text-xl sm:text-2xl font-semibold text-gold mb-4 border-b border-line pb-3">
                The Architect Behind the Code
              </h3>
              <div className="space-y-4 font-body text-sm sm:text-base text-parchment/90 leading-relaxed">
                <p>
                  I am a Computer Science Engineering student at{" "}
                  <strong className="text-parchment font-semibold">BMS Institute of Technology & Management</strong>,
                  Bengaluru, driven by an obsession with how machine intelligence reasons, retrieves, and synthesizes knowledge.
                </p>
                <p>
                  Rather than treating AI models as black boxes, my journey began by implementing them from scratch. I built a{" "}
                  <span className="text-gold font-medium">124-million parameter decoder-only GPT model</span> in pure PyTorch—writing custom multi-head self-attention mechanisms, causal masks, layer normalization, and autoregressive generation loops.
                </p>
                <p>
                  My recent engineering focuses on <span className="text-gold font-medium">Agentic AI and RAG architectures</span>. In projects like <em className="text-parchment font-medium">StructureGuard</em> (super-resolution microscopy reconstruction) and <em className="text-parchment font-medium">OceanScope</em> (relational + vector search over ocean telemetry), I combine strict data grounding, high-speed vector retrieval, and automated tool calling.
                </p>
                <p>
                  My goal is straightforward: build scalable, mathematically rigorous, and production-ready intelligent systems that solve real-world problems.
                </p>
              </div>
            </div>

            {/* Core Capability Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-gilded rounded-xl p-5 hover:border-gold/40 transition-colors flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-9 h-9 rounded-lg bg-stone border border-line flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h4 className="font-cinzel text-sm font-semibold text-parchment">{item.title}</h4>
                  </div>
                  <p className="text-xs text-parchment-muted leading-relaxed flex-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
