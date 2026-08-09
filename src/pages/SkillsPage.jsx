import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { getSkills } from "../services/api.js";
import { useApiCache } from "../hooks/useApiCache.js";
import SkeletonLoader from "../components/SkeletonLoader.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";

const CATEGORY_LABELS = {
  programming_languages: "Programming",
  ai_ml_genai: "AI / Generative AI",
  libraries_and_frameworks: "Frameworks & Libraries",
  vector_databases_and_retrieval: "Vector Databases & Retrieval",
  databases: "Databases",
  tools: "Tools",
  core_areas: "Core Areas",
};

export default function SkillsPage() {
  const { data, loading, error, load } = useApiCache("skills", getSkills);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <SkeletonLoader rows={4} />;
  if (error) return <ErrorBanner onRetry={load} />;
  if (!data) return null;

  const categories = Object.keys(CATEGORY_LABELS).filter((key) => Array.isArray(data[key]) && data[key].length);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-2xl font-semibold mb-6">Skills</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="glass rounded-2xl p-5"
          >
            <h2 className="font-display text-sm font-semibold text-accent-2 uppercase tracking-wide mb-3">
              {CATEGORY_LABELS[key]}
            </h2>
            <div className="flex flex-wrap gap-2">
              {data[key].map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/[0.05] border border-line text-ink-hi hover:border-accent-1/40 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {data.dsa_evidence && (
        <div className="glass rounded-2xl p-5 mt-4 flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">🧩</span>
          <div>
            <p className="text-sm font-medium text-ink-hi">Data Structures & Algorithms</p>
            <p className="text-xs text-ink-lo">{data.dsa_evidence}</p>
          </div>
        </div>
      )}
    </div>
  );
}
