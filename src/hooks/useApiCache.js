import { useCallback, useRef, useState } from "react";

/**
 * useApiCache
 *
 * Wraps a fetch function so that:
 *   - it only fires the FIRST time a section is opened (module-level cache
 *     survives across component remounts within the same page session)
 *   - repeat visits to the same section reuse the cached response instead
 *     of calling the backend again
 *   - errors are captured so the UI can show a friendly message instead of
 *     a blank screen
 *
 * This directly implements the "load static sections only once" /
 * "never repeatedly request the same data" requirement.
 */
const globalCache = new Map();

export function useApiCache(key, fetchFn) {
  const [data, setData] = useState(globalCache.get(key)?.data ?? null);
  const [loading, setLoading] = useState(!globalCache.has(key));
  const [error, setError] = useState(null);
  const hasFetched = useRef(globalCache.has(key));

  const load = useCallback(async () => {
    if (hasFetched.current) return; // already cached - never re-fetch
    hasFetched.current = true;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      globalCache.set(key, { data: result });
      setData(result);
    } catch (err) {
      hasFetched.current = false; // allow a manual retry on failure
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [key, fetchFn]);

  return { data, loading, error, load };
}
