import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { PAGES } from '../data/seo.js';
import { CONTACT, TOUR_MSG, waLink } from '../data/site.js';
import { Page } from '../components/layout/Page.jsx';
import { SplitWords } from '../components/ui/SplitWords.jsx';
import { Intro } from '../components/ui/PageIntro.jsx';
import { Eyebrow } from '../components/ui/Eyebrow.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { WhatsAppIcon } from '../components/ui/Icons.jsx';
import { ContactForm } from '../components/contact/ContactForm.jsx';

const CHANNELS = [
  { icon: Phone, label: 'Call', value: CONTACT.phoneDisplay, href: CONTACT.tel, tone: 'bg-ink text-cream' },
  { icon: WhatsAppIcon, label: 'WhatsApp', value: 'Chat with the front desk', href: waLink(TOUR_MSG), tone: 'bg-sun text-on-sun' },
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, tone: 'glass' },
  { icon: MapPin, label: 'Visit', value: CONTACT.address, href: CONTACT.mapLink, tone: 'glass' },
];

export function Contact() {
  return (
    <Page seo={PAGES.contact}>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 size-[520px] rounded-full bg-sun/30 blur-[120px]" />
        <div className="wrap relative grid gap-10 pb-16 pt-32 md:pb-24 md:pt-40 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Intro delay={0.4}>
              <Eyebrow dot>We reply fast</Eyebrow>
            </Intro>
            <SplitWords as="h1" onMount delay={0.5} text="Let's talk *work.*" className="t-display mt-6" />
            <Intro as="p" delay={0.9} className="t-lead mt-6 max-w-md">
              Contact us for fast, reliable service. Ask about a space, book a free tour, or just come by and see the space.
            </Intro>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {CHANNELS.map(({ icon: Icon, label, value, href, tone }, i) => {
                const external = href.startsWith('http');
                return (
                  <Intro as="li" key={label} delay={1 + i * 0.08}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`group flex h-full flex-col rounded-[24px] p-5 transition-transform duration-500 hover:-translate-y-1 ${tone}`}
                    >
                      <span className="flex items-center justify-between">
                        <Icon size={22} aria-hidden="true" />
                        <ArrowUpRight size={18} className="opacity-40 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100" aria-hidden="true" />
                      </span>
                      <span className="label mt-8 opacity-60">{label}</span>
                      <span className="mt-1 font-semibold leading-snug">{value}</span>
                    </a>
                  </Intro>
                );
              })}
            </ul>
          </div>
          <Intro delay={0.8} className="lg:col-span-7">
            <ContactForm />
          </Intro>
        </div>
      </section>

      {/* full-bleed map: edge to edge, with the address card kept on the page's content grid */}
      <section className="relative" aria-label="Map">
        <iframe
          title="Map showing Let's Work at Nandla Chowk, Shuhada Road, Multan"
          src={CONTACT.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[440px] w-full grayscale-[0.6] md:h-[560px]"
        />
        <div className="wrap pointer-events-none absolute inset-x-0 bottom-4 md:bottom-8">
          <Reveal className="glass pointer-events-auto max-w-xs rounded-[22px] p-5">
            <p className="label text-graphite">Let's Work coworking space</p>
            <p className="mt-1 text-lg font-semibold leading-snug">{CONTACT.address}</p>
            <a href={CONTACT.mapLink} target="_blank" rel="noopener noreferrer" className="ulink mt-3 inline-block text-sm font-semibold">
              Get directions →
            </a>
          </Reveal>
        </div>
      </section>

    </Page>
  );
}
