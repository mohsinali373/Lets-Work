import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { IMG } from '../../data/site.js';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { EASE_OUT } from '../../lib/motion.js';

const FRAMES = [
  { time: '08:45', title: 'Park free. Walk in.', text: 'Free parking right outside on Shuhada Road. No circling Nandla Chowk for a spot.', img: IMG.building },
  { time: '09:30', title: 'Desk, Wi-Fi, done.', text: 'High-speed internet, an ergonomic chair and a locker for the things you leave behind.', img: IMG.hotDesks },
  { time: '12:15', title: 'Chai on call.', text: 'The office boy keeps the tea coming, so you never lose your train of thought.', img: IMG.lounge },
  { time: '15:00', title: 'Close the client.', text: 'Book the boardroom for an hour and pitch in a room that looks the part.', img: IMG.boardroom },
  { time: '18:30', title: 'Meet the neighbours.', text: 'Freelancers, founders and remote teams — the people you will want to know.', img: IMG.floorPeople },
];

/** Each photo wipes up over the last one, scrubbed by the scroll. */
function Frame({ frame, index, progress }) {
  const step = 1 / FRAMES.length;
  const start = index * step - step * 0.35;
  const end = index * step + step * 0.15;
  const reveal = useTransform(progress, [start, end], [100, 0], { clamp: true });
  const clipPath = useTransform(reveal, (r) => `inset(${index === 0 ? 0 : r}% 0 0 0 round 30px)`);
  const scale = useTransform(progress, [start, end + step], [1.18, 1], { clamp: true });
  return (
    <motion.figure className="absolute inset-0 overflow-hidden rounded-[30px]" style={{ clipPath, zIndex: index }}>
      <motion.img src={frame.img} alt={frame.title} loading="lazy" style={{ scale }} className="size-full object-cover" />
    </motion.figure>
  );
}

/** Pinned scroll story: five moments of a workday, frame by frame. */
export function DayTimeline() {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIndex(Math.min(FRAMES.length - 1, Math.max(0, Math.floor(v * FRAMES.length + 0.2))));
  });

  const frame = FRAMES[index];

  return (
    <section ref={ref} className="relative bg-ink text-cream" style={{ height: `${FRAMES.length * 70 + 30}vh` }} aria-labelledby="day-title">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="wrap grid w-full items-center gap-6 pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-0">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Eyebrow num="03" className="text-sun">
              <span id="day-title">A day at Let's Work</span>
            </Eyebrow>
            <div className="relative mt-4 h-[1em] overflow-hidden font-mono text-[clamp(3rem,7vw,6rem)] font-medium leading-none tracking-tighter">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={frame.time}
                  className="absolute inset-0"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                >
                  {frame.time}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="relative mt-5 min-h-[8rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={frame.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <h3 className="t-h3">{frame.title}</h3>
                  <p className="mt-3 max-w-md text-cream/65">{frame.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <ol className="mt-6 flex gap-2" aria-label="Progress through the day">
              {FRAMES.map((f, i) => (
                <li key={f.time} className="h-1 flex-1 overflow-hidden rounded-full bg-white/12">
                  <span className={`block h-full origin-left rounded-full bg-sun transition-transform duration-500 ${i <= index ? 'scale-x-100' : 'scale-x-0'}`} />
                </li>
              ))}
            </ol>
          </div>

          <div className="relative order-1 h-[40vh] w-full lg:order-2 lg:col-span-7 lg:h-[74vh]">
            {FRAMES.map((f, i) => (
              <Frame key={f.time} frame={f} index={i} progress={scrollYProgress} />
            ))}
            <span className="glass-dark absolute bottom-4 left-4 z-10 rounded-full px-4 py-2">
              <span className="label text-cream/80">Real photo · {String(index + 1).padStart(2, '0')} / 0{FRAMES.length}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
