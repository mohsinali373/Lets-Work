import { motion } from 'motion/react';
import { IMG, waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Intro } from '../ui/PageIntro.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { EASE_OUT } from '../../lib/motion.js';

/** Today's date on a desk-calendar card — the point of an instant office is "today". */
function TodayCard() {
  const now = new Date();
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <motion.div
      className="absolute -left-4 -top-6 w-36 overflow-hidden rounded-2xl bg-paper text-center text-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] ring-1 ring-ink/10 sm:-left-8 sm:w-40"
      style={{ transformPerspective: 600, transformOrigin: 'top center' }}
      initial={{ rotateX: -95, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE_OUT, delay: 1 }}
    >
      <p className="label bg-sun py-1.5 text-on-sun">{month}</p>
      <p className="pt-2 text-5xl font-semibold leading-none tracking-tight">{now.getDate()}</p>
      <p className="mt-1 text-xs text-graphite">{weekday}</p>
      <p className="mx-3 mb-3 mt-3 rounded-full bg-ink py-1 text-xs font-semibold text-cream">Move in today</p>
    </motion.div>
  );
}

/** Instant office: copy on the left, the team room on the right with today's date pinned to it. */
export function InstantOfficeBanner({ message }) {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="wrap grid items-center gap-16 pb-16 pt-32 md:pb-24 md:pt-36 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Intro delay={0.3}>
            <Eyebrow num="05" dot>
              Available on short notice
            </Eyebrow>
          </Intro>
          <SplitWords as="h1" onMount delay={0.45} text="Need an office *by this afternoon?*" className="t-display mt-6" />
          <Intro as="p" delay={0.8} className="t-lead mt-6 max-w-md">
            A furnished, ready-to-use office — no lease, no paperwork. Message us in the morning, work from it after lunch.
          </Intro>
          <Intro delay={0.95} className="mt-8">
            <Button href={waLink(message)}>Check today's availability</Button>
          </Intro>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:col-span-6">
          <motion.div
            className="relative aspect-[5/4] overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.4 }}
          >
            <img src={IMG.teamRoom} alt="A furnished team room at Let's Work" title="A furnished team room at Let's Work" fetchPriority="high" className="size-full object-cover" />
            <p className="glass absolute bottom-4 right-4 rounded-full px-4 py-2 text-sm font-medium">No lease · No paperwork</p>
          </motion.div>
          <TodayCard />
        </div>
      </div>
    </section>
  );
}
