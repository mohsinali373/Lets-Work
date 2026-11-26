import { useEffect, useRef } from 'react';

const SIZE = 96; // px on desktop
const FOLLOW = 0.09; // how quickly the cup catches up (0..1 per frame)

/** Top-level sections of the current page. */
function pageSections() {
  const main = document.getElementById('main');
  if (!main) return [];
  return [...main.querySelectorAll('section')].filter((s) => !s.parentElement.closest('section'));
}

/**
 * Builds the cup's route: one stop beside every section, alternating sides.
 * Returns [{ y (document px), x (viewport px) }].
 */
function buildStops() {
  const vw = window.innerWidth;
  const content = Math.min(vw, 1320);
  const gutter = Math.max(SIZE * 0.4, (vw - content) / 2 - SIZE * 0.1);
  const left = gutter;
  const right = vw - gutter;
  return pageSections().map((s, i) => {
    const top = s.getBoundingClientRect().top + window.scrollY;
    return { y: top + Math.min(s.offsetHeight, window.innerHeight) * 0.5, x: i % 2 === 0 ? right : left };
  });
}

const smooth = (t) => t * t * (3 - 2 * t);

/**
 * One cup of chai that travels the whole page with you. It glides from side to side as each
 * section arrives, tilts while it swings across, bobs gently and keeps steaming. It lives in a
 * layer *behind* the content, so it slips under the video and dark sections and comes back out.
 */
export function ChaiCompanion() {
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
      const docY = window.scrollY + vh * 0.55;
      const tx = targetX(docY);
      const dx = (tx - x) * (reduce ? 1 : FOLLOW);
      x += dx;
      tilt += (Math.max(-28, Math.min(28, dx * 1.6)) - tilt) * 0.15;
      const bob = reduce ? 0 : Math.sin(time / 600) * 6;
      el.style.transform = `translate3d(${x - SIZE / 2}px, ${vh * 0.55 - SIZE / 2 + bob}px, 0) rotate(${tilt}deg)`;
      // keep animating while it is still travelling, plus a short tail for the bob
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
    const idleBob = window.setInterval(wake, 1500); // gentle bob even when the page is still
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(idleBob);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div ref={ref} className="absolute left-0 top-0 will-change-transform" style={{ width: `clamp(64px, 7vw, ${SIZE}px)` }}>
        <svg viewBox="0 0 120 150" className="w-full overflow-visible drop-shadow-[0_22px_24px_rgba(17,17,17,0.28)]">
          {/* steam */}
          <g fill="none" stroke="#1d1d1d" strokeWidth="3.5" strokeLinecap="round" opacity="0.35">
            <path className="chai-steam" d="M48 40c-8-10 8-16 0-28" />
            <path className="chai-steam chai-steam-2" d="M64 42c-8-10 8-16 0-30" />
            <path className="chai-steam chai-steam-3" d="M80 40c-8-10 8-16 0-26" />
          </g>
          {/* saucer */}
          <ellipse cx="62" cy="134" rx="50" ry="10" fill="#e8dfcc" />
          <ellipse cx="62" cy="131" rx="50" ry="9" fill="#fbfaf6" />
          {/* glass (cutting chai) */}
          <path d="M30 52h64l-8 70a8 8 0 0 1-8 7H46a8 8 0 0 1-8-7z" fill="#fbfaf6" opacity="0.55" stroke="#1d1d1d" strokeOpacity="0.25" strokeWidth="2" />
          <path d="M34 70h56l-6 52a7 7 0 0 1-7 6H47a7 7 0 0 1-7-6z" fill="#c8843a" />
          <path d="M34 70h56l-1 8H35z" fill="#e3b07a" />
          <path d="M40 76l4 44" stroke="#fff" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="62" cy="52" rx="32" ry="5" fill="none" stroke="#1d1d1d" strokeOpacity="0.3" strokeWidth="2" />
          {/* little Let's Work tag */}
          <rect x="70" y="92" width="34" height="18" rx="9" fill="#111" />
          <circle cx="80" cy="101" r="3.2" fill="#f5b82e" />
          <circle cx="94" cy="101" r="3.2" fill="#fbfaf6" />
        </svg>
      </div>
    </div>
  );
}
