import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CalendarClock, Car, Clock, Coffee } from 'lucide-react';
import { TOUR_MSG, waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { Marquee } from '../ui/Marquee.jsx';
import { PhotoDeck3D } from './PhotoDeck3D.jsx';
import { QuickQuote } from './QuickQuote.jsx';
import { EASE_OUT } from '../../lib/motion.js';

const WORDS = ['desk', 'office', 'boardroom', "team's HQ"];
const HOOKS = [
  { icon: Clock, text: 'Move in today' },
  { icon: CalendarClock, text: 'Pay by hour, day or week' },
  { icon: Car, text: 'Free parking' },
  { icon: Coffee, text: 'Chai on call' },
];
const TRUST = ['10+ years experience', '25K+ projects completed', '24/7 support', 'Free tour · no commitment'];
const TICKER = ['Hot desks', 'Dedicated desks', 'Private offices', 'Meeting rooms', 'Instant offices', 'Chai on call', 'Free parking', 'No lease'];

function fadeUp(delay) {
  return { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE_OUT, delay } };
}

/** "Your next desk / office / boardroom…" — the word flips over every couple of seconds. */
function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => setI((n) => (n + 1) % WORDS.length), 2200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative -ml-[0.12em] block h-[1.1em] overflow-hidden pl-[0.12em]" aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[i]}
          className="accent absolute left-[0.12em] top-0 block whitespace-nowrap text-sun"
          initial={{ y: '100%', rotateX: -70, opacity: 0 }}
          animate={{ y: '0%', rotateX: 0, opacity: 1 }}
          exit={{ y: '-100%', rotateX: 70, opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          style={{ transformPerspective: 600, transformOrigin: '50% 50% -0.4em' }}
        >
          {WORDS[i]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const ref = useRef(null);

  return (
    <>
      <section ref={ref} className="relative overflow-hidden bg-ink pb-8 pt-28 text-cream md:pb-12 md:pt-32" aria-labelledby="hero-title">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-20 size-[640px] rounded-full bg-sun/20 blur-[140px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-60 -left-40 size-[520px] rounded-full bg-sun/10 blur-[140px]" />

        <div className="wrap relative grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-6">
          <div className="lg:col-span-6">
            <motion.p {...fadeUp(0.4)} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm">
              <span className="relative flex size-2">
                <span className="ping-soft absolute inset-0 rounded-full bg-sun" />
                <span className="relative size-2 rounded-full bg-sun" />
              </span>
              Open now · Nandla Chowk, Multan
            </motion.p>

            <motion.h1
              {...fadeUp(0.5)}
              id="hero-title"
              aria-label="Your next desk is ready in Multan."
              className="mt-6 text-[clamp(2.5rem,1.4rem+3.6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
            >
              <span className="block" aria-hidden="true">
                Your next
              </span>
              <RotatingWord />
              <span className="block text-cream/90" aria-hidden="true">
                is ready in Multan.
              </span>
            </motion.h1>

            <motion.p {...fadeUp(0.75)} className="mt-6 max-w-lg text-lg leading-relaxed text-cream/65">
              Skip the café Wi-Fi and the five-year lease. Hot desks, private offices and a real boardroom —{' '}
              <span className="text-cream">book by the hour, day or week. No hidden fees.</span>
            </motion.p>

            <motion.div {...fadeUp(0.85)} className="mt-8 flex flex-wrap gap-3">
              <Button href={waLink(TOUR_MSG)}>Claim your free tour</Button>
            </motion.div>

            <motion.ul {...fadeUp(0.95)} className="mt-8 grid max-w-lg grid-cols-2 gap-2">
              {HOOKS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 rounded-2xl border border-white/8 bg-white/4 px-3 py-2.5 text-sm">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sun text-on-sun">
                    <Icon size={14} strokeWidth={2.3} aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.5 }}
            className="relative h-[400px] sm:h-[500px] lg:col-span-6 lg:h-[600px]"
          >
            <PhotoDeck3D scrollTarget={ref} />
          </motion.div>
        </div>

        <motion.div {...fadeUp(1.1)} className="wrap relative mt-8 md:mt-10">
          <QuickQuote />
          <ul className="label mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-cream/45">
            {TRUST.map((t, i) => (
              <li key={t} className="flex items-center gap-4">
                {i > 0 && <span className="size-1 rounded-full bg-sun" aria-hidden="true" />}
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      <Marquee
        label="What we offer"
        items={TICKER}
        speed={38}
        className="border-b border-ink/10 py-4"
        itemClassName="text-lg font-medium tracking-tight md:text-xl"
        separator={
          <span className="mx-7 text-sun-deep" aria-hidden="true">
            ✦
          </span>
        }
      />
    </>
  );
}
