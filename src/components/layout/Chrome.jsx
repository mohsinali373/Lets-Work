import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { TOUR_MSG, waLink } from '../../data/site.js';
import { WhatsAppIcon } from '../ui/Icons.jsx';
import { EASE_OUT } from '../../lib/motion.js';
import { useLenis } from '../../lib/SmoothScroll.jsx';

const RING_R = 22;
const RING_C = 2 * Math.PI * RING_R;

/**
 * Bottom-left companion: a ring that fills as you scroll with the percentage inside,
 * turning into a "back to top" arrow near the end.
 */
export function ScrollRing() {
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const dashOffset = useTransform(progress, (p) => RING_C * (1 - p));
  const [pct, setPct] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (p) => setPct(Math.round(p * 100)));
  useMotionValueEvent(scrollY, 'change', (y) => setIsVisible(y > 300));
  const isEnd = pct >= 96;

  function toTop() {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label={`Scrolled ${pct}% — back to top`}
          className="group fixed bottom-5 left-5 z-40 grid size-14 cursor-pointer place-items-center rounded-full bg-ink text-cream shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] md:bottom-7 md:left-7"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <svg viewBox="0 0 56 56" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
            <circle cx="28" cy="28" r={RING_R} fill="none" stroke="rgba(243,238,227,0.14)" strokeWidth="3" />
            <motion.circle cx="28" cy="28" r={RING_R} fill="none" stroke="#f5b82e" strokeWidth="3" strokeLinecap="round" strokeDasharray={RING_C} style={{ strokeDashoffset: dashOffset }} />
          </svg>
          <AnimatePresence mode="wait" initial={false}>
            {isEnd ? (
              <motion.span key="up" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="relative text-sun">
                <ArrowUp size={20} aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span key="pct" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative font-mono text-xs font-medium transition-colors group-hover:text-sun">
                {pct}%
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Thin yellow reading-progress bar along the top edge. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-sun" style={{ scaleX }} />;
}

/** WhatsApp shortcut that appears once the visitor starts scrolling. */
export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setIsVisible(y > 500));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={waLink(TOUR_MSG)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Let's Work on WhatsApp"
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full bg-ink p-1.5 text-cream shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] md:bottom-7 md:right-7"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <span className="grid max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500 group-hover:max-w-[180px] group-hover:px-3">
            Ask us anything
          </span>
          <span className="relative grid size-12 place-items-center rounded-full bg-sun text-ink">
            <span className="ping-soft absolute inset-0 rounded-full bg-sun" />
            <WhatsAppIcon size={22} className="relative" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
