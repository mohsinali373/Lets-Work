import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Car, Lock, Tag, Wifi } from 'lucide-react';
import { IMG, TOUR_MSG, waLink } from '../../data/site.js';
import { SOLO_PLANS } from '../../data/plans.js';
import { Button } from '../ui/Button.jsx';
import { Marquee } from '../ui/Marquee.jsx';
import { RotatingBadge } from '../ui/RotatingBadge.jsx';
import { EASE_OUT } from '../../lib/motion.js';

const FACTS = [
  { icon: Tag, text: 'Simple monthly plans' },
  { icon: Car, text: 'Free parking' },
  { icon: Wifi, text: '5G internet' },
  { icon: Lock, text: 'Private lockers' },
];
const LOWEST_PRICE = Math.min(...SOLO_PLANS.map((p) => p.price));
const TICKER = ['Hot desks', 'Dedicated desks', 'Private offices', 'Meeting rooms', 'Instant offices', 'Private lockers', 'Free parking', 'Monthly plans'];

function fadeUp(delay) {
  return { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE_OUT, delay } };
}

/** One headline line that slides up out of a mask — plays once on load. */
function Line({ children, delay, className = '' }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span className={`block ${className}`} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease: EASE_OUT, delay }}>
        {children}
      </motion.span>
    </span>
  );
}

/** A photo inside a shaped frame; the photo eases in a little on hover. */
function Shot({ src, alt, className, frameMotion, focus = 'center', children }) {
  return (
    <motion.figure className={`group absolute overflow-hidden ${className}`} {...frameMotion}>
      <img
        src={src}
        alt={alt} title={alt}
        loading="eager"
        style={{ objectPosition: focus }}
        className="size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
      />
      {children}
    </motion.figure>
  );
}

/**
 * Editorial collage: an arch, a circle and an accent tile around a slowly turning badge.
 * Every piece opens once on load in its own way; nothing loops except the badge text.
 */
function Collage() {
  return (
    <div className="relative mx-auto aspect-[10/11] w-full max-w-[600px]">
      {/* faint dot patch behind the arch */}
      <span
        className="absolute -left-6 top-0 h-1/2 w-1/2 rounded-3xl bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] [background-size:16px_16px]"
        aria-hidden="true"
      />

      {/* arch — long tables running to the circle wall */}
      <Shot
        src={IMG.floorCircles}
        alt="Long work tables leading to the round feature wall"
        className="left-0 top-[7%] h-[90%] w-[50%] rounded-b-[28px] rounded-t-[999px] ring-1 ring-white/10"
        frameMotion={{
          initial: { clipPath: 'inset(100% 0% 0% 0%)' },
          animate: { clipPath: 'inset(0% 0% 0% 0%)' },
          transition: { duration: 1.3, ease: EASE_OUT, delay: 0.3 },
        }}
      >
        <figcaption className="label absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/70 px-3 py-1.5 text-[0.62rem] text-cream backdrop-blur">
          The floor
        </figcaption>
      </Shot>

      {/* circle — the lounge, with a thin outline ring offset behind it */}
      {/* ring and photo share one square box, so the ring is always exactly centred on the photo */}
      <div className="absolute right-[3%] top-[3%] aspect-square w-[44%]">
        <motion.span
          className="absolute -inset-[3%] rounded-full border border-sun/45"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.7 }}
        />
        <Shot
          src={IMG.boardroom}
          alt="The boardroom with its yellow feature wall"
          focus="50% 35%"
          className="inset-0 rounded-full ring-1 ring-white/10"
          frameMotion={{
            initial: { opacity: 0, scale: 0.7, rotate: -10 },
            animate: { opacity: 1, scale: 1, rotate: 0 },
            transition: { duration: 1.2, ease: EASE_OUT, delay: 0.5 },
          }}
        />
      </div>

      {/* accent tile — the price hook */}
      <motion.a
        href="#plans-title"
        className="group absolute bottom-[3%] right-[2%] flex h-[37%] w-[44%] flex-col justify-between rounded-[28px] bg-sun p-5 text-on-sun shadow-[0_30px_60px_-24px_var(--color-sun)] sm:p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.75 }}
      >
        <span className="label opacity-70">Monthly plans</span>
        <span>
          <span className="block text-xs font-medium opacity-70">from</span>
          <span className="block text-[clamp(1.5rem,0.9rem+2.2vw,2.6rem)] font-semibold leading-none tracking-tight">Rs {LOWEST_PRICE.toLocaleString('en-US')}</span>
          <span className="mt-1 block text-xs font-medium opacity-70">per month</span>
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold">
          See plans
          <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </motion.a>

      {/* turning badge where the pieces meet */}
      <motion.a
        href={waLink(TOUR_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a free tour on WhatsApp"
        // centred on the seam between the arch (ends at 50%) and the circle/tile column; always a true circle
        className="absolute left-1/2 top-[49%] aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink text-cream ring-1 ring-white/15"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 1.1 }}
      >
        <RotatingBadge
          text="BOOK A FREE TOUR • LET'S WORK MULTAN • "
          className="size-full p-1 text-[0.95em]"
          center={
            <span className="grid size-10 place-items-center rounded-full bg-sun text-on-sun transition-transform duration-300 hover:rotate-45 sm:size-12">
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          }
        />
      </motion.a>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-cream" aria-labelledby="hero-title">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -right-32 top-1/4 size-[40rem] rounded-full bg-sun/12 blur-[150px]" />
        </div>

        <div className="wrap grid items-center gap-14 pb-16 pt-28 md:pb-20 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-10 lg:py-28">
          {/* left: the pitch */}
          <div className="lg:col-span-6">
            <motion.p {...fadeUp(0.1)} className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <span className="relative flex size-2">
                <span className="ping-soft absolute inset-0 rounded-full bg-sun" />
                <span className="relative size-2 rounded-full bg-sun" />
              </span>
              Coworking · Nandla Chowk, Multan
            </motion.p>

            <h1 id="hero-title" className="mt-7 text-[clamp(3rem,1.5rem+5vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              <Line delay={0.2}>Space to work.</Line>
              <Line delay={0.34} className="accent text-sun">
                Room to grow.
              </Line>
            </h1>

            <motion.p {...fadeUp(0.6)} className="mt-7 max-w-md text-lg leading-relaxed text-cream/75">
              Hot desks, private offices and meeting rooms — furnished, connected and ready the day you walk in.
            </motion.p>

            <motion.div {...fadeUp(0.72)} className="mt-9">
              <Button href={waLink(TOUR_MSG)}>Book a free tour</Button>
            </motion.div>

            <motion.ul {...fadeUp(0.85)} className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-6">
              {FACTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-cream/75">
                  <Icon size={16} className="shrink-0 text-sun" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* right: the collage */}
          <div className="lg:col-span-6">
            <Collage />
          </div>
        </div>
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
