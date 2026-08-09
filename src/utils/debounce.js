/**
 * Basic debounce - used to avoid firing work (e.g. resize-driven layout
 * recalculations) on every single event when only the final value matters.
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
