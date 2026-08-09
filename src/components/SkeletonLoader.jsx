import React from "react";

export function SkeletonBlock({ className = "" }) {
  return <div className={`animate-pulse bg-white/[0.06] rounded-xl ${className}`} />;
}

export default function SkeletonLoader({ rows = 3 }) {
  return (
    <div className="space-y-4 max-w-2xl mx-auto w-full px-4 py-8">
      <SkeletonBlock className="h-8 w-1/2" />
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonBlock key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}
