import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { waLink } from '../../data/site.js';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { Reveal } from '../ui/Reveal.jsx';

const PASSES = [
  {
    name: 'Hour pass',
    unit: '1 HR+',
    fits: 'A focused sprint or a single client meeting.',
    perks: ['Hot desk or meeting room', 'High-speed Wi-Fi', 'Chai on call'],
  },
  {
    name: 'Day pass',
    unit: '1 DAY',
    fits: 'A full workday — the easiest way to try us.',
    perks: ['Any open desk, all day', 'Refreshments & printing', 'Free parking'],
    featured: true,
  },
  {
    name: 'Week pass',
    unit: '7 DAYS',
    fits: 'A project, a visit to Multan, or a proper trial run.',
    perks: ['A desk for the whole week', 'Private locker', 'Meeting room access'],
  },
  {
    name: 'Long stay',
    unit: 'YOURS',
    fits: 'Your own dedicated desk or a lockable private office.',
    perks: ['Same spot every day', 'Team-ready offices', 'Flexible terms, no lease'],
  },
];

/** True on large screens, where the cards fan out from a stack. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isDesktop;
}

function Ticket({ pass, index, progress, fan }) {
  const offset = 1.5 - index; // distance from the centre of the row, in card widths
  const x = useTransform(progress, [0, 1], [`${offset * 104}%`, '0%']);
  const rotate = useTransform(progress, [0, 1], [-offset * 7, 0]);
  const y = useTransform(progress, [0, 1], [Math.abs(offset) * 18 + 30, 0]);
  const dark = !pass.featured;

  return (
    <motion.li
      style={fan ? { x, rotate, y, zIndex: pass.featured ? 5 : 4 - Math.abs(Math.round(offset)) } : undefined}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`relative flex flex-col rounded-[26px] ${dark ? 'bg-ink-soft text-cream ring-1 ring-white/10' : 'bg-sun text-ink'}`}
    >
      {/* top stub */}
      <div className="p-6 pb-5">
        <div className="flex items-center justify-between">
          <span className={`label ${dark ? 'text-cream/45' : 'text-ink/60'}`}>Let's Work · Pass</span>
          {pass.featured && <span className="rounded-full bg-ink px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-sun">Try us first</span>}
        </div>
        <p className="mt-6 font-mono text-4xl font-medium tracking-tight">{pass.unit}</p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight">{pass.name}</h3>
        <p className={`mt-2 text-sm ${dark ? 'text-cream/60' : 'text-ink/70'}`}>{pass.fits}</p>
      </div>

      {/* perforation */}
      <div className="relative h-0">
        <span className="absolute -left-3 -top-3 size-6 rounded-full bg-ink" aria-hidden="true" />
        <span className="absolute -right-3 -top-3 size-6 rounded-full bg-ink" aria-hidden="true" />
        <span className={`absolute inset-x-5 top-0 border-t-2 border-dashed ${dark ? 'border-white/15' : 'border-ink/25'}`} aria-hidden="true" />
      </div>

      {/* bottom: what's included */}
      <div className="flex flex-1 flex-col p-6 pt-5">
        <ul className="space-y-2.5 text-sm">
          {pass.perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2.5">
              <span className={`grid size-5 shrink-0 place-items-center rounded-full ${dark ? 'bg-sun text-ink' : 'bg-ink text-sun'}`}>
                <Check size={12} strokeWidth={3} aria-hidden="true" />
              </span>
              {perk}
            </li>
          ))}
        </ul>
        <a
          href={waLink(`Hi Let's Work! What's today's price for a ${pass.name.toLowerCase()}?`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`group mt-6 flex items-center justify-between rounded-full py-2.5 pl-5 pr-2.5 text-sm font-semibold transition-colors ${
            dark ? 'bg-white/8 hover:bg-white/15' : 'bg-ink text-cream hover:bg-ink-soft'
          }`}
        >
          Get today's price
          <span className="grid size-8 place-items-center rounded-full bg-sun text-ink transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </a>
      </div>
    </motion.li>
  );
}

/** Four passes that deal out from a stack as the section scrolls in. */
export function PassTickets() {
  const ref = useRef(null);
  const fan = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 15%'] });

  return (
    <section className="bg-ink text-cream" aria-labelledby="passes-title">
      <div className="wrap sec">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow num="03" className="text-sun">
              Passes
            </Eyebrow>
            <SplitWords id="passes-title" text="Pick a pass. *Pay only for the time you use.*" className="t-h2 mt-4 [&_.accent]:text-sun" />
          </div>
          <Reveal as="p" className="text-cream/60 md:col-span-4 md:col-start-9" delay={0.1}>
            No lease, no deposit drama. Message us and we'll tell you today's rate — and when you can start.
          </Reveal>
        </div>

        <ul ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PASSES.map((pass, i) => (
            <Ticket key={pass.name} pass={pass} index={i} progress={scrollYProgress} fan={fan} />
          ))}
        </ul>
      </div>
    </section>
  );
}
