import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../data/services.js';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Intro } from '../ui/PageIntro.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { EASE_OUT } from '../../lib/motion.js';
import { sized } from '../../data/imageSizes.js';

/** Grid placement per card: the first space is the large feature tile, the other four sit around it. */
const TILE = [
  'col-span-2 h-64 sm:h-80 lg:col-span-6 lg:row-span-2 lg:h-auto',
  'h-44 sm:h-56 lg:col-span-3 lg:h-auto',
  'h-44 sm:h-56 lg:col-span-3 lg:h-auto',
  'h-44 sm:h-56 lg:col-span-3 lg:h-auto',
  'h-44 sm:h-56 lg:col-span-3 lg:h-auto',
];

/**
 * Spaces: a bento of all five spaces. Every tile always shows its photo, name and tag,
 * so nothing is hidden behind a hover; the first one is the large feature tile.
 */
export function SpacesBanner() {
  return (
    <section className="wrap pb-16 pt-32 md:pb-20 md:pt-36">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Intro delay={0.3}>
            <Eyebrow>All spaces</Eyebrow>
          </Intro>
          <SplitWords as="h1" onMount delay={0.45} text="Five rooms. *One* address." className="t-display mt-5" />
        </div>
        <Intro as="p" delay={0.8} className="t-lead lg:col-span-4 lg:col-start-9">
          The same fast internet, free parking and people everywhere. What changes is how much room — and privacy — you get.
        </Intro>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-3 lg:h-[min(64vh,600px)] lg:min-h-[480px] lg:grid-cols-12 lg:grid-rows-2">
        {SERVICES.map((s, i) => {
          const isFeature = i === 0;
          return (
            <motion.li
              key={s.id}
              className={`relative overflow-hidden rounded-[26px] ${TILE[i]}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.5 + i * 0.08 }}
            >
              <Link to={s.path} className="group absolute inset-0 flex flex-col justify-between p-4 text-cream sm:p-5">
                <img
                  {...sized(s.image)}
                  alt={`${s.name} at Let's Work Multan`}
                  title={`${s.name} at Let's Work Multan`}
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" aria-hidden="true" />

                <span className="relative flex items-start justify-between gap-2">
                  {/* the tag would wrap in the narrow phone tiles, so small tiles show it from tablet width up */}
                  <span
                    className={`glass-dark whitespace-nowrap rounded-full px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-cream/85 ${isFeature ? '' : 'invisible sm:visible'}`}
                  >
                    {s.tag}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sun text-on-sun transition-transform duration-500 group-hover:rotate-45 sm:size-10">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </span>

                <span className="relative block">
                  <span className="label block text-sun">{s.num}</span>
                  <span className={`mt-1 block font-semibold leading-tight tracking-tight ${isFeature ? 't-h2' : 'text-lg sm:text-xl'}`}>
                    {s.name}
                  </span>
                  <span className={`mt-1.5 max-w-sm text-sm text-cream/75 ${isFeature ? 'block' : 'hidden sm:block'}`}>{s.oneLiner}</span>
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
