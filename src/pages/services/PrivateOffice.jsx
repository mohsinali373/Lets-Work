import { CONTACT, IMG, waLink } from '../../data/site.js';
import { FAQS } from '../../data/faqs.js';
import { FLEX_TERMS } from '../../data/services.js';
import { Page } from '../../components/layout/Page.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { SplitWords } from '../../components/ui/SplitWords.jsx';
import { Intro } from '../../components/ui/PageIntro.jsx';
import { Eyebrow } from '../../components/ui/Eyebrow.jsx';
import { Reveal } from '../../components/ui/Reveal.jsx';
import { HorizontalScroll } from '../../components/service/HorizontalScroll.jsx';
import { FaqSection } from '../../components/sections/FaqSection.jsx';
import { RelatedSpaces } from '../../components/sections/RelatedSpaces.jsx';
import { CtaBand } from '../../components/sections/CtaBand.jsx';
import { ScrollTilt } from '../../components/ui/ScrollTilt.jsx';
import { ServicePlans } from '../../components/sections/ServicePlans.jsx';
import { TEAM_PLANS } from '../../data/plans.js';

const MSG = "Hi Let's Work! I'm interested in a private office. Can we talk about options?";

const GETS = [
  { n: '01', title: 'A dedicated, quiet workspace', text: 'A door that closes. Calls without background noise, focus without interruptions.' },
  { n: '02', title: 'A professional address for client meetings', text: 'Bring clients to an office that looks the part — reception, meeting rooms and all.' },
  { n: '03', title: 'A network of like-minded businesses', text: 'Your neighbours are founders and teams who might become partners, clients or friends.' },
];

const panel = 'relative flex shrink-0 flex-col overflow-hidden rounded-[30px] lg:h-[62vh] lg:w-[min(560px,42vw)]';

