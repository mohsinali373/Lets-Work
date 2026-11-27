import { IMG } from '../../data/site.js';
import { FAQS } from '../../data/faqs.js';
import { Page } from '../../components/layout/Page.jsx';
import { SplitWords } from '../../components/ui/SplitWords.jsx';
import { Eyebrow } from '../../components/ui/Eyebrow.jsx';
import { Reveal } from '../../components/ui/Reveal.jsx';
import { Bridge } from '../../components/ui/Bridge.jsx';
import { ScrollText } from '../../components/service/ScrollText.jsx';
import { CheckList } from '../../components/service/CheckList.jsx';
import { DurationSwitcher } from '../../components/service/DurationSwitcher.jsx';
import { Steps } from '../../components/sections/Steps.jsx';
import { AmenityBand } from '../../components/sections/AmenityBand.jsx';
import { FaqSection } from '../../components/sections/FaqSection.jsx';
import { RelatedSpaces } from '../../components/sections/RelatedSpaces.jsx';
import { CtaBand } from '../../components/sections/CtaBand.jsx';
import { InstantOfficeBanner } from '../../components/banners/InstantOfficeBanner.jsx';

const MSG = "Hi Let's Work! I need an instant office. Is one available today?";

const INCLUDED = [
  { title: 'Professional, instant workspace', text: 'Fully furnished — desk, chair and high-speed internet, ready the moment you arrive.' },
  { title: 'Flexible rental terms', text: 'Book by the hour, day or week. Pay only for the time you use.' },
  { title: 'No leases, no paperwork', text: 'Skip the deposits and contracts. Message us and you are in.' },
  { title: 'Meeting room access', text: 'Step into a proper room when a client drops by.' },
];

const STEPS = [
  { title: 'Message us', text: "Tell us when you need it and for how long — an hour, a day, a week." },
  { title: 'Pick your space', text: 'We suggest what fits: a desk on the floor or a private room.' },
  { title: 'Walk in, plug in', text: 'Your office is set up and waiting. Start working the same day.' },
];

export function InstantOffice() {
  return (
    <Page
      title="Instant Shared Office Space in Multan"
      description="Instant shared office space in Multan — fully equipped and furnished, no lease, no paperwork. Book by the hour, day or week at Let's Work."
    >
      <InstantOfficeBanner message={MSG} />

      <section className="wrap sec" aria-labelledby="duration-title">
        <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow num="01">How long?</Eyebrow>
            <SplitWords id="duration-title" text="An hour, a day *or a week.*" className="t-h2 mt-4" />
          </div>
          <p className="text-graphite lg:col-span-4 lg:col-start-9">Pick how long you need it and see what that looks like.</p>
        </div>
        <Reveal>
          <DurationSwitcher />
        </Reveal>
      </section>

      <section className="bg-cream-deep">
        <div className="wrap sec">
          <Eyebrow>Best shared office space in Multan</Eyebrow>
          <ScrollText
            className="mt-6 max-w-5xl text-[clamp(1.6rem,1.15rem+1.7vw,2.7rem)] font-medium leading-[1.12] tracking-tight"
            text="An instant office gets you more than a desk. It gets you a *network* of collaborators, mentors and clients — from the day you walk in."
          />
        </div>
      </section>

      <section className="wrap sec grid gap-10 lg:grid-cols-12 lg:items-center">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[32px] lg:col-span-5">
          <img src={IMG.teamRoom} alt="A ready-to-use shared office at Let's Work" title="A ready-to-use shared office at Let's Work" loading="lazy" className="absolute inset-0 size-full object-cover" />
          <span className="glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm font-medium">Furnished &amp; ready</span>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <SplitWords text="What you get, *instantly.*" className="t-h2" />
          <p className="t-lead mt-4">Need a rental office on short notice? Book and get instant access to a fully equipped workspace.</p>
          <div className="mt-8">
            <CheckList items={INCLUDED} />
          </div>
        </div>
      </section>

      <section className="wrap pb-16 md:pb-24">
        <SplitWords text="Up and running, *fast.*" className="t-h2 mb-12" />
        <Steps steps={STEPS} />
        <Bridge className="mt-16">Plus everything our members get.</Bridge>
      </section>

      <AmenityBand title="The full kit, *from hour one.*" />
      <FaqSection items={[FAQS.terms, FAQS.amenities, FAQS.tour, FAQS.where]} />
      <RelatedSpaces currentId="instant" />
      <CtaBand title="Your office can be ready *today.*" message={MSG} text="Message us with when you need it. We'll tell you what's free and have it ready when you arrive." />
    </Page>
  );
}
