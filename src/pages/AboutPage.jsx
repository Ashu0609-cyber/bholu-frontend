import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { getAbout } from "../services/api.js";
import { useApiCache } from "../hooks/useApiCache.js";
import SkeletonLoader from "../components/SkeletonLoader.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";

export default function AboutPage() {
  const { data, loading, error, load } = useApiCache("about", getAbout);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <SkeletonLoader rows={3} />;
  if (error) return <ErrorBanner onRetry={load} />;
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 py-10"
    >
      <h1 className="font-display text-2xl font-semibold mb-1">{data.name}</h1>
      <p className="text-accent-2 text-sm mb-4">{data.title}</p>

      <div className="flex flex-wrap gap-4 text-xs text-ink-lo mb-6">
        {data.location && (
          <span className="flex items-center gap-1.5">
            <FiMapPin size={13} /> {data.location}
          </span>
        )}
        {data.email && (
          <span className="flex items-center gap-1.5">
            <FiMail size={13} /> {data.email}
          </span>
        )}
        {data.phone && (
          <span className="flex items-center gap-1.5">
            <FiPhone size={13} /> {data.phone}
          </span>
        )}
      </div>

      <div className="glass rounded-2xl p-5 mb-6">
        <h2 className="font-display text-sm font-semibold text-ink-lo uppercase tracking-wide mb-2">Summary</h2>
        <p className="text-sm leading-relaxed text-ink-hi">{data.summary}</p>
      </div>

      {data.education && (
        <div className="glass rounded-2xl p-5 mb-6">
          <h2 className="font-display text-sm font-semibold text-ink-lo uppercase tracking-wide mb-3">Education</h2>
          <div className="relative pl-5 border-l border-line">
            <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-bholu-gradient" />
            <p className="text-sm font-medium text-ink-hi">{data.education.degree}</p>
            <p className="text-xs text-ink-lo mt-0.5">{data.education.institution}</p>
            {data.education.cgpa && (
              <p className="text-xs text-accent-2 mt-1">CGPA: {data.education.cgpa}</p>
            )}
          </div>
        </div>
      )}

      {data.core_areas && (
        <div className="glass rounded-2xl p-5">
          <h2 className="font-display text-sm font-semibold text-ink-lo uppercase tracking-wide mb-3">Core Areas</h2>
          <div className="flex flex-wrap gap-2">
            {data.core_areas.map((area) => (
              <span key={area} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.05] border border-line text-ink-hi">
                {area}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
