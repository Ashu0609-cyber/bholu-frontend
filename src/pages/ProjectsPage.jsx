import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { getProjects } from "../services/api.js";
import { useApiCache } from "../hooks/useApiCache.js";
import SkeletonLoader from "../components/SkeletonLoader.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";

export default function ProjectsPage({ onAskAbout }) {
  const { data, loading, error, load } = useApiCache("projects", getProjects);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <SkeletonLoader rows={4} />;
  if (error) return <ErrorBanner onRetry={load} />;

  const projects = data?.projects || [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-2xl font-semibold mb-6">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="glass rounded-2xl p-5 flex flex-col hover:border-accent-1/30 transition-colors"
          >
            {p.category && (
              <span className="text-[11px] text-accent-2 uppercase tracking-wide mb-2">{p.category}</span>
            )}
            <h2 className="font-display text-base font-semibold text-ink-hi mb-1.5">{p.name}</h2>
            <p className="text-sm text-ink-lo leading-relaxed mb-3 flex-1">{p.description}</p>

            {p.tech_stack && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech_stack.map((t) => (
                  <span key={t} className="text-[11px] px-2 py-1 rounded-md bg-white/[0.05] border border-line text-ink-lo">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => onAskAbout(`Tell me more about the "${p.name}" project.`)}
                className="flex-1 text-xs font-medium px-3 py-2 rounded-xl bg-bholu-gradient text-white flex items-center justify-center gap-1.5 hover:shadow-glow-sm transition-shadow focus-ring"
              >
                Learn More <FiArrowUpRight size={13} />
              </button>
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl border border-line hover:bg-white/[0.05] transition-colors focus-ring"
                  aria-label={`${p.name} GitHub repository`}
                >
                  <FiGithub size={14} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
