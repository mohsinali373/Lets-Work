import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { Armchair, Car, Check, Coffee, Crown, Gem, Sparkles, Wifi } from 'lucide-react';
import { waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { EASE_OUT } from '../../lib/motion.js';

/** Medal colours per tier. These describe the tier (silver/gold/diamond), not the site theme. */
const TIERS = {
  silver: { a: '#f1f4f8', b: '#8f99a6', on: '#1d2530', Icon: Crown },
  gold: { a: '#ffe39c', b: '#cf9216', on: '#3a2600', Icon: Crown },
  diamond: { a: '#b3cdff', b: '#3a62e4', on: '#ffffff', Icon: Gem },
};
const ROW_ICONS = { space: Armchair, wifi: Wifi, tea: Coffee, car: Car };
const TILT_SPRING = { stiffness: 160, damping: 18, mass: 0.5 };
const MAX_TILT = 3; // degrees — subtle, so the card never swings away from the pointer

export const cardVariants = {
  hidden: { opacity: 0, y: 56, rotateX: 16, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: EASE_OUT } },
  exit: { opacity: 0, y: -28, filter: 'blur(8px)', transition: { duration: 0.28 } },
};

export function formatRs(n) {
  return n.toLocaleString('en-US');
}

/** Counts up to the price the first time the card is on screen. */
function AnimatedPrice({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const controls = animate(0, value, { duration: 1.4, ease: EASE_OUT, onUpdate: (n) => setShown(Math.round(n)) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {formatRs(shown)}
    </span>
  );
}

function Medallion({ tier, label }) {
  const { a, b, on, Icon } = TIERS[tier];
  return (
    <span
      className="relative grid size-14 shrink-0 place-items-center rounded-2xl shadow-[0_12px_24px_-10px_rgba(0,0,0,0.6)]"
      style={{ background: `linear-gradient(140deg, ${a}, ${b})`, color: on }}
    >
      {label ? <span className="font-mono text-lg font-semibold">{label}</span> : <Icon size={24} strokeWidth={2} aria-hidden="true" />}
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/45 to-transparent opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" aria-hidden="true" />
    </span>
  );
}

function SoloPerks({ perks, tier }) {
  const { a, b, on } = TIERS[tier];
  return (
    <ul className="space-y-3 text-[0.95rem]">
      {perks.map((perk) => (
        <li key={perk} className="flex items-center gap-3 text-cream/85">
          <span className="grid size-5 shrink-0 place-items-center rounded-full" style={{ background: `linear-gradient(140deg, ${a}, ${b})`, color: on }}>
            <Check size={12} strokeWidth={3.2} aria-hidden="true" />
          </span>
          {perk}
        </li>
      ))}
    </ul>
  );
}

function TeamRows({ rows }) {
  return (
    <ul className="divide-y divide-white/10">
      {rows.map(({ icon, title, text }) => {
        const Icon = ROW_ICONS[icon];
        return (
          <li key={title} className="flex gap-3.5 py-3.5 first:pt-0 last:pb-0">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-[color-mix(in_srgb,var(--color-sun)_70%,white)] ring-1 ring-white/10">
              <Icon size={17} aria-hidden="true" />
            </span>
            <span>
              <span className="label block text-[color-mix(in_srgb,var(--color-sun)_70%,white)]">{title}</span>
              <span className="mt-1 block text-sm leading-snug text-cream/75">{text}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * One pricing card: medal, animated price, what's included and a WhatsApp CTA.
 * Tilts toward the pointer and lights up under it; the featured card gets a spinning medal-coloured ring.
 * @param {{ plan: object, kind: 'solo'|'team', index: number }} props
 */
export function PlanCard({ plan, kind, index }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const surfaceRef = useRef(null);
  const reduce = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, TILT_SPRING);
  const rotateY = useSpring(tiltY, TILT_SPRING);
  const tier = TIERS[plan.tier];
  const isFeatured = Boolean(plan.badge);
  const message = `Hi Let's Work! I'm interested in the ${plan.name} plan (Rs. ${formatRs(plan.price)}/month). Could you share the details?`;

  // Measured from the <li>, which never tilts, so the light lands exactly under the pointer
  // even while the card is rotated.
  function handleMove(e) {
    const card = cardRef.current;
    const frame = frameRef.current;
    const surface = surfaceRef.current;
    if (!card || !frame || !surface || e.pointerType !== 'mouse') return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left - frame.offsetLeft - surface.offsetLeft;
    const y = e.clientY - r.top - frame.offsetTop - surface.offsetTop;
    surface.style.setProperty('--mx', `${x}px`);
    surface.style.setProperty('--my', `${y}px`);
    if (reduce) return;
    const px = x / surface.offsetWidth - 0.5; // -0.5 (left) … 0.5 (right)
    const py = y / surface.offsetHeight - 0.5; // -0.5 (top) … 0.5 (bottom)
    // the part under the pointer leans toward the viewer
    tiltX.set(py * MAX_TILT * 2);
    tiltY.set(-px * MAX_TILT * 2);
  }
  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    // perspective sits on the <li>, not inside the tilt transform: with `perspective()` in the transform,
    // Chrome hit-tests the tilted card ~20px off from where it paints, so "Book this plan" stopped taking clicks
    <motion.li ref={cardRef} variants={cardVariants} data-plan-card className="relative pt-4 [perspective:1100px]">
      {isFeatured && (
        <motion.span
          className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)]"
          style={{ background: `linear-gradient(140deg, ${tier.a}, ${tier.b})`, color: tier.on }}
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={13} aria-hidden="true" />
          {plan.badge}
        </motion.span>
      )}

      <motion.div
        ref={frameRef}
        onPointerMove={handleMove}
        onPointerLeave={resetTilt}
        style={{ rotateX, rotateY, '--ring-a': tier.a, '--ring-b': tier.b }}
        className={`relative h-full rounded-[30px] p-[1.5px] ${isFeatured ? 'plan-ring shadow-[0_30px_80px_-30px_var(--ring-b)]' : 'bg-white/[0.12]'}`}
      >
        <div ref={surfaceRef} className="plan-spot relative flex h-full flex-col overflow-hidden rounded-[29px] bg-ink-soft p-6 md:p-7">
          {/* soft medal-coloured glow behind the header */}
          <span
            className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full opacity-25 blur-3xl"
            style={{ background: tier.b }}
            aria-hidden="true"
          />

          <div className="relative flex items-center gap-4">
            <Medallion tier={plan.tier} label={kind === 'team' ? `0${index + 1}` : null} />
            <div>
              <p className="label text-cream/50">{kind === 'team' ? 'Team plan · 6–8 seats' : 'Monthly plan'}</p>
              <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>
            </div>
          </div>
          <p className="relative mt-3 text-sm text-cream/60">{plan.blurb}</p>

          <p className="relative mt-6 flex items-end gap-1.5 leading-none">
            <span className="mb-1.5 text-base font-semibold text-cream/60">Rs.</span>
            <AnimatedPrice value={plan.price} className="text-[2.9rem] font-semibold tracking-tight md:text-[3.2rem]" />
            <span className="mb-1.5 text-sm text-cream/50">/ month</span>
          </p>

          <span
            className="relative my-6 block h-px w-full"
            style={{ background: `linear-gradient(90deg, ${tier.b}, transparent)` }}
            aria-hidden="true"
          />

          <div className="relative flex-1">
            {kind === 'team' ? <TeamRows rows={plan.rows} /> : <SoloPerks perks={plan.perks} tier={plan.tier} />}
          </div>

          <div className="relative mt-7">
            <Button href={waLink(message)} variant={isFeatured ? 'sun' : 'glass'} className="w-full justify-between" magnetic={false}>
              Book this plan
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
}
