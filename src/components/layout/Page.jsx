import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion.js';
import { useSectionReveal } from '../../lib/useSectionReveal.js';

const SITE = "Let's Work Multan";

/**
 * Wraps every route: sets the title/description and plays the ink curtain transition.
 * @param {{ title?: string, description?: string, children: React.ReactNode }} props
 */
export function Page({ title, description, children }) {
  const mainRef = useRef(null);
  useSectionReveal(mainRef);
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : "Let's Work — Coworking Space in Multan";
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);

  return (
    <>
      {/* lifts away on enter */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.8, ease: EASE_IN_OUT, delay: 0.1 } }}
        exit={{ scaleY: 0 }}
      >
        <span className="absolute inset-x-0 bottom-0 h-1 bg-sun" />
      </motion.div>
      {/* rises up on exit */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-ink"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.55, ease: EASE_IN_OUT } }}
      />
      <motion.main
        ref={mainRef}
        id="main"
        className="relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT, delay: 0.3 } }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.55 }}
      >
        {children}
      </motion.main>
    </>
  );
}
