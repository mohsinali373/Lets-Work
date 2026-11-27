import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { IMG, waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Intro } from '../ui/PageIntro.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { EASE_OUT } from '../../lib/motion.js';
import { sized } from '../../data/imageSizes.js';

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const STEP_MS = 2400;
const label = (h) => `${h > 12 ? h - 12 : h}${h >= 12 ? 'pm' : 'am'}`;

/** A ruler of working hours across the photo; a booked slot steps along it. */
function HourRuler() {
  const reduce = useReducedMotion();
  const [slot, setSlot] = useState(1);
  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => setSlot((s) => (s + 1) % (HOURS.length - 1)), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce]);
  const width = 100 / (HOURS.length - 1);

  return (
    <div className="glass-dark absolute inset-x-4 bottom-4 rounded-2xl px-4 pb-3 pt-4 text-cream md:inset-x-6 md:bottom-6 md:px-6" aria-hidden="true">
      <div className="relative h-9">
        <motion.div
          className="absolute inset-y-0 flex items-center justify-center rounded-lg bg-sun text-xs font-semibold text-on-sun"
          style={{ width: `${width}%` }}
          animate={{ left: `${slot * width}%` }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          1 hr
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 flex justify-between">
          {HOURS.map((h) => (
            <span key={h} className="h-2 w-px bg-white/40" />
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[0.6rem] text-cream/60 md:text-[0.7rem]">
        {HOURS.map((h, i) => (
          <span key={h} className={i % 2 === 1 ? 'hidden sm:inline' : ''}>
            {label(h)}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Meeting room: the yellow page with the boardroom photo and a ruler showing a slot being booked. */
export function MeetingRoomBanner({ message }) {
  return (
    <section className="bg-sun pb-8 pt-32 text-on-sun md:pt-40">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Intro delay={0.3}>
            <Eyebrow num="04">Meeting room</Eyebrow>
          </Intro>
          <SplitWords as="h1" onMount delay={0.45} text="A premium meeting room, *ready when you are.*" className="t-display mt-6" />
        </div>
        <Intro delay={0.8} className="lg:col-span-4">
          <p className="text-lg opacity-80">Modern tech and comfortable seating — book a slot whenever your meeting needs one.</p>
          <div className="mt-6">
            <Button href={waLink(message)} variant="ink">
              Book the room
            </Button>
          </div>
        </Intro>
      </div>

      <div className="wrap mt-12">
        <motion.div
          className="relative h-[48vh] min-h-[320px] overflow-hidden rounded-[36px] md:h-[64vh]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.5 }}
        >
          <img {...sized(IMG.boardroomU)} alt="The Let's Work boardroom with a U-shaped table" title="The Let's Work boardroom with a U-shaped table" fetchPriority="high" className="size-full object-cover" />
          <HourRuler />
        </motion.div>
      </div>
    </section>
  );
}
