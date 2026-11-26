import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/**
 * Scroll-linked 3D entrance: the block starts tipped back in perspective and
 * flattens into place as it scrolls up the screen (tied to scroll, not a one-shot).
 * @param {{ children: React.ReactNode, className?: string, from?: number }} props
 */
export function ScrollTilt({ children, className = '', from = 26 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 30%'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [from, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0.25, 1]);

  return (
    <div ref={ref} className={className} style={{ perspective: '1400px' }}>
      <motion.div style={reduce ? undefined : { rotateX, scale, y, opacity, transformOrigin: '50% 100%' }}>{children}</motion.div>
    </div>
  );
}
