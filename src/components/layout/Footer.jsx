import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Phone } from 'lucide-react';
import { CONTACT, IMG, SOCIAL, TOUR_MSG, waLink } from '../../data/site.js';
import { SERVICES } from '../../data/services.js';
import { Button } from '../ui/Button.jsx';

const COMPANY = [
  { label: 'All spaces', to: '/spaces' },
  { label: 'About us', to: '/about-us' },
  { label: 'Contact', to: '/contact-us' },
  { label: 'Privacy policy', to: '/privacy-policy' },
];

function FooterHeading({ children }) {
  return <p className="label mb-4 text-cream/40">{children}</p>;
}

export function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const wordX = useTransform(scrollYProgress, [0, 1], ['-8%', '0%']);

  return (
    <footer ref={ref} className="relative z-[1] overflow-hidden bg-ink text-cream">
      <div className="wrap pt-16 md:pt-24">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={IMG.logo} alt="Let's Work" width="2740" height="490" className="h-8 w-auto" loading="lazy" />
            <h2 className="mt-8 max-w-md text-3xl font-semibold leading-[1.05] tracking-tight md:text-[2.6rem]">
              That's a lot of scrolling for someone who <span className="accent text-sun">could be working</span> here.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={waLink(TOUR_MSG)}>Book a free tour</Button>
              <Button href={CONTACT.tel} variant="glass" icon={Phone}>
                Call us
              </Button>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <FooterHeading>Spaces</FooterHeading>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={s.path} className="ulink text-cream/75 hover:text-cream">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-2.5">
              {COMPANY.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="ulink text-cream/75 hover:text-cream">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <FooterHeading>Visit</FooterHeading>
            <address className="space-y-2.5 not-italic text-cream/75">
              <a href={CONTACT.mapLink} target="_blank" rel="noopener noreferrer" className="ulink block hover:text-cream">
                {CONTACT.address}
              </a>
              <a href={CONTACT.tel} className="ulink block hover:text-cream">
                {CONTACT.phoneDisplay}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="ulink block hover:text-cream">
                {CONTACT.email}
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="ulink block hover:text-cream">
                WhatsApp us
              </a>
            </address>
            {SOCIAL.length > 0 && (
              <ul className="mt-5 flex gap-3">
                {SOCIAL.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="ulink text-sm text-cream/60">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <motion.p
        aria-hidden="true"
        style={{ x: wordX }}
        className="pointer-events-none select-none whitespace-nowrap pt-6 text-center text-[22vw] font-semibold leading-[0.78] tracking-[-0.065em] text-white/[0.07]"
      >
        let's<span className="text-sun/80">work</span>
      </motion.p>

      <div className="wrap flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-cream/45 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Let's Work Coworking Space, Multan. All rights reserved.</p>
        <p>
          Developed by{' '}
          <a href="https://seomasters.pk" target="_blank" rel="noopener noreferrer" className="ulink text-cream/70">
            SEO Masters
          </a>
        </p>
      </div>
    </footer>
  );
}
