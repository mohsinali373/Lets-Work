import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { IMG } from '../../data/site.js';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';

const SHOTS = [
  { src: IMG.boardroom, note: 'Boardroom, 9 a.m. standup', tilt: -4 },
  { src: IMG.hotDesks, note: 'Hot desks — window side', tilt: 3 },
  { src: IMG.lounge, note: 'The blue sofas (best seats)', tilt: -2 },
  { src: IMG.privateOffice, note: 'Private office, door shut', tilt: 5 },
  { src: IMG.floorCircles, note: 'Long tables, lots of light', tilt: 4 },
  { src: IMG.teamRoom, note: 'Team room, booked till 4', tilt: -5 },
  { src: IMG.reception, note: 'Reception — say hi', tilt: 2 },
  { src: IMG.building, note: 'Find us on Shuhada Road', tilt: -3 },
];

/** One polaroid: drifts at its own speed and straightens as it scrolls through. */
function Polaroid({ shot, index, progress, reduce }) {
  const speed = [60, -40, 90, -20][index % 4];
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  const rotate = useTransform(progress, [0, 0.5, 1], [shot.tilt * 2.2, shot.tilt, shot.tilt * 0.6]);
  return (
    <motion.figure
      style={reduce ? { rotate: shot.tilt } : { y, rotate }}
      whileHover={{ rotate: 0, scale: 1.05, zIndex: 20, transition: { duration: 0.35 } }}
      className="group relative bg-[#fbfaf6] p-2.5 pb-12 shadow-[0_18px_40px_-18px_rgba(17,17,17,0.45)] sm:p-3 sm:pb-14"
    >
      <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-3deg] bg-sun/70 mix-blend-multiply" />
      <div className="aspect-[4/5] overflow-hidden bg-cream-deep">
        <img src={shot.src} alt={shot.note} title={shot.note} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <figcaption className="accent absolute inset-x-3 bottom-3 text-center text-lg text-ink/80 sm:bottom-4">{shot.note}</figcaption>
    </motion.figure>
  );
}

/** A wall of real photos pinned like polaroids. */
export function PolaroidWall() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream-deep" aria-labelledby="wall-title">
      <div className="wrap sec">
        <div className="grid gap-4 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow num="05">Straight off our phones</Eyebrow>
            <SplitWords id="wall-title" text="Real photos. *No filters, no stock.*" className="t-h2 mt-3" />
          </div>
          <p className="text-graphite md:col-span-4 md:col-start-9">
            Every picture on this wall was taken inside Let's Work. What you see is exactly what you'll walk into.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-x-8 md:gap-y-14">
          {SHOTS.map((shot, i) => (
            <Polaroid key={shot.note} shot={shot} index={i} progress={scrollYProgress} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}
