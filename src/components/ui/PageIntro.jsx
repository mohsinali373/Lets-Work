import { motion } from 'motion/react';
import { EASE_OUT } from '../../lib/motion.js';

/**
 * Fade-up wrapper for hero copy that should play on page load (not on scroll).
 * @param {{ delay?: number, className?: string, children: React.ReactNode, as?: string }} props
 */
export function Intro({ delay = 0, className = '', as = 'div', children }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </Comp>
  );
}
