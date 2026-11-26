import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Reveal } from '../ui/Reveal.jsx';
import { ScrollTilt } from '../ui/ScrollTilt.jsx';

/**
 * Numbered steps joined by a line that draws itself as you scroll.
 * @param {{ steps: {title: string, text: string}[], dark?: boolean }} props
 */
export function Steps({ steps, dark = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 60%'] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const muted = dark ? 'text-cream/60' : 'text-graphite';

  return (
    <div ref={ref} className="relative">
      <div className={`absolute left-0 right-0 top-6 hidden h-px md:block ${dark ? 'bg-white/15' : 'bg-ink/12'}`}>
        <motion.div style={{ scaleX }} className="h-full origin-left bg-sun" />
      </div>
      <ScrollTilt from={18}>
      <ol className="relative grid gap-8 md:grid-cols-3 md:gap-10">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.12}>
            <span className={`grid size-12 place-items-center rounded-full font-mono text-sm font-medium ${dark ? 'bg-sun text-ink' : 'bg-ink text-sun'}`}>
              0{i + 1}
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
            <p className={`mt-2 max-w-xs ${muted}`}>{s.text}</p>
          </Reveal>
        ))}
      </ol>
      </ScrollTilt>
    </div>
  );
}
