import { CONTACT } from '../data/site.js';
import { Page } from '../components/layout/Page.jsx';
import { SplitWords } from '../components/ui/SplitWords.jsx';
import { Eyebrow } from '../components/ui/Eyebrow.jsx';

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
    <Page title="Privacy Policy" description="How Let's Work coworking space in Multan collects and uses your information.">
      <section className="wrap grid gap-10 pb-20 pt-32 md:pt-40 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Last updated · November 2026</Eyebrow>
            <SplitWords as="h1" onMount delay={0.4} text="Privacy, *plainly.*" className="t-h1 mt-5" />
            <p className="mt-5 text-graphite">The short version: we use your details to reply to you, and that's it.</p>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {SECTIONS.map((s, i) => (
            <article key={s.h} className="border-t border-ink/12 py-8">
              <p className="label text-graphite">0{i + 1}</p>
              <h2 className="t-h3 mt-3">{s.h}</h2>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-graphite">{s.p}</p>
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}
