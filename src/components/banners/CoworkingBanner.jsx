import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { IMG, waLink } from '../../data/site.js';
import { SOLO_PLANS } from '../../data/plans.js';
import { Button } from '../ui/Button.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Intro } from '../ui/PageIntro.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { EASE_OUT } from '../../lib/motion.js';
import { sized } from '../../data/imageSizes.js';

const SILVER = SOLO_PLANS.find((p) => p.id === 'silver');

/** Coworking: a cinematic full-screen photo of the floor, headline at the bottom, one small booking card. */
export function CoworkingBanner({ message }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-cream">
      <motion.img
        {...sized(IMG.hotDesks)}
        alt="The Let's Work coworking floor with green-divider desks" title="The Let's Work coworking floor with green-divider desks"
        fetchPriority="high"
        style={{ scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/10" aria-hidden="true" />

      {/* the copy lets the mouse through to the photo behind it (so its title shows on hover); the price card stays clickable */}
      <div className="wrap pointer-events-none grid w-full gap-8 pb-12 pt-32 md:pb-16 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Intro delay={0.3}>
            <Eyebrow num="01" className="text-sun">
              Coworking space
            </Eyebrow>
          </Intro>
          <SplitWords as="h1" onMount delay={0.45} text="The coworking space *Multan works from.*" className="t-display mt-5 [&_.accent]:text-sun" />
        </div>

        <Intro delay={0.9} className="lg:col-span-4">
          <div className="glass-dark pointer-events-auto rounded-[28px] p-6">
            <p className="text-cream/75">Any open seat on a bright, shared floor — plug in and get going.</p>
            <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
              <p className="leading-tight">
                <span className="label block text-cream/50">From</span>
                <span className="text-2xl font-semibold">Rs {SILVER.price.toLocaleString('en-US')}</span>
                <span className="text-sm text-cream/50"> / mo</span>
              </p>
              <Button href={waLink(message)}>Book a seat</Button>
            </div>
          </div>
        </Intro>
      </div>
    </section>
  );
}
