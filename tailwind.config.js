/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Deep magical foundation
        midnight: "#060911", // deepest void
        stone: "#0B0F19",    // primary background
        chamber: "#121826",  // primary card surface
        "chamber-hi": "#192235", // hover / elevated border
        
        // Antique gold
        gold: {
          DEFAULT: "#C5A059",
          light: "#E5C158",
          bright: "#F3E5AB",
          dark: "#8C6D2B",
          glow: "rgba(197, 160, 89, 0.25)",
        },

        // Warm parchment typography & accents
        parchment: {
          DEFAULT: "#F4EEDD",
          muted: "#C8BEAA",
          faint: "#8A8275",
          dark: "#2A241C",
        },

        // Atmospheric house accents
        burgundy: {
          DEFAULT: "#4A1521",
          deep: "#2E0D14",
        },
        emerald: {
          DEFAULT: "#1B4332",
          accent: "#2D6A4F",
          glow: "#52B788",
        },
        silver: {
          DEFAULT: "#B8C5D0",
          light: "#E2E8F0",
        },

        // Subtle borders
        line: {
          DEFAULT: "rgba(197, 160, 89, 0.15)",
          bright: "rgba(197, 160, 89, 0.35)",
          stone: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        cinzel: ["'Cinzel'", "serif"],
        body: ["'Plus Jakarta Sans'", "'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F3E5AB 0%, #C5A059 50%, #8C6D2B 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(243,229,171,0.2), transparent)",
        "chamber-radial": "radial-gradient(circle at 50% 0%, rgba(197,160,89,0.12), transparent 70%)",
        "candle-glow": "radial-gradient(circle at 50% 30%, rgba(229,193,88,0.15), rgba(74,21,33,0.08) 50%, transparent 80%)",
        "parchment-vignette": "radial-gradient(ellipse at center, transparent 40%, rgba(6,9,17,0.85) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(197, 160, 89, 0.25)",
        "gold-glow-sm": "0 0 12px rgba(197, 160, 89, 0.2)",
        "emerald-glow-sm": "0 0 14px rgba(45, 106, 79, 0.35)",
        "chamber-depth": "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        "magical-card": "0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(197, 160, 89, 0.18)",
      },
      animation: {
        "candle-flicker": "flicker 4s ease-in-out infinite",
        "float-gentle": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: 0.9, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.03)" },
          "70%": { opacity: 0.85, transform: "scale(0.98)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
