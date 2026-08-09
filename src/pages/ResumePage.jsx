import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { getResume } from "../services/api.js";
import { useApiCache } from "../hooks/useApiCache.js";
import SkeletonLoader from "../components/SkeletonLoader.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";

const RESUME_URL = import.meta.env.VITE_RESUME_URL || null;

export default function ResumePage() {
  const { data, loading, error, load } = useApiCache("resume", getResume);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <SkeletonLoader rows={4} />;
  if (error) return <ErrorBanner onRetry={load} />;
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 py-10"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">{data.name}</h1>
          <p className="text-accent-2 text-sm mt-1">{data.title}</p>
        </div>
        {RESUME_URL ? (
          <a
            href={RESUME_URL}
            download
            className="flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-xl bg-bholu-gradient text-white hover:shadow-glow-sm transition-shadow focus-ring shrink-0"
          >
            <FiDownload size={14} /> Download
          </a>
        ) : null}
      </div>

      <div className="glass rounded-2xl p-5 mb-5">
        <p className="text-sm leading-relaxed text-ink-hi">{data.summary}</p>
      </div>

      {data.education?.length > 0 && (
        <div className="glass rounded-2xl p-5 mb-5">
          <h2 className="font-display text-sm font-semibold text-ink-lo uppercase tracking-wide mb-3">Education</h2>
          <div className="space-y-4">
            {data.education.map((ed, i) => (
              <div key={i} className="relative pl-5 border-l border-line">
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-bholu-gradient" />
                <p className="text-sm font-medium text-ink-hi">{ed.degree}</p>
                <p className="text-xs text-ink-lo">{ed.institution}{ed.location ? ` — ${ed.location}` : ""}</p>
                {ed.cgpa && <p className="text-xs text-accent-2 mt-0.5">CGPA: {ed.cgpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects?.length > 0 && (
        <div className="glass rounded-2xl p-5 mb-5">
          <h2 className="font-display text-sm font-semibold text-ink-lo uppercase tracking-wide mb-3">Projects</h2>
          {data.projects.map((p, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <p className="text-sm font-medium text-ink-hi mb-1.5">{p.name}</p>
              <ul className="list-disc list-inside space-y-1">
                {p.highlights?.map((h, j) => (
                  <li key={j} className="text-xs text-ink-lo leading-relaxed">{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.skills && (
        <div className="glass rounded-2xl p-5">
          <h2 className="font-display text-sm font-semibold text-ink-lo uppercase tracking-wide mb-3">Skills</h2>
          <div className="space-y-3">
            {Object.entries(data.skills).map(([key, values]) => (
              <div key={key}>
                <p className="text-xs text-ink-lo capitalize mb-1.5">{key.replace(/_/g, " ")}</p>
                <div className="flex flex-wrap gap-1.5">
                  {values.map((v) => (
                    <span key={v} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] border border-line text-ink-hi">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
