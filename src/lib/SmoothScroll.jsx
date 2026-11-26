import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

/** @returns {Lenis | null} */
export function useLenis() {
  return useContext(LenisContext);
}

/** Lenis smooth scrolling. Skipped entirely when the visitor prefers reduced motion. */
export function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const instance = new Lenis({
      autoRaf: true,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    setLenis(instance);
    return () => instance.destroy();
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
