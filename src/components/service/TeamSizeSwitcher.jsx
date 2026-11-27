import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IMG, waLink } from '../../data/site.js';
import { SOLO_PLANS, TEAM_PLANS, formatPrice } from '../../data/plans.js';
import { Button } from '../ui/Button.jsx';
import { EASE_OUT } from '../../lib/motion.js';

const fromPrice = (plans) => formatPrice(Math.min(...plans.map((p) => p.price)));
const BIG_TEAM_PLANS = TEAM_PLANS.filter((p) => p.id !== 'startup');

/** Who needs the instant office. Prices come straight from data/plans.js. */
const OPTIONS = [
  {
    unit: 'Just me',
    scene: 'A desk ready the day you message.',
    detail: `Silver, Gold or Diamond desk plans from ${fromPrice(SOLO_PLANS)} a month — furnished, with fast internet.`,
    img: IMG.hotDesks,
    cta: 'Get a desk',
  },
  {
    unit: 'Small team',
    scene: 'A lockable office for 6–8 people.',
    detail: `The Startup Team office from ${fromPrice(TEAM_PLANS.filter((p) => p.id === 'startup'))} a month, with furniture, internet and tea service.`,
    img: IMG.teamRoom,
    cta: 'Get a team office',
  },
  {
    unit: 'Bigger team',
    scene: 'A premium office for a growing team.',
    detail: `Corporate and Executive offices from ${fromPrice(BIG_TEAM_PLANS)} a month, with priority guest handling.`,
    img: IMG.privateOffice,
    cta: 'Get a premium office',
  },
];

/** Just me / Small team / Bigger team control that swaps the scenario, photo, monthly price and booking message. */
export function TeamSizeSwitcher() {
  const [active, setActive] = useState(OPTIONS[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="glass flex flex-col rounded-[30px] p-6 md:p-8 lg:col-span-5">
        <div role="tablist" aria-label="Who is the office for?" className="relative grid grid-cols-3 rounded-full bg-ink/6 p-1">
          {OPTIONS.map((o) => {
            const isOn = o.unit === active.unit;
            return (
              <button
                key={o.unit}
                type="button"
                role="tab"
                aria-selected={isOn}
                onClick={() => setActive(o)}
                className="relative z-10 cursor-pointer rounded-full px-1 py-3 text-sm font-semibold"
              >
                {isOn && (
                  <motion.span layoutId="duration-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ duration: 0.5, ease: EASE_OUT }} />
                )}
                <span className={isOn ? 'text-sun' : 'text-ink/70'}>{o.unit}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 min-h-[160px]" role="tabpanel" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={active.unit} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: EASE_OUT }}>
              <p className="label text-graphite">Perfect for</p>
              <p className="mt-2 text-3xl font-semibold leading-tight tracking-tight">{active.scene}</p>
              <p className="mt-3 text-graphite">{active.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-auto pt-6">
          <Button href={waLink(`Hi Let's Work! I need an instant office (${active.unit.toLowerCase()}). What's available this month?`)}>{active.cta}</Button>
        </div>
      </div>

      <div className="relative min-h-[320px] overflow-hidden rounded-[30px] lg:col-span-7">
        <AnimatePresence initial={false}>
          <motion.img
            key={active.unit}
            src={active.img}
            alt={`Instant office for ${active.unit.toLowerCase()} at Let's Work Multan`} title={`Instant office for ${active.unit.toLowerCase()} at Let's Work Multan`}
            className="absolute inset-0 size-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          />
        </AnimatePresence>
        <span className="glass-dark absolute left-4 top-4 rounded-full px-4 py-2 text-sm text-cream">
          {active.unit} · monthly plan
        </span>
      </div>
    </div>
  );
}
