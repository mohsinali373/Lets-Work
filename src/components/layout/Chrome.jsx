import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { TOUR_MSG, waLink } from '../../data/site.js';
import { WhatsAppIcon } from '../ui/Icons.jsx';
import { EASE_OUT } from '../../lib/motion.js';

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
