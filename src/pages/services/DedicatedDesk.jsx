import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { IMG } from '../../data/site.js';
import { FAQS } from '../../data/faqs.js';
import { Page } from '../../components/layout/Page.jsx';
import { SplitWords } from '../../components/ui/SplitWords.jsx';
import { Eyebrow } from '../../components/ui/Eyebrow.jsx';
import { Reveal } from '../../components/ui/Reveal.jsx';
import { Bridge } from '../../components/ui/Bridge.jsx';
import { CheckList } from '../../components/service/CheckList.jsx';
import { FlexTerms } from '../../components/sections/FlexTerms.jsx';
import { FaqSection } from '../../components/sections/FaqSection.jsx';
import { RelatedSpaces } from '../../components/sections/RelatedSpaces.jsx';
import { CtaBand } from '../../components/sections/CtaBand.jsx';
import { ScrollTilt } from '../../components/ui/ScrollTilt.jsx';
import { ServicePlans } from '../../components/sections/ServicePlans.jsx';
import { SOLO_PLANS } from '../../data/plans.js';
import { DedicatedDeskBanner } from '../../components/banners/DedicatedDeskBanner.jsx';

const MSG = "Hi Let's Work! I'd like to reserve a dedicated desk. What's available?";

const YOURS = ['Your own desk, every day', 'An ergonomic chair set the way you like it', 'A private locker for your things', 'A spot people can find you at'];
const SHARED = ['Meeting rooms when you need them', 'High-speed internet', 'Printing and refreshments', 'Networking events and the community', 'Free parking'];

const BENEFITS = [
  { title: 'Professional and private workspace', text: 'Fully furnished — desk, chair and high-speed internet, ready when you are.' },
  { title: 'Daily access to your personal desk', text: 'Same seat every morning. No hunting for a free spot.' },
  { title: 'Secure storage', text: 'Leave your laptop and files locked away overnight.' },
  { title: 'Meeting room access', text: 'Step into a proper room for calls and client meetings.' },
  { title: 'Networking', text: 'Work alongside entrepreneurs, freelancers and businesses of all sizes.' },
];

function SideCard({ title, items, dark, delay }) {
  return (
    <Reveal delay={delay} className={`rounded-[30px] p-7 md:p-9 ${dark ? 'bg-ink text-cream' : 'bg-sun text-on-sun'}`}>
      <p className="label opacity-60">{dark ? 'Only yours' : 'Shared with the community'}</p>
      <h3 className="t-h3 mt-3">{title}</h3>
      <ul className="mt-6 space-y-3">
        {items.map((it) => (
          <li key={it} className={`flex items-center gap-3 border-b pb-3 last:border-0 ${dark ? 'border-white/10' : 'border-ink/12'}`}>
            <span className={`size-2 shrink-0 rounded-full ${dark ? 'bg-sun' : 'bg-ink'}`} aria-hidden="true" />
            {it}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function DedicatedDesk() {
  const stripRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stripRef, offset: ['start end', 'end start'] });
  const stripY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <Page
      title="Dedicated Desk Coworking Space in Multan"
      description="Claim your own desk at Let's Work Multan — personal desk, secure storage, high-speed internet and meeting room access. Book by the hour, day or week."
    >
      <DedicatedDeskBanner message={MSG} />

      <div ref={stripRef} className="wrap">
        <div className="relative h-[44vh] min-h-[300px] overflow-hidden rounded-[34px] md:h-[62vh]">
          <motion.img style={{ y: stripY, scale: 1.25 }} src={IMG.floorLong} alt="Rows of desks on the Let's Work floor" title="Rows of desks on the Let's Work floor" loading="lazy" className="size-full object-cover" />
          <span className="glass absolute bottom-5 left-5 rounded-full px-4 py-2 text-sm font-medium">Fully furnished · ready on day one</span>
        </div>
      </div>

      <section className="wrap sec">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <SplitWords text="What's yours. *What's shared.*" className="t-h2 md:col-span-7" />
          <Reveal as="p" className="text-graphite md:col-span-4 md:col-start-9">
            A dedicated desk gives you the privacy of your own spot with everything the coworking floor offers.
          </Reveal>
        </div>
        <ScrollTilt from={18}>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <SideCard title="Yours, every day" items={YOURS} dark />
          <SideCard title="Ours, to share" items={SHARED} delay={0.1} />
        </div>
        </ScrollTilt>
        <Bridge className="mt-16">And you're never locked in.</Bridge>
      </section>

      <section className="wrap pb-16 md:pb-24">
        <FlexTerms />
      </section>

      <section className="bg-paper">
        <div className="wrap sec grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Eyebrow>Benefits of a dedicated desk in Multan</Eyebrow>
            <SplitWords text="The best dedicated desk *in Multan.*" className="t-h2 mt-4" />
            <div className="mt-8">
              <CheckList items={BENEFITS} />
            </div>
          </div>
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[32px] lg:col-span-5 lg:col-start-8">
            <img
              src={IMG.desksTall2}
              alt="Dedicated desks on the Let's Work floor" title="Dedicated desks on the Let's Work floor"
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <span className="glass absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-medium">Our actual floor</span>
          </Reveal>
        </div>
      </section>

      <ServicePlans
        id="dedicated"
        eyebrow="Monthly plans"
        title="Your own desk, *every month.*"
        intro="Gold gives you a dedicated fixed desk. Diamond adds a premium desk, client meeting access and VIP networking."
        plans={SOLO_PLANS.filter((p) => p.id === 'gold' || p.id === 'diamond')}
        kind="solo"
        details={[
          'A 1-month security deposit applies to all plans.',
          'Tea/coffee & printing are available at extra charges.',
          '5G internet comes with every plan.',
          'Visit first — book a free tour, no commitment.',
        ]}
        askMessage="Hi Let's Work! I have a question about your dedicated desk plans."
      />
      <FaqSection items={[FAQS.terms, FAQS.amenities, FAQS.customize, FAQS.tour]} />
      <RelatedSpaces currentId="dedicated" />
      <CtaBand title="Claim *your* desk before someone else does." message={MSG} />
    </Page>
  );
}
