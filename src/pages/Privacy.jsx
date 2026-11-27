import { ShieldCheck } from 'lucide-react';
import { PAGES } from '../data/seo.js';
import { CONTACT } from '../data/site.js';
import { Page } from '../components/layout/Page.jsx';
import { SplitWords } from '../components/ui/SplitWords.jsx';
import { Eyebrow } from '../components/ui/Eyebrow.jsx';
import { Intro } from '../components/ui/PageIntro.jsx';

const SECTIONS = [
  {
    h: 'What we collect',
    p: 'When you contact us by phone, WhatsApp, email or the enquiry form, we receive the details you choose to share — usually your name, phone number, email address and what kind of workspace you are interested in.',
  },
  {
    h: 'How we use it',
    p: 'Only to reply to you, arrange tours and bookings, and manage your membership. We do not sell or rent your personal information to anyone.',
  },
  {
    h: 'WhatsApp and third parties',
    p: "Our enquiry form opens WhatsApp with your message pre-written. Messages sent through WhatsApp are handled under WhatsApp's own privacy policy. Our map is provided by Google Maps.",
  },
  {
    h: 'Cookies',
    p: 'This website does not use advertising cookies. Embedded services such as Google Maps may set their own cookies when you interact with them.',
  },
  {
    h: 'Keeping your data',
    p: 'We keep enquiry details only as long as needed to respond and to run your membership, then delete them.',
  },
  {
    h: 'Your choices',
    p: `You can ask us what information we hold about you, or ask us to correct or delete it, at any time by emailing ${CONTACT.email} or calling ${CONTACT.phoneDisplay}.`,
  },
];

export function Privacy() {
  return (
    <Page seo={PAGES.privacy}>
      {/* banner: a quiet dark band with the short version and a jump list */}
      <section className="bg-ink text-cream">
        <div className="wrap pb-14 pt-32 md:pb-16 md:pt-40">
          <Intro delay={0.3} className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-sun text-on-sun">
              <ShieldCheck size={18} aria-hidden="true" />
            </span>
            <Eyebrow className="text-cream/60">Last updated · November 2026</Eyebrow>
          </Intro>
          <SplitWords as="h1" onMount delay={0.45} text="Privacy, *plainly.*" className="t-display mt-6 [&_.accent]:text-sun" />
          <Intro as="p" delay={0.75} className="mt-5 max-w-md text-lg text-cream/70">
            The short version: we use your details to reply to you, and that's it.
          </Intro>
          <Intro as="ul" delay={0.9} className="mt-10 flex flex-wrap gap-2">
            {SECTIONS.map((s, i) => (
              <li key={s.h}>
                <a href={`#privacy-${i + 1}`} className="block rounded-full border border-white/15 px-4 py-2 text-sm text-cream/80 transition-colors hover:border-sun hover:text-sun">
                  <span className="mr-1.5 font-mono text-xs text-sun">0{i + 1}</span>
                  {s.h}
                </a>
              </li>
            ))}
          </Intro>
        </div>
      </section>

      <section className="wrap pb-20 pt-6">
        <div className="mx-auto max-w-3xl">
          {SECTIONS.map((s, i) => (
            <article key={s.h} id={`privacy-${i + 1}`} className="scroll-mt-28 border-b border-ink/12 py-9">
              <p className="label text-graphite">0{i + 1}</p>
              <h2 className="t-h3 mt-3">{s.h}</h2>
              <p className="mt-3 text-lg leading-relaxed text-graphite">{s.p}</p>
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}
