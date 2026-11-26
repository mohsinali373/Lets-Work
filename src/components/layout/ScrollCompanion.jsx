import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Chai, Key, Lamp, Laptop, Mark, Pin, Plane, Shield, Stopwatch, Talk } from './companionArt.jsx';

const SIZE = 96; // px on desktop
const FOLLOW = 0.09; // how quickly it catches up (0..1 per frame)

/** Which object travels with you on each page. */
const ART_BY_PATH = {
  '/': Chai,
  '/spaces': Pin,
  '/coworking-space': Laptop,
  '/dedicated-desk-coworking-space': Lamp,
  '/private-office-space': Key,
  '/meeting-room': Talk,
  '/instant-office-space': Stopwatch,
  '/about-us': Mark,
  '/contact-us': Plane,
  '/privacy-policy': Shield,
};

/** Top-level sections of the current page. */
function pageSections() {
  const main = document.getElementById('main');
  if (!main) return [];
  return [...main.querySelectorAll('section')].filter((s) => !s.parentElement.closest('section'));
}

/** One stop beside every section, alternating sides. Returns [{ y (document px), x (viewport px) }]. */
function buildStops() {
  const vw = window.innerWidth;
  const content = Math.min(vw, 1320);
  const gutter = Math.max(SIZE * 0.4, (vw - content) / 2 - SIZE * 0.1);
  return pageSections().map((s, i) => {
    const top = s.getBoundingClientRect().top + window.scrollY;
    return { y: top + Math.min(s.offsetHeight, window.innerHeight) * 0.5, x: i % 2 === 0 ? vw - gutter : gutter };
  });
}

const smooth = (t) => t * t * (3 - 2 * t);

/**
 * A single object that travels the page with you — chai on Home, a laptop on Coworking, a key on
 * Private Office, and so on. It glides side to side as each section arrives, tilts as it swings,
 * bobs gently, and lives *behind* the content so it slips under dark sections and the video.
 */
export function ScrollCompanion() {
  const { pathname } = useLocation();
  const Art = ART_BY_PATH[pathname] ?? Chai;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stops = [];
    let builtFor = null;
    let height = 0;
    let x = window.innerWidth - 80;
    let tilt = 0;
    let frame = 0;
    let settleFrames = 0;

    function ensureStops() {
      const main = document.getElementById('main');
      const h = document.documentElement.scrollHeight;
      if (main !== builtFor || Math.abs(h - height) > 40) {
        stops = buildStops();
        builtFor = main;
        height = h;
      }
    }

    function targetX(docY) {
      if (stops.length === 0) return window.innerWidth - 80;
      if (docY <= stops[0].y) return stops[0].x;
      for (let i = 0; i < stops.length - 1; i++) {
        const a = stops[i];
        const b = stops[i + 1];
        if (docY <= b.y) return a.x + (b.x - a.x) * smooth((docY - a.y) / (b.y - a.y || 1));
      }
      return stops[stops.length - 1].x;
    }

    function tick(time) {
      frame = 0;
      ensureStops();
      const vh = window.innerHeight;
      const tx = targetX(window.scrollY + vh * 0.55);
      const dx = (tx - x) * (reduce ? 1 : FOLLOW);
      x += dx;
      tilt += (Math.max(-28, Math.min(28, dx * 1.6)) - tilt) * 0.15;
      const bob = reduce ? 0 : Math.sin(time / 600) * 6;
      el.style.transform = `translate3d(${x - SIZE / 2}px, ${vh * 0.55 - SIZE / 2 + bob}px, 0) rotate(${tilt}deg)`;
      if (Math.abs(dx) > 0.15 || settleFrames-- > 0) frame = requestAnimationFrame(tick);
    }
    const wake = () => {
      settleFrames = 90;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onResize = () => {
      builtFor = null;
      wake();
    };

    wake();
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', onResize);
    const idleBob = window.setInterval(wake, 1500);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(idleBob);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div ref={ref} className="absolute left-0 top-0 will-change-transform" style={{ width: `clamp(60px, 7vw, ${SIZE}px)` }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0, rotate: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="drop-shadow-[0_22px_24px_rgba(17,17,17,0.28)] [&>svg]:w-full [&>svg]:overflow-visible"
          >
            <Art />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
