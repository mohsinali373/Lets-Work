import { motion } from 'motion/react';
import { EASE_OUT } from '../../lib/motion.js';

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * @param {{ as?: string, delay?: number, y?: number, x?: number, className?: string, children: React.ReactNode }} props
 */
export function Reveal({ as = 'div', delay = 0, y = 28, x = 0, className, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
