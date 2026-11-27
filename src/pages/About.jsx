import { useRef } from 'react';
import { PAGES } from '../data/seo.js';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin } from 'lucide-react';
import { CONTACT, IMG } from '../data/site.js';
import { Page } from '../components/layout/Page.jsx';
import { SplitWords } from '../components/ui/SplitWords.jsx';
import { Eyebrow } from '../components/ui/Eyebrow.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { Counter } from '../components/ui/Counter.jsx';
import { Marquee } from '../components/ui/Marquee.jsx';
import { Button } from '../components/ui/Button.jsx';
import { CtaBand } from '../components/sections/CtaBand.jsx';
import { ScrollTilt } from '../components/ui/ScrollTilt.jsx';
import { AboutBanner } from '../components/banners/AboutBanner.jsx';

const VALUES = [
  { title: 'Flexibility', text: 'Memberships that bend around small teams, freelancers and business owners — not the other way round.' },
  { title: 'Productivity', text: 'An open, bright space designed to help you get more done, without the distractions of home.' },
  { title: 'Community', text: 'A diverse professional community for networking, skill-sharing and the occasional collaboration.' },
  { title: 'Commitment', text: 'Sustainable practices and support for local initiatives — we want Multan to win, not just our members.' },
];

const STATS = [
  { to: 10, suffix: '+', label: 'Years of experience' },
  { to: 25, suffix: 'K+', label: 'Projects completed' },
  { to: 24, suffix: '/7', label: 'Customer support' },
  { to: 5, suffix: '', label: 'Ways to work' },
];

function Collage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const slow = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const fast = useTransform(scrollYProgress, [0, 1], ['18%', '-18%']);

  return (
    <div ref={ref} className="wrap grid grid-cols-12 gap-3 md:gap-4">
      <motion.figure style={{ y: slow }} className="col-span-7 overflow-hidden rounded-[30px] md:col-span-6">
        <img src={IMG.floorLong} alt="Long work tables leading to the round yellow feature wall inside Let's Work" title="Long work tables leading to the round yellow feature wall inside Let's Work" fetchPriority="high" className="aspect-[4/3] size-full object-cover" />
      </motion.figure>
      <motion.figure style={{ y: fast }} className="col-span-5 mt-16 overflow-hidden rounded-[30px] md:col-span-3 md:mt-24">
        <img src={IMG.desksTall} alt="Window-side desks at Let's Work" title="Window-side desks at Let's Work" loading="lazy" className="aspect-[3/4] size-full object-cover" />
      </motion.figure>
      <motion.figure style={{ y: slow }} className="relative col-span-12 hidden overflow-hidden rounded-[30px] md:col-span-3 md:block">
        <img
          src={IMG.lounge}
          alt="The Let's Work lounge with blue sofas" title="The Let's Work lounge with blue sofas"
          loading="lazy"
          className="aspect-[3/4] size-full object-cover"
        />
      </motion.figure>
    </div>
  );
}

export function About() {
  return (
    <Page seo={PAGES.about}>
      <AboutBanner />

      <Collage />

      <section className="wrap sec grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow num="01">Our story</Eyebrow>
          <SplitWords text="The space *for imagination.*" className="t-h2 mt-4" />
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-graphite lg:col-span-6 lg:col-start-7">
          <Reveal as="p">
            Let's Work started with a simple observation: Multan was full of talented people — entrepreneurs, startups,
            remote workers and freelancers — with nowhere professional to work that didn't come with a long lease.
          </Reveal>
          <Reveal as="p" delay={0.05}>
            So we built one. An open, collaborative workspace at Nandla Chowk designed to boost productivity, creativity
            and teamwork, with flexible memberships for small teams, freelancers and business owners.
          </Reveal>
          <Reveal as="p" delay={0.1} className="text-ink">
            More than ten years of experience later, we still believe the same thing: when you put ambitious people in a
            good room, businesses grow alongside each other.
          </Reveal>
        </div>
      </section>

      <Marquee
        items={['Flexibility', 'Productivity', 'Creativity', 'Teamwork', 'Community']}
        speed={28}
        className="border-y border-ink/10 py-5"
        itemClassName="text-3xl font-semibold tracking-tight md:text-5xl"
        separator={<span className="accent mx-8 text-sun-deep md:mx-12">&amp;</span>}
      />

      <section className="wrap sec">
        <SplitWords text="What we *stand for.*" className="t-h2" />
        <ScrollTilt from={18}>
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal
              as="li"
              key={v.title}
              delay={(i % 2) * 0.08}
              className={`rounded-[28px] p-7 md:p-9 ${i === 1 ? 'bg-ink text-cream' : i === 2 ? 'bg-sun' : 'bg-paper'}`}
            >
              <span className="label opacity-50">0{i + 1}</span>
              <h3 className="t-h3 mt-10">{v.title}</h3>
              <p className={`mt-2 max-w-md ${i === 1 ? 'text-cream/65' : 'opacity-75'}`}>{v.text}</p>
            </Reveal>
          ))}
        </ul>
        </ScrollTilt>
      </section>

      <section className="bg-ink text-cream">
        <dl className="wrap sec-tight grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="flex flex-col border-l border-white/10 pl-6">
              <dt className="label order-2 mt-2 text-cream/50">{s.label}</dt>
              <dd className="order-1 text-6xl font-semibold tracking-tight text-sun md:text-7xl">
                <Counter to={s.to} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="wrap sec grid gap-6 lg:grid-cols-12 lg:items-stretch">
        <Reveal className="flex flex-col rounded-[30px] bg-paper p-7 md:p-9 lg:col-span-4">
          <Eyebrow>Find us</Eyebrow>
          <p className="t-h3 mt-6">{CONTACT.address}</p>
          <p className="mt-3 text-graphite">Free parking on site. Look for the yellow logo.</p>
          <div className="mt-auto pt-8">
            <Button href={CONTACT.mapLink} variant="ink" icon={MapPin}>
              Open in Maps
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="min-h-[360px] overflow-hidden rounded-[30px] lg:col-span-8">
          <iframe
            title="Map showing Let's Work at Nandla Chowk, Shuhada Road, Multan"
            src={CONTACT.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full min-h-[360px] grayscale-[0.6] contrast-[1.05]"
          />
        </Reveal>
      </section>

      <CtaBand title="Come see it *for yourself.*" />
    </Page>
  );
}
