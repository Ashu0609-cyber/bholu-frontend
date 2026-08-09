import React from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="max-w-md mx-auto glass rounded-2xl p-6 text-center mt-8">
      <FiAlertCircle className="mx-auto text-amber mb-3" size={28} />
      <p className="text-ink-hi font-medium mb-1">
        {message || "Bholu is taking a short break. Please try again in a moment."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 inline-flex items-center gap-2 text-sm text-accent-2 hover:text-accent-1 transition-colors focus-ring rounded-lg px-3 py-1.5"
        >
          <FiRefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}
