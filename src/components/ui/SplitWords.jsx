import { Fragment } from 'react';
import { motion } from 'motion/react';
import { EASE_OUT } from '../../lib/motion.js';

/**
 * Turns "Dynamic spaces for *dynamic* people" into words; *starred* words get the serif italic accent.
 * @param {string} text
 */
function toWords(text) {
  return text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .flatMap((part) => {
      const accent = part.startsWith('*') && part.endsWith('*');
      const clean = accent ? part.slice(1, -1) : part;
      return clean
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => ({ word, accent }));
    });
}

const wordVariants = {
  hidden: { y: '108%' },
  show: ({ delay, i }) => ({ y: '0%', transition: { duration: 0.95, ease: EASE_OUT, delay: delay + i * 0.05 } }),
};

/**
 * Headline whose words slide up from behind a mask.
 * The heading itself is the in-view trigger (the masked words are clipped, so they can't be observed).
 * @param {{ text: string, as?: string, id?: string, className?: string, delay?: number, onMount?: boolean }} props
 */
export function SplitWords({ text, as = 'h2', id, className = '', delay = 0, onMount = false }) {
  const Tag = motion[as];
  const words = toWords(text);
  const plain = words.map((w) => w.word).join(' ');
  const trigger = onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.3 } };

  return (
    <Tag id={id} className={className} aria-label={plain} initial="hidden" {...trigger}>
      {words.map(({ word, accent }, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* padding + matching negative margin gives italics and descenders room inside the mask */}
          <span aria-hidden="true" className="-mx-[0.08em] -my-[0.12em] inline-block overflow-hidden px-[0.08em] py-[0.12em] align-bottom">
            <motion.span className={`inline-block ${accent ? 'accent' : ''}`} variants={wordVariants} custom={{ delay, i }}>
              {word}
            </motion.span>
          </span>{' '}
        </Fragment>
      ))}
    </Tag>
  );
}
