import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../data/services.js';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Intro } from '../ui/PageIntro.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { EASE_OUT } from '../../lib/motion.js';

/**
 * Spaces: five tall photo panels side by side. The one under the pointer widens and shows its name;
 * on phones they become a simple stack of rows.
 */
export function SpacesBanner() {
  const [active, setActive] = useState(0);

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
          The same fast internet, chai and people everywhere. What changes is how much room — and privacy — you get.
        </Intro>
      </div>

      <ul className="mt-12 flex flex-col gap-3 md:h-[60vh] md:min-h-[420px] md:flex-row" onMouseLeave={() => setActive(0)}>
        {SERVICES.map((s, i) => {
          const isActive = i === active;
          return (
            <motion.li
              key={s.id}
              onMouseEnter={() => setActive(i)}
              className={`relative overflow-hidden rounded-[26px] transition-[flex-grow] duration-700 ease-[var(--ease-expo)] md:min-w-0 ${isActive ? 'md:grow-[4]' : 'md:grow'}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.5 + i * 0.08 }}
            >
              <Link to={s.path} className="group flex h-28 items-end md:h-full" onFocus={() => setActive(i)}>
                <img src={s.image} alt={`${s.name} at Let's Work`} title={`${s.name} at Let's Work`} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" aria-hidden="true" />
                <span className="relative flex w-full items-end justify-between gap-3 p-5 text-cream">
                  <span className="min-w-0">
                    <span className="label block text-sun">{s.num}</span>
                    <span className={`block whitespace-nowrap text-xl font-semibold tracking-tight transition-opacity duration-500 md:text-2xl ${isActive ? 'md:opacity-100' : 'md:opacity-0'}`}>
                      {s.name}
                    </span>
                    <span className={`mt-1 hidden text-sm text-cream/70 transition-opacity duration-500 md:block ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                      {s.oneLiner}
                    </span>
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sun text-on-sun transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
