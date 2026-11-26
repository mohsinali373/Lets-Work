import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { IMG } from '../../data/site.js';
import { EASE_OUT } from '../../lib/motion.js';

const CARDS = [
  { src: IMG.boardroom, label: 'Boardroom', tag: 'By the hour' },
  { src: IMG.hotDesks, label: 'Hot desks', tag: 'Walk in today' },
  { src: IMG.lounge, label: 'Lounge', tag: 'Chai on call' },
  { src: IMG.privateOffice, label: 'Private office', tag: 'Lockable' },
  { src: IMG.floorPeople, label: 'The floor', tag: 'Real members' },
];
const CYCLE_MS = 3400;
const TILT = { stiffness: 120, damping: 18, mass: 0.6 };

function DeckCard({ card, depth, spread }) {
  const z = useTransform(spread, (s) => -depth * 70 * s);
  const isFront = depth === 0;
  return (
    <motion.figure
      className="absolute inset-x-0 top-[4%] aspect-[4/5] overflow-hidden rounded-[30px] border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
      style={{ z, zIndex: 10 - depth }}
      animate={{
        y: depth * -22,
        x: depth * 18,
        rotateZ: isFront ? 0 : depth % 2 ? 3 : -3,
        opacity: depth > 3 ? 0 : 1 - depth * 0.12,
        scale: 1 - depth * 0.04,
      }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
    >
      <img src={card.src} alt={isFront ? `Let's Work ${card.label}` : ''} className="size-full object-cover" draggable="false" />
      {!isFront && <div className="absolute inset-0 bg-ink/25" />}
    </motion.figure>
  );
}

/**
 * A 3D stack of real photos: shuffles itself, tilts toward the pointer,
 * and fans apart in depth as the hero scrolls away.
 * @param {{ scrollTarget: React.RefObject<HTMLElement> }} props
 */
export function PhotoDeck3D({ scrollTarget }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [order, setOrder] = useState(() => CARDS.map((_, i) => i));
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-16, 16]), TILT);
  const rotXPointer = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), TILT);

  const { scrollYProgress } = useScroll({ target: scrollTarget, offset: ['start start', 'end start'] });
  const spread = useTransform(scrollYProgress, [0, 1], [1, 3.4]);
  const scrollRotX = useTransform(scrollYProgress, [0, 1], [6, 40]);
  const rotX = useTransform([rotXPointer, scrollRotX], ([a, b]) => a + b);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => setOrder((o) => [...o.slice(1), o[0]]), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  function handleMove(e) {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    px.set(0);
    py.set(0);
  }

  const front = CARDS[order[0]];

  return (
    <div ref={ref} onPointerMove={handleMove} onPointerLeave={reset} className="relative h-full w-full" style={{ perspective: '1600px' }}>
      <motion.div className="relative mx-auto h-full w-[82%] max-w-[500px]" style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}>
        {CARDS.map((card, cardIndex) => (
          <DeckCard key={card.label} card={card} depth={order.indexOf(cardIndex)} spread={spread} />
        ))}
      </motion.div>

      <motion.div
        key={front.label}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="glass-dark absolute bottom-[4%] left-0 z-20 rounded-2xl px-4 py-3 text-cream"
      >
        <p className="label text-sun">Real photo · {front.tag}</p>
        <p className="font-semibold">{front.label}</p>
      </motion.div>
    </div>
  );
}