export function PrivateOffice() {
  return (
    <Page
      title="Private Office Space in Multan"
      description="Fully furnished, serviced private offices in Multan for individuals and teams. Quiet, secure and flexible — book by the hour, day or week."
    >
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-cream md:pb-24 md:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 size-[520px] rounded-full bg-sun/15 blur-[120px]" />
        <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Intro delay={0.4}>
              <Eyebrow num="03" className="text-sun">Private Office</Eyebrow>
            </Intro>
            <SplitWords as="h1" onMount delay={0.5} text="Private office space *in Multan.*" className="t-display mt-6" />
            <Intro as="p" delay={0.9} className="mt-7 max-w-lg text-lg text-cream/65">
              Escape the distractions of cafés and home offices. A professional, secure environment for individuals and
              teams — fully furnished, fully serviced.
            </Intro>
            <Intro delay={1} className="mt-8 flex flex-wrap gap-3">
              <Button href={waLink(MSG)}>Ask about offices</Button>
              <Button href={CONTACT.tel} variant="glass" icon={null} className="hidden sm:inline-flex">
                {CONTACT.phoneDisplay}
              </Button>
            </Intro>
          </div>
          <Intro delay={0.7} className="relative lg:col-span-5 lg:col-start-8">
            <div className="absolute -bottom-4 -right-4 inset-0 rounded-[34px] bg-sun md:-bottom-5 md:-right-5" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[34px]">
              <img src={IMG.privateOffice} alt="A private office at Let's Work with desk and yellow feature wall" fetchPriority="high" className="size-full object-cover" />
            </div>
            <p className="glass-dark absolute -left-4 bottom-8 rounded-2xl px-5 py-3 md:-left-10">
              <span className="label block text-sun">Included</span>
              Furnished &amp; serviced
            </p>
          </Intro>
        </div>
      </section>

      <section className="wrap sec">
        <SplitWords text="What a private office *actually* gets you." className="t-h2 max-w-3xl" />
        <ScrollTilt from={18}>
        <ul className="mt-10 border-b border-ink/12">
          {GETS.map((g, i) => (
            <Reveal as="li" key={g.n} delay={i * 0.08} className="group grid gap-3 border-t border-ink/12 py-8 transition-colors duration-500 hover:bg-sun/15 md:grid-cols-12 md:items-baseline md:px-4">
              <span className="font-mono text-5xl font-medium text-ink/20 transition-colors group-hover:text-sun-deep md:col-span-2 md:text-6xl">{g.n}</span>
              <h3 className="t-h3 md:col-span-5">{g.title}</h3>
              <p className="text-graphite md:col-span-4 md:col-start-9">{g.text}</p>
            </Reveal>
          ))}
        </ul>
        </ScrollTilt>
      </section>

      <section className="bg-cream-deep">
        <HorizontalScroll
          heading={
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SplitWords text="Rent a private office in our *modern* facility." className="t-h2 max-w-2xl" />
              <p className="label hidden text-graphite lg:block">Scroll →</p>
            </div>
          }
        >
          <div className={`${panel} bg-ink p-8 text-cream`}>
            <span className="label text-sun">(01) Productive workspace</span>
            <p className="t-h2 mt-auto">A quiet room built for focused work.</p>
            <p className="mt-4 text-cream/60">Desk, chairs, storage and high-speed internet — all set up before you arrive.</p>
          </div>
          <div className={`${panel} min-h-[320px]`}>
            <img src={IMG.officeDesk} alt="A furnished private office desk" loading="lazy" className="absolute inset-0 size-full object-cover" />
            <span className="glass relative m-5 self-start rounded-full px-4 py-2 text-sm font-medium">Fully furnished</span>
          </div>
          <div className={`${panel} bg-sun p-8`}>
            <span className="label">(02) Flexible rental terms</span>
            <ul className="mt-auto space-y-3">
              {FLEX_TERMS.map((t) => (
                <li key={t.unit} className="flex items-baseline justify-between gap-6 border-b border-ink/15 pb-3">
                  <span className="text-4xl font-semibold tracking-tight">{t.unit}</span>
                  <span className="text-right text-sm text-ink/70">{t.line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink/70">No long-term commitment. No hidden fees.</p>
          </div>
          <div className={`${panel} bg-paper p-8`}>
            <span className="label text-graphite">(03) Scalable solutions</span>
            <p className="t-h2 mt-auto">
              Start with one desk. <span className="accent">Grow</span> into a whole office.
            </p>
            <p className="mt-4 text-graphite">As your team grows, your space grows with it — without moving address.</p>
          </div>
          <div className={`${panel} min-h-[320px]`}>
            <img src={IMG.reception} alt="The Let's Work front office" loading="lazy" className="absolute inset-0 size-full object-cover" />
          </div>
        </HorizontalScroll>
      </section>

      <section className="wrap sec grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Eyebrow>Our commitment</Eyebrow>
          <p className="mt-5 text-[clamp(1.5rem,1.15rem+1.3vw,2.3rem)] font-medium leading-[1.12] tracking-tight">
            We're here to empower your success — with <span className="accent">flexibility</span>, room to scale and a
            community that has your back.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
          <p className="text-graphite">
            Membership includes daily access to your office, secure storage, high-speed internet, meeting room access and
            networking with other professionals.
          </p>
        </Reveal>
      </section>

      <ServicePlans
        id="private"
        eyebrow="Team plans · 6–8 persons"
        title="Private offices for *your team.*"
        intro="Three lockable offices for teams of 6 to 8 — pick the room and the level of service that fits."
        plans={TEAM_PLANS}
        kind="team"
        details={[
          'Every office is private and lockable, for 6–8 people.',
          'Full kitchen access on every plan.',
          'Tea service from once a day (Startup) to on demand (Executive).',
          'Free parking on every plan.',
        ]}
        askMessage="Hi Let's Work! I have a question about your private office team plans."
      />
      <FaqSection items={[FAQS.customize, FAQS.terms, FAQS.meetings, FAQS.tour]} />
      <RelatedSpaces currentId="private" />
      <CtaBand title="Your team deserves *a door.*" message={MSG} />
    </Page>
  );
}
