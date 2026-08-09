/**
 * Bholu design tokens.
 *
 * Palette:
 *   bg-base      #0A0B10  near-black navy backdrop
 *   bg-surface   #12141C  glass panel base (used with opacity + blur)
 *   accent-1     #7C5CFC  electric violet (primary signature gradient stop)
 *   accent-2     #34E4C0  mint-teal (secondary gradient stop)
 *   amber        #F5A623  reserved ONLY for the recruiter card - a deliberate,
 *                         rare warm accent so it reads as a distinct moment.
 *   text-hi      #E8E9EE  primary text
 *   text-lo      #8B8FA3  muted/secondary text
 *   line         #22242F  hairline borders on dark glass
 */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: "#0A0B10",
        surface: "#12141C",
        "surface-hi": "#181B26",
        accent: {
          1: "#7C5CFC",
          2: "#34E4C0",
        },
        amber: "#F5A623",
        ink: {
          hi: "#E8E9EE",
          lo: "#8B8FA3",
        },
        line: "#22242F",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "bholu-gradient": "linear-gradient(135deg, #7C5CFC 0%, #34E4C0 100%)",
        "bholu-radial": "radial-gradient(circle at 50% 0%, rgba(124,92,252,0.18), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 24px rgba(124,92,252,0.35)",
        "glow-sm": "0 0 12px rgba(124,92,252,0.25)",
        "glow-teal": "0 0 24px rgba(52,228,192,0.3)",
      },
      animation: {
        "pulse-slow": "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "orb-spin": "spin 6s linear infinite",
      },
    },
  },
  plugins: [],
};
