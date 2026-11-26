import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { EASE_OUT } from '../../lib/motion.js';

/**
 * Counts up from zero the first time the number scrolls into view.
 * @param {{ to: number, suffix?: string, prefix?: string, className?: string }} props
 */
export function Counter({ to, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE_OUT,
      onUpdate: (n) => setValue(Math.round(n)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
