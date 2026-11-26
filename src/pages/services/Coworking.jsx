import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Phone } from 'lucide-react';
import { CONTACT, IMG, waLink } from '../../data/site.js';
import { FAQS } from '../../data/faqs.js';
import { Page } from '../../components/layout/Page.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { SplitWords } from '../../components/ui/SplitWords.jsx';
import { Intro } from '../../components/ui/PageIntro.jsx';
import { Eyebrow } from '../../components/ui/Eyebrow.jsx';
import { Reveal } from '../../components/ui/Reveal.jsx';
import { Bridge } from '../../components/ui/Bridge.jsx';
import { Counter } from '../../components/ui/Counter.jsx';
import { StackCards } from '../../components/service/StackCards.jsx';
import { AmenityBand } from '../../components/sections/AmenityBand.jsx';
import { FaqSection } from '../../components/sections/FaqSection.jsx';
import { RelatedSpaces } from '../../components/sections/RelatedSpaces.jsx';
import { CtaBand } from '../../components/sections/CtaBand.jsx';

const MSG = "Hi Let's Work! I'm interested in a coworking seat. Can I book a tour?";

const WHY = [
  {
    kicker: 'Prime location',
    title: 'In the middle of Multan.',
    text: 'Nandla Chowk on Shuhada Road — close to amenities, transport links and the business districts, with free parking on site.',
    image: IMG.building,
    tone: 'bg-paper text-ink',
  },
  {
    kicker: 'Premium amenities',
    title: 'Everything a big office has.',
    text: 'High-speed internet, ergonomic furniture, fully equipped meeting rooms and complimentary refreshments.',
    image: IMG.boardroom,
    tone: 'bg-ink text-cream',
  },
  {
    kicker: 'Dynamic community',
    title: 'People worth sitting next to.',
    text: 'Networking, skill-sharing sessions and collaborative projects with freelancers, founders and teams.',
    image: IMG.floorPeople,
    tone: 'bg-sun text-ink',
  },
];

const CHIPS = ['Open seating', 'Vibrant community', 'Budget-friendly'];

const COMMITMENTS = [
  ['Sustainable', 'Practices that keep our footprint small.'],
  ['Local', 'Supporting initiatives across Multan.'],
  ['Community', 'Events that connect members to each other.'],
];

function Stat({ to, suffix, label, delay = 0 }) {
  return (
    <Reveal delay={delay} className="flex flex-col">
      <dt className="label order-2 mt-1 text-graphite">{label}</dt>
      <dd className="order-1 text-5xl font-semibold tracking-tight">
        <Counter to={to} suffix={suffix} />
      </dd>
    </Reveal>
  );
}

export function Coworking() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);

  return (
    <Page
      title="Best Coworking Space in Multan"
      description="Affordable coworking space in Multan for freelancers, entrepreneurs and startups. High-speed internet, meeting rooms, free parking — book by the hour, day or week."
    >
      <section ref={heroRef} className="relative flex min-h-[640px] items-end overflow-hidden pb-6 pt-32 md:h-[94vh] md:pb-10">
        <motion.img
          style={{ scale: imgScale }}
          src={IMG.hotDesks}
          alt="The Let's Work coworking floor with green-divider desks"
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/30" />
        <div className="wrap relative grid gap-6 lg:grid-cols-12 lg:items-end">
          <Intro delay={0.4} className="glass rounded-[32px] p-6 md:p-9 lg:col-span-7">
            <Eyebrow num="01">Coworking Space</Eyebrow>
            <SplitWords as="h1" onMount delay={0.55} text="Best coworking space *in Multan.*" className="t-h1 mt-4" />
            <p className="mt-5 max-w-lg text-lg text-ink/75">
              A state-of-the-art floor designed for entrepreneurs, freelancers and startups. Pick any open seat, plug in
              and get going — by the hour, day or week.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={waLink(MSG)}>Book a seat</Button>
              <Button href={CONTACT.tel} variant="ghost" icon={Phone}>
                Call us
              </Button>
            </div>
          </Intro>
          <ul className="flex flex-wrap gap-2 lg:col-span-4 lg:col-start-9 lg:flex-col lg:items-end">
            {CHIPS.map((c, i) => (
              <Intro as="li" key={c} delay={0.9 + i * 0.1} className="glass-dark rounded-full px-5 py-2.5 text-cream">
                {c}
              </Intro>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap sec grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow>Affordable coworking in Multan</Eyebrow>
          <SplitWords text="Big-office facilities. *Small-office price.*" className="t-h2 mt-4" />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal as="p" className="t-lead">
            A vibrant community and modern amenities at budget-friendly rates — so you spend on growing the business, not
            on rent, furniture and internet bills.
          </Reveal>
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/10 pt-6">
            <Stat to={25} suffix="K+" label="Projects completed" />
            <Stat to={24} suffix="/7" label="Customer support" delay={0.08} />
          </dl>
        </div>
      </section>

      <section className="wrap pb-16 md:pb-24" aria-labelledby="why-title">
        <SplitWords id="why-title" text="Why choose *Let's Work?*" className="t-h2 mb-10" />
        <StackCards items={WHY} />
        <Bridge className="mt-16">All of this comes with your seat — here's the full list.</Bridge>
      </section>

      <AmenityBand />

      <section className="wrap sec grid gap-10 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Our commitment</Eyebrow>
          <p className="mt-5 text-[clamp(1.5rem,1.15rem+1.2vw,2.2rem)] font-medium leading-[1.15] tracking-tight">
            We care about the <span className="accent">city</span> outside the window too.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
          {COMMITMENTS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="rounded-[24px] bg-paper p-6">
              <p className="text-xl font-semibold tracking-tight">{t}</p>
              <p className="mt-2 text-sm text-graphite">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <FaqSection items={[FAQS.amenities, FAQS.terms, FAQS.trial, FAQS.where]} className="pt-0 md:pt-0" />
      <RelatedSpaces currentId="coworking" />
      <CtaBand message={MSG} />
    </Page>
  );
}
