import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IMG, waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { EASE_OUT } from '../../lib/motion.js';

const OPTIONS = [
  {
    unit: 'Hour',
    scene: 'A two-hour sprint between meetings.',
    detail: 'Walk in, sit down, plug in. Fully furnished desk and fast internet, no paperwork.',
    img: IMG.hotDesks,
    cta: 'Book by the hour',
  },
  {
    unit: 'Day',
    scene: 'A full day to host a client visit.',
    detail: 'A professional workspace for the day — with a meeting room a few steps away.',
    img: IMG.boardroomSide,
    cta: 'Book for a day',
  },
  {
    unit: 'Week',
    scene: 'A week-long project with your team.',
    detail: 'A ready office for as long as the job takes. Pay for the week, walk away after.',
    img: IMG.teamRoom,
    cta: 'Book for a week',
  },
];

/** Hour / Day / Week segmented control that swaps the scenario, photo and booking message. */
export function DurationSwitcher() {
  const [active, setActive] = useState(OPTIONS[1]);

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="glass flex flex-col rounded-[30px] p-6 md:p-8 lg:col-span-5">
        <div role="tablist" aria-label="How long do you need it?" className="relative grid grid-cols-3 rounded-full bg-ink/6 p-1">
          {OPTIONS.map((o) => {
            const isOn = o.unit === active.unit;
            return (
              <button
                key={o.unit}
                type="button"
                role="tab"
                aria-selected={isOn}
                onClick={() => setActive(o)}
                className="relative z-10 cursor-pointer rounded-full py-3 text-sm font-semibold"
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
          <Button href={waLink(`Hi Let's Work! I need an instant office for a ${active.unit.toLowerCase()}. Is one available?`)}>{active.cta}</Button>
        </div>
      </div>

      <div className="relative min-h-[320px] overflow-hidden rounded-[30px] lg:col-span-7">
        <AnimatePresence initial={false}>
          <motion.img
            key={active.unit}
            src={active.img}
            alt={`Booking by the ${active.unit.toLowerCase()} at Let's Work`} title={`Booking by the ${active.unit.toLowerCase()} at Let's Work`}
            className="absolute inset-0 size-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          />
        </AnimatePresence>
        <span className="glass-dark absolute left-4 top-4 rounded-full px-4 py-2 text-sm text-cream">
          1 {active.unit.toLowerCase()} · no lease
        </span>
      </div>
    </div>
  );
}
