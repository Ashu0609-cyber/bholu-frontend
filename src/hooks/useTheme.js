import { useCallback, useEffect, useState } from "react";

const THEME_KEY = "bholu_theme";

/**
 * Bholu is designed dark-first (per the brief's "Perplexity / Claude /
 * Cursor" direction) - the toggle provides a lightweight inverted palette
 * via the `.light` class (see styles/index.css overrides) rather than a
 * fully independent second design system, keeping the bundle small.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
