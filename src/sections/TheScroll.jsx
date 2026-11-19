import React from "react";
import { FiDownload, FiFileText, FiLinkedin, FiGithub, FiMail, FiMapPin, FiExternalLink } from "react-icons/fi";
import { PORTFOLIO_DATA } from "../data/portfolioData.js";

export default function TheScroll() {
  const { personal, photography } = PORTFOLIO_DATA;

  return (
    <section id="resume" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-stone overflow-hidden">
      {/* Ancient parchment background visual accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src={photography.ancientBooks}
          alt="Ancient manuscript and quill"
          className="w-full h-full object-cover filter brightness-50"
        />
        <div className="absolute inset-0 bg-stone/90" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chamber border border-gold/20 mb-3">
            <FiFileText className="text-gold text-xs" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-gold font-semibold">
              Section VI • The Archival Scroll
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-parchment tracking-tight mb-4">
            CURRICULUM <span className="text-gold-gradient">VITAE</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-parchment-muted leading-relaxed">
            A comprehensive record of academic standing, technical proficiencies, and verified engineering projects.
          </p>

          {/* Direct Download Button */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={personal.resumePdf}
              download
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gold-gradient text-midnight font-cinzel text-xs font-bold tracking-widest uppercase shadow-gold-glow hover:brightness-110 transition-all focus-ring"
            >
              <FiDownload size={16} />
              <span>Download Official Resume (PDF)</span>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-chamber border border-line hover:border-gold/40 text-parchment-muted hover:text-gold font-cinzel text-xs font-semibold tracking-wider uppercase transition-colors focus-ring"
            >
              <FiLinkedin size={15} />
              <span>LinkedIn Profile</span>
              <FiExternalLink size={12} />
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-chamber border border-line hover:border-gold/40 text-parchment-muted hover:text-gold font-cinzel text-xs font-semibold tracking-wider uppercase transition-colors focus-ring"
            >
              <FiGithub size={15} />
              <span>GitHub Repositories</span>
              <FiExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Illuminated Parchment Scroll Container */}
        <div className="glass-gilded rounded-3xl p-6 sm:p-10 border-gold/30 shadow-magical-card relative">
          {/* Scroll Header */}
          <div className="border-b border-line pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-2xl font-bold text-parchment">{personal.name}</h3>
              <p className="font-cinzel text-sm text-gold-light tracking-wide uppercase mt-0.5">
                {personal.title}
              </p>
            </div>
            <div className="flex flex-col sm:items-end text-xs text-parchment-muted font-mono space-y-1">
              <span className="flex items-center gap-1.5">
                <FiMail className="text-gold" /> {personal.email}
              </span>
              <span className="flex items-center gap-1.5">
                <FiMapPin className="text-gold" /> {personal.location}
              </span>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-gold font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" /> Formal Education
            </h4>
            <div className="p-4 rounded-xl bg-stone/70 border border-line">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <span className="font-cinzel text-base font-semibold text-parchment">
                  {personal.education.institution}
                </span>
                <span className="font-mono text-xs text-parchment-faint">
                  {personal.education.duration}
                </span>
              </div>
              <p className="text-sm text-parchment-muted font-body mb-2">
                {personal.education.degree} —{" "}
                <strong className="text-gold font-mono">CGPA: {personal.education.cgpa}</strong>
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {personal.education.keyHighlights.map((hl) => (
                  <span
                    key={hl}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-chamber border border-line text-parchment/80"
                  >
                    {hl}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Engineering Projects Snapshot */}
          <div className="mb-8">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-gold font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" /> Key Engineering Projects
            </h4>
            <div className="space-y-3">
              {[
                {
                  name: "StructureGuard",
                  role: "Microscopy Reconstruction & Scientific Validation Platform (Micro-EDSR-32)",
                  tech: "PyTorch, OpenCV, Scientific Metrics, Docker",
                },
                {
                  name: "OceanScope",
                  role: "Natural Language Oceanographic Telemetry Query Engine with Hybrid RAG",
                  tech: "FastAPI, PostgreSQL, pgvector, LangChain, Gemini API",
                },
                {
                  name: "GPT-124M from Scratch",
                  role: "Decoder-Only Transformer Architecture in Pure PyTorch (Causal MHA, LayerNorm)",
                  tech: "PyTorch, CUDA, Custom Tokenizer, AdamW",
                },
              ].map((proj) => (
                <div key={proj.name} className="p-3.5 rounded-xl bg-stone/60 border border-line">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-sm font-semibold text-parchment">{proj.name}</span>
                    <span className="text-[11px] font-mono text-gold-light">{proj.tech}</span>
                  </div>
                  <p className="text-xs text-parchment-muted mt-1 font-body">{proj.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Competitions */}
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-gold font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" /> Competitions & Honors
            </h4>
            <div className="p-4 rounded-xl bg-stone/70 border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="font-cinzel text-sm font-semibold text-parchment">
                  Amazon ML Challenge 2024 (Amazon India)
                </span>
                <p className="text-xs text-parchment-muted mt-0.5">
                  Top 2100 rank out of 89,000+ registered engineering teams nationwide.
                </p>
              </div>
              <span className="font-cinzel text-xs font-bold px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold shrink-0">
                Top 2.3% Nationwide
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
