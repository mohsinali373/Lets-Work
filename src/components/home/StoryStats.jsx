import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { IMG } from '../../data/site.js';
import { Counter } from '../ui/Counter.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Button } from '../ui/Button.jsx';
import { Marquee } from '../ui/Marquee.jsx';

const STATS = [
  { to: 10, suffix: '+', label: 'Years of experience' },
  { to: 24, suffix: '/7', label: 'Customer support' },
  { to: 5, suffix: '', label: 'Ways to work' },
  { to: 25, suffix: 'K+', label: 'Projects completed' },
];

const WHO = ['Freelancers', 'Startups', 'Remote teams', 'Business owners', 'Entrepreneurs', 'Small teams'];

/** Who it's for + a short story with counters. Leads into the FAQ. */
export function StoryStats() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <>
      <Marquee
        label="Who works here"
        items={WHO.map((w, i) => (
          <span key={w} className={i % 2 ? 'accent text-sun' : ''}>
            {w}
          </span>
        ))}
        speed={30}
        className="bg-ink py-6 text-cream md:py-8"
        itemClassName="text-4xl font-semibold tracking-tight md:text-6xl"
        separator={<span className="mx-8 size-3 rounded-full bg-sun/80 md:mx-12" aria-hidden="true" />}
      />

      <section ref={ref} className="wrap sec grid gap-10 lg:grid-cols-12 lg:items-center" aria-labelledby="story-title">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] lg:col-span-5">
          <motion.img
            style={{ y: imgY, scale: 1.2 }}
            src={IMG.privateOffice}
            alt="The Let's Work front office with its yellow feature wall" title="The Let's Work front office with its yellow feature wall"
            loading="lazy"
            className="size-full object-cover"
          />
          <p className="glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm font-medium">Our front desk — say hi</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow num="06">Why people stay</Eyebrow>
          <SplitWords id="story-title" text="Multan's no.1 coworking space. *The space for imagination.*" className="t-h2 mt-4" />
          <Reveal as="p" className="t-lead mt-6 max-w-lg" delay={0.1}>
            We built Let's Work for the people Multan's offices forgot — freelancers, small teams and founders who need a
            professional base without a five-year lease. Ten years on, that's still the whole idea.
          </Reveal>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-8">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-5xl font-semibold tracking-tight md:text-6xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </dd>
                <p className="label mt-2 text-graphite" aria-hidden="true">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-10" delay={0.1}>
            <Button to="/about-us" variant="ink">
              Read our story
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
