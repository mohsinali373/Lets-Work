import { ArrowUpRight, CalendarClock, Car, Coffee, Phone } from 'lucide-react';
import { CONTACT, IMG, TOUR_MSG, waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { RotatingBadge } from '../ui/RotatingBadge.jsx';

const HOOKS = [
  { icon: Car, text: 'Free parking' },
  { icon: Coffee, text: 'Chai on call' },
  { icon: CalendarClock, text: 'Hour · Day · Week' },
];

/**
 * Closing call-to-action: a compact dark card with the offer, two buttons and a real photo.
 * @param {{ title?: string, text?: string, message?: string }} props
 */
export function CtaBand({
  title = 'Your desk is *waiting.* Come see it first.',
  text = 'Walk the floor, try the chairs, ask anything. No pressure, no paperwork.',
  message = TOUR_MSG,
}) {
  return (
    <section className="wrap py-14 md:py-20" aria-label="Book a free tour">
      <Reveal className="relative grid overflow-hidden rounded-[32px] bg-ink text-cream shadow-[0_40px_80px_-40px_rgba(17,17,17,0.6)] md:grid-cols-[1.25fr_1fr]">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-sun/20 blur-[90px]" />

        <div className="relative p-7 md:p-10 lg:p-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs font-medium">
            <span className="relative flex size-2">
              <span className="ping-soft absolute inset-0 rounded-full bg-sun" />
              <span className="relative size-2 rounded-full bg-sun" />
            </span>
            Free tour · no commitment
          </p>
          <SplitWords text={title} className="t-h2 mt-5 max-w-lg [&_.accent]:text-sun" />
          <p className="mt-4 max-w-md text-cream/65">{text}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={waLink(message)}>Book on WhatsApp</Button>
            <Button href={CONTACT.tel} variant="glass" icon={Phone}>
              {CONTACT.phoneDisplay}
            </Button>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2">
            {HOOKS.map(({ icon: Icon, text: hook }) => (
              <li key={hook} className="flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-sm text-cream/80">
                <Icon size={14} className="text-sun" aria-hidden="true" />
                {hook}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[220px] md:min-h-full">
          <img src={IMG.hotDesks} alt="Hot desks at Let's Work" loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent md:bg-gradient-to-r md:from-ink/90 md:via-ink/20" />
          <p className="glass absolute bottom-4 right-4 rounded-full px-3 py-1.5 text-xs font-medium text-ink">Real photo · Nandla Chowk</p>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a free tour on WhatsApp"
            className="absolute right-4 top-4 rounded-full bg-sun text-ink transition-transform duration-500 hover:scale-105"
          >
            <RotatingBadge text="BOOK A FREE TOUR • BOOK A FREE TOUR • " className="size-24" center={<ArrowUpRight size={22} aria-hidden="true" />} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
