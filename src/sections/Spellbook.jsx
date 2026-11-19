import React, { useState } from "react";
import { FiGithub, FiExternalLink, FiLayers, FiCode, FiCheckCircle } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { PORTFOLIO_DATA } from "../data/portfolioData.js";

export default function Spellbook({ onAskAboutProject }) {
  const { projects } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Generative AI & RAG", "Deep Learning & LLM Core", "Computer Vision & Scientific AI", "Competitive Machine Learning"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section id="spellbook" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-midnight overflow-hidden">
      {/* Subtle stone archway background glow */}
      <div className="absolute inset-0 bg-chamber-radial opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chamber border border-gold/20 mb-3">
            <FiLayers className="text-gold text-xs" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-gold font-semibold">
              Section III • The Spellbook
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-parchment tracking-tight mb-4">
            FEATURED <span className="text-gold-gradient">PROJECTS</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-parchment-muted leading-relaxed">
            Archival records of intelligent systems, deep neural architectures, and scientific AI implementations.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-cinzel text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all focus-ring ${
                  selectedCategory === cat
                    ? "bg-gold-gradient text-midnight font-bold border-gold shadow-gold-glow-sm"
                    : "bg-chamber/80 text-parchment-muted border-line hover:border-gold/30 hover:text-parchment"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-gilded rounded-2xl overflow-hidden flex flex-col group hover:border-gold/50 transition-all duration-300 shadow-chamber-depth"
            >
              {/* Project Visual Header with Real Photography & Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.1] group-hover:scale-105 group-hover:brightness-[0.55] transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chamber via-chamber/40 to-transparent" />

                {/* Badges on Visual */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="font-cinzel text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-md bg-midnight/80 border border-gold/40 text-gold backdrop-blur-sm">
                    {project.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[11px] font-mono text-gold-light uppercase tracking-wider block">
                    {project.category}
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-parchment group-hover:text-gold transition-colors">
                    {project.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-3.5">
                  <p className="text-xs text-parchment font-medium italic border-l-2 border-gold/60 pl-2.5">
                    "{project.subtitle}"
                  </p>

                  <div>
                    <h4 className="text-[11px] font-cinzel tracking-wider uppercase text-gold-light font-semibold mb-1">
                      Problem Statement
                    </h4>
                    <p className="text-xs text-parchment-muted leading-relaxed font-body">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-cinzel tracking-wider uppercase text-gold-light font-semibold mb-1">
                      Architecture & Method
                    </h4>
                    <p className="text-xs text-parchment-muted leading-relaxed font-body">
                      {project.architecture}
                    </p>
                  </div>

                  <div className="pt-1">
                    <h4 className="text-[11px] font-cinzel tracking-wider uppercase text-gold-light font-semibold mb-1.5 flex items-center gap-1.5">
                      <FiCheckCircle className="text-emerald-accent" /> Results & Impact
                    </h4>
                    <p className="text-xs text-parchment/90 leading-relaxed font-body bg-stone/70 p-2.5 rounded-lg border border-line">
                      {project.results}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="pt-2 border-t border-line">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-chamber-hi border border-line text-parchment-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAskAboutProject(project.promptSuggestion)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gold/15 hover:bg-gold/25 border border-gold/40 hover:border-gold text-gold font-cinzel text-xs font-semibold tracking-wider uppercase transition-all focus-ring group"
                    >
                      <HiSparkles size={14} className="text-gold-light group-hover:rotate-12 transition-transform" />
                      <span>Ask Bholu</span>
                    </button>

                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2 rounded-xl bg-stone hover:bg-stone/80 border border-line hover:border-gold/40 text-parchment-muted hover:text-gold transition-colors focus-ring"
                        aria-label={`${project.name} GitHub Repository`}
                        title="View GitHub Repository"
                      >
                        <FiGithub size={16} />
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2 rounded-xl bg-stone hover:bg-stone/80 border border-line hover:border-gold/40 text-parchment-muted hover:text-gold transition-colors focus-ring"
                        aria-label={`${project.name} Live Demo`}
                        title="Open Live Demo"
                      >
                        <FiExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
