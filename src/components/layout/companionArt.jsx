/* Small flat illustrations for the scroll companion — one per page, all in the brand palette. */
const INK = '#1d1d1d';
const SUN = '#f5b82e';
const CREAM = '#fbfaf6';
const SAUCER = (
  <>
    <ellipse cx="62" cy="134" rx="50" ry="10" fill="#e8dfcc" />
    <ellipse cx="62" cy="131" rx="50" ry="9" fill={CREAM} />
  </>
);
const Steam = () => (
  <g fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" opacity="0.35">
    <path className="chai-steam" d="M48 40c-8-10 8-16 0-28" />
    <path className="chai-steam chai-steam-2" d="M64 42c-8-10 8-16 0-30" />
    <path className="chai-steam chai-steam-3" d="M80 40c-8-10 8-16 0-26" />
  </g>
);

/** Home — a cutting-chai glass ("chai on call"). */
export const Chai = () => (
  <svg viewBox="0 0 120 150">
    <Steam />
    {SAUCER}
    <path d="M30 52h64l-8 70a8 8 0 0 1-8 7H46a8 8 0 0 1-8-7z" fill={CREAM} opacity="0.55" stroke={INK} strokeOpacity="0.25" strokeWidth="2" />
    <path d="M34 70h56l-6 52a7 7 0 0 1-7 6H47a7 7 0 0 1-7-6z" fill="#c8843a" />
    <path d="M34 70h56l-1 8H35z" fill="#e3b07a" />
    <path d="M40 76l4 44" stroke="#fff" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
    <rect x="70" y="92" width="34" height="18" rx="9" fill="#111" />
    <circle cx="80" cy="101" r="3.2" fill={SUN} />
    <circle cx="94" cy="101" r="3.2" fill={CREAM} />
  </svg>
);

/** Coworking — an open laptop. */
export const Laptop = () => (
  <svg viewBox="0 0 120 150">
    <ellipse cx="60" cy="132" rx="52" ry="8" fill={INK} opacity="0.12" />
    <rect x="18" y="44" width="84" height="58" rx="7" fill={INK} />
    <rect x="25" y="51" width="70" height="44" rx="3" fill="#2b3f66" />
    <rect x="32" y="60" width="32" height="5" rx="2.5" fill={SUN} />
    <rect x="32" y="71" width="48" height="4" rx="2" fill={CREAM} opacity="0.6" />
    <rect x="32" y="80" width="38" height="4" rx="2" fill={CREAM} opacity="0.4" />
    <path d="M6 104h108l-9 18H15z" fill="#c4c4c4" />
    <rect x="48" y="106" width="24" height="4" rx="2" fill="#a3a3a3" />
  </svg>
);

/** Dedicated desk — a desk lamp. */
export const Lamp = () => (
  <svg viewBox="0 0 120 150">
    <path d="M74 40l40 76H54z" fill={SUN} opacity="0.25" />
    <rect x="30" y="128" width="56" height="10" rx="5" fill={INK} />
    <path d="M58 128L40 76l30-40" stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M58 22l32 12-10 22-32-12z" fill={INK} />
    <circle cx="76" cy="52" r="7" fill={SUN} />
    <circle cx="40" cy="76" r="6" fill={SUN} />
  </svg>
);

/** Private office — a key with a Let's Work tag. */
export const Key = () => (
  <svg viewBox="0 0 120 150">
    <circle cx="44" cy="48" r="26" fill="none" stroke={SUN} strokeWidth="12" />
    <path d="M62 66l40 40M84 88l10-10M94 98l10-10" stroke={SUN} strokeWidth="11" strokeLinecap="round" />
    <path d="M30 76c-8 16-6 34 6 46" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
    <rect x="18" y="116" width="46" height="24" rx="8" fill={INK} />
    <circle cx="31" cy="128" r="4" fill={SUN} />
    <circle cx="49" cy="128" r="4" fill={CREAM} />
  </svg>
);

/** Meeting room — two speech bubbles. */
export const Talk = () => (
  <svg viewBox="0 0 120 150">
    <path d="M10 30h66a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H40l-16 14v-14H10A10 10 0 0 1 0 74V40a10 10 0 0 1 10-10z" fill={SUN} />
    <path d="M18 52h48M18 64h32" stroke={INK} strokeWidth="5" strokeLinecap="round" opacity="0.75" />
    <path d="M110 80H54a10 10 0 0 0-10 10v28a10 10 0 0 0 10 10h34l14 12v-12h8a10 10 0 0 0 10-10V90a10 10 0 0 0-10-10z" fill={INK} />
    <circle cx="66" cy="104" r="5" fill={SUN} />
    <circle cx="82" cy="104" r="5" fill={SUN} />
    <circle cx="98" cy="104" r="5" fill={SUN} />
  </svg>
);

/** Instant office — a stopwatch. */
export const Stopwatch = () => (
  <svg viewBox="0 0 120 150">
    <rect x="50" y="10" width="20" height="12" rx="4" fill={INK} />
    <circle cx="60" cy="82" r="50" fill={SUN} />
    <circle cx="60" cy="82" r="38" fill={CREAM} />
    <path d="M60 82V54M60 82l18 12" stroke={INK} strokeWidth="7" strokeLinecap="round" />
    <circle cx="60" cy="82" r="6" fill={INK} />
    <path d="M98 40l10-10" stroke={INK} strokeWidth="7" strokeLinecap="round" />
  </svg>
);

/** All spaces — a map pin. */
export const Pin = () => (
  <svg viewBox="0 0 120 150">
    <ellipse cx="60" cy="138" rx="26" ry="6" fill={INK} opacity="0.15" />
    <path d="M60 8a40 40 0 0 0-40 40c0 30 40 82 40 82s40-52 40-82A40 40 0 0 0 60 8z" fill={INK} />
    <circle cx="60" cy="48" r="17" fill={SUN} />
  </svg>
);

/** About — the Let's Work mark. */
export const Mark = () => (
  <svg viewBox="0 0 120 150">
    <circle cx="60" cy="74" r="54" fill={INK} />
    <path d="M30 62a14 14 0 1 0 0 26c10 0 16-8 30-14s20-12 30-12a14 14 0 1 1 0 26" fill="none" stroke={SUN} strokeWidth="9" strokeLinecap="round" />
  </svg>
);

/** Contact — a paper plane. */
export const Plane = () => (
  <svg viewBox="0 0 120 150">
    <path d="M10 70L110 28 84 124 58 94z" fill={CREAM} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <path d="M58 94L110 28M58 94l-8 30 20-18" stroke={INK} strokeWidth="5" fill="none" strokeLinejoin="round" />
    <path d="M2 110c14-4 24-2 34 6" stroke={SUN} strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="2 8" />
  </svg>
);
