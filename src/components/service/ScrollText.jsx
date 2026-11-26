import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

function Word({ children, progress, range, highlight }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${highlight ? 'accent text-sun-deep' : ''}`}>
      {children}
    </motion.span>
  );
}

/**
 * Paragraph whose words light up one by one as it scrolls through the viewport.
 * Wrap words to emphasise in *asterisks*.
 * @param {{ text: string, className?: string }} props
 */
export function ScrollText({ text, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 45%'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const highlight = w.startsWith('*');
        return (
          <Word key={`${w}-${i}`} progress={scrollYProgress} range={[start, start + 1 / words.length]} highlight={highlight}>
            {w.replace(/\*/g, '')}
          </Word>
        );
      })}
    </p>
  );
}
