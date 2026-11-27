import { IMG } from '../../data/site.js';
import { PAGES } from '../../data/seo.js';
import { PAGE_FAQS } from '../../data/faqs.js';
import { Page } from '../../components/layout/Page.jsx';
import { SplitWords } from '../../components/ui/SplitWords.jsx';
import { Eyebrow } from '../../components/ui/Eyebrow.jsx';
import { Reveal } from '../../components/ui/Reveal.jsx';
import { Bridge } from '../../components/ui/Bridge.jsx';
import { Counter } from '../../components/ui/Counter.jsx';
import { StackCards } from '../../components/service/StackCards.jsx';
import { AmenityBand } from '../../components/sections/AmenityBand.jsx';
import { FaqSection } from '../../components/sections/FaqSection.jsx';
import { RelatedSpaces } from '../../components/sections/RelatedSpaces.jsx';
import { CtaBand } from '../../components/sections/CtaBand.jsx';
import { ServicePlans } from '../../components/sections/ServicePlans.jsx';
import { SOLO_PLANS } from '../../data/plans.js';
import { CoworkingBanner } from '../../components/banners/CoworkingBanner.jsx';

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
    kicker: 'What’s included',
    title: 'Everything a big office has.',
    text: 'High-speed internet, ergonomic furniture, private lockers and fully equipped meeting rooms.',
    image: IMG.boardroom,
    tone: 'bg-ink text-cream',
  },
  {
    kicker: 'Dynamic community',
    title: 'People worth sitting next to.',
    text: 'Networking, skill-sharing sessions and collaborative projects with freelancers, founders and teams.',
    image: IMG.lounge,
    tone: 'bg-sun text-on-sun',
  },
];


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

  return (
    <Page seo={PAGES.coworking}>
      <CoworkingBanner message={MSG} />

      <section className="wrap sec grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow>Affordable coworking in Multan</Eyebrow>
          <SplitWords text="Big-office facilities. *Small-office price.*" className="t-h2 mt-4" />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal as="p" className="t-lead">
            Good people, a proper desk and one fair monthly price — so your money goes into the business, not into
            rent, furniture and internet bills.
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

      <ServicePlans
        id="coworking"
        eyebrow="Monthly plans"
        title="Pick your *coworking plan.*"
        intro="Silver is a flexible seat on the shared floor. Gold and Diamond give you a desk that's yours every day."
        plans={SOLO_PLANS}
        kind="solo"
        details={[
          'A 1-month security deposit applies to all plans.',
          'Tea is available at extra charge.',
          '5G internet comes with every plan.',
          'Visit first — book a free tour, no commitment.',
        ]}
        askMessage="Hi Let's Work! I have a question about your coworking plans."
      />
      <FaqSection items={PAGE_FAQS.coworking} />
      <RelatedSpaces currentId="coworking" />
      <CtaBand message={MSG} />
    </Page>
  );
}
