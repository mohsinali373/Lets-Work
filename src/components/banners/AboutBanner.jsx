import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { IMG } from '../../data/site.js';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Intro } from '../ui/PageIntro.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { EASE_OUT } from '../../lib/motion.js';
import { sized } from '../../data/imageSizes.js';

/** About: the motto as a big manifesto line, then the building on Shuhada Road opening from the centre. */
export function AboutBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section className="wrap pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-9">
          <Intro delay={0.3}>
            <Eyebrow>About Let's Work</Eyebrow>
          </Intro>
          <SplitWords as="h1" onMount delay={0.45} text="Dynamic spaces for *dynamic people.*" className="t-display mt-6" />
        </div>
        <Intro as="p" delay={0.85} className="text-graphite lg:col-span-3">
          More than ten years of making Multan a better place to work. That line has been on our wall since day one.
        </Intro>
      </div>

      <motion.div
        ref={ref}
        className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[32px] md:aspect-[21/9]"
        initial={{ clipPath: 'inset(0% 50% 0% 50% round 32px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 32px)' }}
        transition={{ duration: 1.5, ease: EASE_OUT, delay: 0.6 }}
      >
        <motion.img
          {...sized(IMG.building)}
          alt="The Let's Work building with its signage on Shuhada Road, Multan" title="The Let's Work building with its signage on Shuhada Road, Multan"
          fetchPriority="high"
          style={{ y }}
          className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
        />
        <p className="glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm font-medium md:bottom-6 md:left-6">Nandla Chowk, Shuhada Road</p>
      </motion.div>
    </section>
  );
}
