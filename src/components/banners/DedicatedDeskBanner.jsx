import { motion } from 'motion/react';
import { Armchair, Lock, MapPin } from 'lucide-react';
import { IMG, waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Intro } from '../ui/PageIntro.jsx';
import { EASE_OUT } from '../../lib/motion.js';
import { sized } from '../../data/imageSizes.js';

/** What comes with a dedicated desk — shown as callouts pointing at the photo. */
const CALLOUTS = [
  { icon: Lock, text: 'Private locker', top: '14%' },
  { icon: Armchair, text: 'Your chair, your way', top: '40%' },
  { icon: MapPin, text: 'Same spot every day', top: '66%' },
];

/** Dedicated desk: copy on the left; a tall desk photo on the right with a "reserved" tag swinging into place. */
export function DedicatedDeskBanner({ message }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-10 size-[36rem] rounded-full bg-sun/20 blur-[140px]" aria-hidden="true" />

      <div className="wrap relative grid items-center gap-14 pb-16 pt-32 md:pb-24 md:pt-36 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Intro delay={0.3}>
            <Eyebrow num="02">Dedicated desk</Eyebrow>
          </Intro>
          <h1 className="t-display mt-6" aria-label="Your desk. Every day.">
            <Intro as="span" delay={0.45} className="block">
              Your desk.
            </Intro>
            <Intro as="span" delay={0.6} className="accent block text-sun-deep">
              Every day.
            </Intro>
          </h1>
          <Intro as="p" delay={0.85} className="t-lead mt-6 max-w-md">
            The same desk every morning, your things where you left them, and a spot people know to find you.
          </Intro>
          <Intro delay={1} className="mt-8">
            <Button href={waLink(message)}>Reserve a desk</Button>
          </Intro>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:col-start-8">
          {/* callouts reaching from the photo into the space beside it (large screens only) */}
          <ul className="pointer-events-none absolute inset-y-0 right-full hidden w-60 lg:block" aria-label="What comes with your desk">
            {CALLOUTS.map(({ icon: Icon, text, top }, i) => (
              <motion.li
                key={text}
                className="absolute right-0 flex items-center"
                style={{ top }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.2 + i * 0.15 }}
              >
                <span className="flex items-center gap-2.5 whitespace-nowrap rounded-full bg-paper px-4 py-2.5 text-sm font-medium shadow-[0_14px_30px_-16px_rgba(0,0,0,0.45)] ring-1 ring-ink/10">
                  <span className="grid size-7 place-items-center rounded-full bg-sun text-on-sun">
                    <Icon size={14} aria-hidden="true" />
                  </span>
                  {text}
                </span>
                <span className="h-px w-10 bg-ink/25" aria-hidden="true" />
                <span className="-mr-1.5 size-3 rounded-full border-2 border-paper bg-sun-deep shadow" aria-hidden="true" />
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.4 }}
          >
            <img {...sized(IMG.desksTall2)} alt="A row of dedicated desks in front of the Let's Work logo wall" title="A row of dedicated desks in front of the Let's Work logo wall" fetchPriority="high" className="size-full object-cover" />
          </motion.div>

          {/* the reserved tag, hung from a pin */}
          <motion.div
            className="absolute -left-6 bottom-10 w-48 origin-top rounded-2xl bg-paper p-4 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] ring-1 ring-ink/10 sm:-left-10"
            initial={{ opacity: 0, rotate: -28, y: -20 }}
            animate={{ opacity: 1, rotate: -6, y: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 7, delay: 1.1 }}
          >
            <span className="absolute left-1/2 top-2.5 size-2.5 -translate-x-1/2 rounded-full bg-sun ring-2 ring-sun-deep/40" aria-hidden="true" />
            <p className="label mt-3 text-center text-graphite">Reserved</p>
            <p className="mt-1 text-center text-2xl font-semibold tracking-tight">For you</p>
            <p className="mt-2 border-t border-dashed border-ink/20 pt-2 text-center text-xs text-graphite">Same desk · every day</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
