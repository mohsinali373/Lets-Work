import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../data/services.js';
import { Reveal } from '../ui/Reveal.jsx';

const FOLLOW = { stiffness: 160, damping: 22, mass: 0.5 };

/** Big editorial list of spaces; on desktop a photo follows the cursor. */
export function HoverList() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, FOLLOW);
  const sy = useSpring(y, FOLLOW);

  function handleMove(e) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <div ref={ref} onPointerMove={handleMove} onPointerLeave={() => setHovered(null)} className="relative">
      <ul className="border-b border-ink/12">
        {SERVICES.map((s, i) => (
          <Reveal as="li" key={s.id} delay={i * 0.05} className="border-t border-ink/12">
            <Link
              to={s.path}
              onMouseEnter={() => setHovered(s.id)}
              onFocus={() => setHovered(s.id)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:grid-cols-[4rem_1fr_14rem_auto] md:gap-6 md:py-8"
            >
              <span className="label text-graphite transition-colors group-hover:text-sun-deep">({s.num})</span>
              <span className="flex items-center gap-4">
                <img src={s.thumb} alt="" loading="lazy" className="size-14 shrink-0 rounded-xl object-cover lg:hidden" />
                <span className="text-[clamp(1.7rem,1.1rem+2.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.04em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3">
                  {s.name}
                </span>
              </span>
              <span className="hidden text-sm text-graphite md:block">{s.oneLiner}</span>
              <span className="grid size-12 place-items-center rounded-full border border-ink/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-sun group-hover:bg-sun">
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <motion.div aria-hidden="true" style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block">
        <motion.div
          animate={{ scale: hovered ? 1 : 0.4, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/3] w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px] shadow-2xl"
        >
          {SERVICES.map((s) => (
            <img
              key={s.id}
              src={s.thumb}
              alt=""
              className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${hovered === s.id ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
