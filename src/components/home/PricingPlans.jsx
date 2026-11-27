import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Coffee, Crosshair, Lock, ShieldCheck, TrendingUp, User, Users } from 'lucide-react';
import { CONTACT, waLink } from '../../data/site.js';
import { SOLO_NOTES, SOLO_PLANS, TEAM_NOTES, TEAM_PLANS } from '../../data/plans.js';
import { Button } from '../ui/Button.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { PlanCard } from './PlanCard.jsx';

const TABS = [
  { id: 'solo', label: 'Just me', sub: '3 monthly plans', Icon: User, plans: SOLO_PLANS, notes: SOLO_NOTES },
  { id: 'team', label: 'My team', sub: 'Offices for 6–8', Icon: Users, plans: TEAM_PLANS, notes: TEAM_NOTES },
];
const NOTE_ICONS = { coffee: Coffee, shield: ShieldCheck, lock: Lock, focus: Crosshair, grow: TrendingUp };

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};
const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.35 } };

function PlanTabs({ activeId, onChange }) {
  const refs = useRef([]);

  function handleKey(e, i) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;
    onChange(TABS[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div role="tablist" aria-label="Who is the plan for?" className="relative inline-flex rounded-full bg-white/[0.06] p-1.5 ring-1 ring-white/10 backdrop-blur">
      {TABS.map(({ id, label, sub, Icon }, i) => {
        const isActive = id === activeId;
        return (
          <button
            key={id}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`plans-tab-${id}`}
            aria-selected={isActive}
            aria-controls="plans-panel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(id)}
            onKeyDown={(e) => handleKey(e, i)}
            className={`relative flex items-center gap-3 rounded-full py-2.5 pl-3 pr-5 text-left transition-colors duration-300 sm:pr-6 ${isActive ? 'text-on-sun' : 'text-cream/70 hover:text-cream'}`}
          >
            {isActive && (
              <motion.span
                layoutId="plans-tab-pill"
                className="absolute inset-0 rounded-full bg-sun shadow-[0_10px_30px_-10px_var(--color-sun)]"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className={`relative grid size-9 place-items-center rounded-full ${isActive ? 'bg-ink/10' : 'bg-white/[0.07]'}`}>
              <Icon size={17} aria-hidden="true" />
            </span>
            <span className="relative">
              <span className="block text-sm font-semibold leading-tight">{label}</span>
              <span className="block text-[11px] leading-tight opacity-70">{sub}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Slow drifting glow behind the cards, tinted with the theme accent. */
function Atmosphere() {
  const reduce = useReducedMotion();
  const drift = (dx, dy, duration) =>
    reduce ? undefined : { animate: { x: [0, dx, 0], y: [0, dy, 0] }, transition: { duration, repeat: Infinity, ease: 'easeInOut' } };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.span {...drift(80, 40, 18)} className="absolute -left-40 top-1/3 size-[34rem] rounded-full bg-sun/10 blur-[110px]" />
      <motion.span {...drift(-70, -50, 22)} className="absolute -right-40 bottom-0 size-[30rem] rounded-full bg-white/[0.06] blur-[110px]" />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    </div>
  );
}

/** Home "Plans" section: tabs for solo and team plans, with cards that deal in on every switch. */
export function PricingPlans() {
  const [activeId, setActiveId] = useState('solo');
  const panelRef = useRef(null);
  const tab = TABS.find((t) => t.id === activeId);

  // Hold the panel's height while the old cards leave, so the page doesn't jump up mid-switch.
  function switchTab(id) {
    if (id === activeId) return;
    if (panelRef.current) panelRef.current.style.minHeight = `${panelRef.current.offsetHeight}px`;
    setActiveId(id);
  }
  function releaseHeight() {
    if (panelRef.current) panelRef.current.style.minHeight = '';
  }

  return (
    <section className="relative overflow-hidden bg-ink text-cream" aria-labelledby="plans-title">
      <Atmosphere />
      <div className="wrap sec relative">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow num="03" className="text-sun">
              Plans
            </Eyebrow>
            <SplitWords id="plans-title" text="Choose your *workspace plan.*" className="t-h2 mt-4 [&_.accent]:text-sun" />
          </div>
          <Reveal as="p" className="text-cream/60 md:col-span-4 md:col-start-9" delay={0.1}>
            Simple monthly prices — a desk just for you, or a private office for your whole team.
          </Reveal>
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center gap-4" delay={0.15}>
          <PlanTabs activeId={activeId} onChange={switchTab} />
          <AnimatePresence mode="wait">
            {activeId === 'team' && (
              <motion.span key="team-chip" {...fade} className="label rounded-full border border-sun/40 px-3 py-1.5 text-sun">
                For 6 to 8 persons
              </motion.span>
            )}
          </AnimatePresence>
        </Reveal>

        <div ref={panelRef} id="plans-panel" role="tabpanel" aria-labelledby={`plans-tab-${activeId}`} className="[perspective:1400px]">
          <AnimatePresence mode="wait" onExitComplete={releaseHeight}>
            <motion.ul
              key={activeId}
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              exit="exit"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6"
            >
              {tab.plans.map((plan, i) => (
                <PlanCard key={plan.id} plan={plan} kind={activeId} index={i} />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <AnimatePresence mode="wait">
            <motion.ul key={activeId} {...fade} className="flex flex-wrap gap-x-6 gap-y-3">
              {tab.notes.map(({ icon, text }) => {
                const Icon = NOTE_ICONS[icon];
                return (
                  <li key={text} className="flex items-center gap-2.5 text-sm text-cream/70">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sun/15 text-sun">
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    {text}
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
          <div className="flex flex-wrap items-center gap-3">
            {/* mobile keeps a single CTA; the floating call button already covers calling */}
            <Button href={CONTACT.tel} variant="glass" magnetic={false} className="hidden sm:inline-flex">
              {CONTACT.phoneDisplay}
            </Button>
            <Button href={waLink("Hi Let's Work! I have a question about your monthly plans.")}>Ask about plans</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
