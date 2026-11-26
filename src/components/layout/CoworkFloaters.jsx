import { useEffect, useRef } from 'react';

const INK = '#1d1d1d';
const SUN = '#f5b82e';
const CREAM = '#fbfaf6';

/* Small flat illustrations of things you'd find on a coworking floor. */
const Cup = () => (
  <svg viewBox="0 0 100 100">
    <path d="M38 22c0-8 8-8 8-16M52 22c0-8 8-8 8-16" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" opacity=".5" />
    <ellipse cx="50" cy="86" rx="34" ry="7" fill={INK} opacity=".18" />
    <path d="M24 34h46l-5 44a8 8 0 0 1-8 7H37a8 8 0 0 1-8-7z" fill={SUN} />
    <path d="M70 44h6a10 10 0 0 1 0 20h-8" stroke={SUN} strokeWidth="6" fill="none" />
    <rect x="24" y="30" width="46" height="8" rx="4" fill={INK} />
  </svg>
);
const Laptop = () => (
  <svg viewBox="0 0 120 90">
    <rect x="20" y="8" width="80" height="54" rx="6" fill={INK} />
    <rect x="27" y="15" width="66" height="40" rx="3" fill="#2b3f66" />
    <rect x="34" y="24" width="30" height="5" rx="2.5" fill={SUN} />
    <rect x="34" y="34" width="44" height="4" rx="2" fill={CREAM} opacity=".6" />
    <rect x="34" y="42" width="36" height="4" rx="2" fill={CREAM} opacity=".4" />
    <path d="M8 64h104l-8 14H16z" fill="#b9b9b9" />
  </svg>
);
const Plant = () => (
  <svg viewBox="0 0 100 120">
    <path d="M50 70C30 60 22 40 30 18c14 10 22 28 20 52zM50 70c18-12 24-32 16-52-14 10-20 30-16 52zM50 72C34 70 18 62 10 46c18-2 32 8 40 26zM50 72c16-4 30-14 38-30-18-2-32 10-38 30z" fill="#3d7a3a" />
    <path d="M30 70h40l-5 40H35z" fill="#c9a24a" />
    <rect x="27" y="66" width="46" height="9" rx="3" fill="#b38b35" />
  </svg>
);
const Chair = () => (
  <svg viewBox="0 0 100 120">
    <rect x="26" y="6" width="48" height="52" rx="12" fill={INK} />
    <rect x="20" y="56" width="60" height="14" rx="7" fill={INK} />
    <rect x="46" y="70" width="8" height="24" fill="#8c8c8c" />
    <path d="M18 104l32-10 32 10" stroke="#8c8c8c" strokeWidth="6" fill="none" strokeLinecap="round" />
    <circle cx="18" cy="108" r="5" fill={INK} />
    <circle cx="82" cy="108" r="5" fill={INK} />
    <circle cx="50" cy="104" r="5" fill={INK} />
  </svg>
);
const Lamp = () => (
  <svg viewBox="0 0 100 120">
    <path d="M60 28L92 92H40z" fill={SUN} opacity=".28" />
    <path d="M30 112h40" stroke={INK} strokeWidth="8" strokeLinecap="round" />
    <path d="M50 110L34 62l26-34" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 16l26 10-8 18-26-10z" fill={INK} />
    <circle cx="64" cy="40" r="6" fill={SUN} />
  </svg>
);
const Sticky = () => (
  <svg viewBox="0 0 100 100">
    <path d="M10 10h80v62L72 90H10z" fill={SUN} />
    <path d="M72 90V72h18z" fill="#d9a325" />
    <path d="M22 30h48M22 44h40M22 58h28" stroke={INK} strokeWidth="5" strokeLinecap="round" opacity=".7" />
    <path d="M60 56l6 6 12-14" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Headphones = () => (
  <svg viewBox="0 0 100 100">
    <path d="M18 60V48a32 32 0 0 1 64 0v12" stroke={INK} strokeWidth="8" fill="none" strokeLinecap="round" />
    <rect x="10" y="54" width="22" height="34" rx="10" fill={SUN} />
    <rect x="68" y="54" width="22" height="34" rx="10" fill={SUN} />
  </svg>
);
const Plane = () => (
  <svg viewBox="0 0 100 100">
    <path d="M8 46L92 12 70 88 48 62z" fill={CREAM} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <path d="M48 62L92 12M48 62l-6 24 16-14" stroke={INK} strokeWidth="4" fill="none" strokeLinejoin="round" />
  </svg>
);
const Wifi = () => (
  <svg viewBox="0 0 100 100">
    <path d="M14 40a52 52 0 0 1 72 0M26 54a34 34 0 0 1 48 0M38 68a16 16 0 0 1 24 0" stroke={SUN} strokeWidth="8" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="80" r="7" fill={INK} />
  </svg>
);

/*
 * x: % of viewport width · y: starting % down the screen · speed: how fast it drifts up per px
 * scrolled · spin: degrees per 1000px · sway: px of side-to-side drift · mobile: show on phones.
 */
const ITEMS = [
  { C: Cup, x: 4, y: 12, size: 72, speed: 0.32, spin: 18, sway: 26, mobile: true },
  { C: Laptop, x: 86, y: 30, size: 104, speed: 0.22, spin: -10, sway: 30, mobile: true },
  { C: Plant, x: 90, y: 78, size: 76, speed: 0.4, spin: 8, sway: 18, mobile: false },
  { C: Sticky, x: 9, y: 58, size: 62, speed: 0.5, spin: 40, sway: 22, mobile: true },
  { C: Chair, x: 78, y: 110, size: 70, speed: 0.28, spin: -14, sway: 24, mobile: false },
  { C: Headphones, x: 14, y: 96, size: 64, speed: 0.36, spin: 26, sway: 28, mobile: false },
  { C: Lamp, x: 70, y: 150, size: 70, speed: 0.44, spin: -20, sway: 20, mobile: false },
  { C: Plane, x: 2, y: 140, size: 60, speed: 0.6, spin: 60, sway: 40, mobile: true },
  { C: Wifi, x: 92, y: 4, size: 54, speed: 0.52, spin: 0, sway: 16, mobile: false },
];
const WRAP_PAD = 160;

/**
 * Coworking objects that drift across the whole screen with the scroll — each at its own pace,
 * spinning and swaying — all the way to the footer. The layer sits *behind* the page content,
 * so the objects slide under the video and dark sections and come out the other side.
 */
export function CoworkFloaters() {
  const refs = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    function update() {
      frame = 0;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const s = reduce ? 0 : window.scrollY;
      const span = vh + WRAP_PAD * 2;
      ITEMS.forEach((it, i) => {
        const el = refs.current[i];
        if (!el) return;
        const raw = (it.y / 100) * vh - s * it.speed;
        const y = ((raw % span) + span) % span - WRAP_PAD;
        const x = (it.x / 100) * vw + Math.sin(s * 0.0024 + i * 1.7) * it.sway;
        const r = (s * it.spin) / 1000 + i * 17;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`;
      });
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {ITEMS.map(({ C, size, mobile }, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`absolute left-0 top-0 will-change-transform drop-shadow-[0_14px_18px_rgba(17,17,17,0.18)] ${mobile ? '' : 'hidden md:block'}`}
          style={{ width: `clamp(${Math.round(size * 0.6)}px, ${size / 14}vw, ${size}px)` }}
        >
          <C />
        </div>
      ))}
    </div>
  );
}
