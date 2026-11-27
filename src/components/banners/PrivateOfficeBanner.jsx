import { motion, useReducedMotion } from 'motion/react';
import { IMG, waLink } from '../../data/site.js';
import { TEAM_PLANS } from '../../data/plans.js';
import { Button } from '../ui/Button.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Intro } from '../ui/PageIntro.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';

const FROM = Math.min(...TEAM_PLANS.map((p) => p.price));
const DOOR = { duration: 1.6, ease: [0.7, 0, 0.2, 1], delay: 0.9 };

/** One door leaf: a panel with grooves and a handle, sliding away to reveal the office. */
function DoorLeaf({ side }) {
  const reduce = useReducedMotion();
  const isLeft = side === 'left';
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute inset-y-0 w-1/2 bg-ink-soft ${isLeft ? 'left-0 border-r' : 'right-0 border-l'} border-white/10`}
      initial={{ x: '0%' }}
      animate={{ x: isLeft ? '-101%' : '101%' }}
      transition={reduce ? { duration: 0 } : DOOR}
    >
      <div className="absolute inset-6 rounded-xl border border-white/10" />
      <div className="absolute inset-12 rounded-lg border border-white/[0.06]" />
      <span className={`absolute top-1/2 h-16 w-2 -translate-y-1/2 rounded-full bg-sun ${isLeft ? 'right-6' : 'left-6'}`} />
    </motion.div>
  );
}

/** Private office: centred copy, then a wide photo that opens like a pair of doors. */
export function PrivateOfficeBanner({ message }) {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-sun/12 blur-[140px]" aria-hidden="true" />

      <div className="wrap relative pb-16 pt-32 text-center md:pb-24 md:pt-40">
        <Intro delay={0.3} className="flex justify-center">
          <Eyebrow num="03" className="text-sun">
            Private office
          </Eyebrow>
        </Intro>
        <SplitWords as="h1" onMount delay={0.45} text="Private office space *in Multan.*" className="t-display mx-auto mt-6 max-w-4xl [&_.accent]:text-sun" />
        <Intro as="p" delay={0.75} className="mx-auto mt-6 max-w-lg text-lg text-cream/70">
          A door that closes, a desk set up before you arrive, and an address clients respect.
        </Intro>
        <Intro delay={0.85} className="mt-8 flex justify-center">
          <Button href={waLink(message)}>Ask about offices</Button>
        </Intro>

        <div className="relative mt-14 aspect-[4/3] overflow-hidden rounded-[32px] ring-1 ring-white/10 md:aspect-[21/9]">
          <img src={IMG.privateOffice} alt="A private office at Let's Work with a desk and yellow feature wall" title="A private office at Let's Work with a desk and yellow feature wall" fetchPriority="high" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />
          <p className="glass-dark absolute bottom-4 left-4 rounded-full px-4 py-2 text-left text-sm md:bottom-6 md:left-6">
            Teams of 6–8 · from <strong className="text-sun">Rs {FROM.toLocaleString('en-US')}</strong> / month
          </p>
          <DoorLeaf side="left" />
          <DoorLeaf side="right" />
        </div>
      </div>
    </section>
  );
}
