import { ArrowUpRight, Phone } from 'lucide-react';
import { CONTACT, IMG, TOUR_MSG, waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Marquee } from '../ui/Marquee.jsx';
import { RotatingBadge } from '../ui/RotatingBadge.jsx';

const STEPS = ['Message us', 'Free tour', 'Move in'];
const TICKER = ['Free parking', 'Chai on call', 'Hour · Day · Week', 'Free tour', 'No lease', 'Fast Wi-Fi', 'Nandla Chowk, Multan'];

/**
 * Closing call-to-action: full-width dark band — offer on the left, real photos on the right,
 * and a yellow ticker of hooks along the bottom.
 * @param {{ title?: string, text?: string, message?: string }} props
 */
export function CtaBand({
  title = 'Your desk is *waiting.* Come see it first.',
  text = 'Walk the floor, try the chairs, ask anything. No pressure, no paperwork.',
  message = TOUR_MSG,
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-cream" aria-label="Book a free tour">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-0 size-[460px] rounded-full bg-sun/15 blur-[120px]" />

      <div className="relative grid lg:min-h-[520px] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-[clamp(1.25rem,4vw,2.5rem)] py-14 lg:py-16 lg:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] lg:pr-14">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs font-medium">
            <span className="relative flex size-2">
              <span className="ping-soft absolute inset-0 rounded-full bg-sun" />
              <span className="relative size-2 rounded-full bg-sun" />
            </span>
            Free tour · no commitment
          </p>
          <SplitWords text={title} className="t-h2 mt-5 max-w-xl [&_.accent]:text-sun" />
          <Reveal as="p" className="mt-4 max-w-md text-cream/65" delay={0.1}>
            {text}
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap gap-3" delay={0.15}>
            <Button href={waLink(message)}>Book on WhatsApp</Button>
            <Button href={CONTACT.tel} variant="glass" icon={Phone}>
              {CONTACT.phoneDisplay}
            </Button>
          </Reveal>

          <Reveal as="ol" className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" delay={0.2} aria-label="How it works">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-full bg-sun font-mono text-[0.7rem] font-semibold text-ink">0{i + 1}</span>
                  <span className="text-cream/80">{step}</span>
                </span>
                {i < STEPS.length - 1 && <span className="h-px w-6 bg-white/25" aria-hidden="true" />}
              </li>
            ))}
          </Reveal>
        </div>

        <div className="relative min-h-[300px] lg:min-h-full">
          <img src={IMG.hotDesks} alt="Hot desks at Let's Work, Nandla Chowk" loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/10" />
          <Reveal className="absolute bottom-6 left-6 hidden w-[38%] max-w-[240px] overflow-hidden rounded-[20px] border-4 border-ink shadow-2xl sm:block" delay={0.2}>
            <img src={IMG.lounge} alt="The Let's Work lounge" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
          <p className="glass absolute bottom-6 right-6 rounded-full px-3 py-1.5 text-xs font-medium text-ink">Real photos · our space</p>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a free tour on WhatsApp"
            className="absolute right-6 top-6 rounded-full bg-sun text-ink transition-transform duration-500 hover:scale-105"
          >
            <RotatingBadge text="BOOK A FREE TOUR • BOOK A FREE TOUR • " className="size-28" center={<ArrowUpRight size={24} aria-hidden="true" />} />
          </a>
        </div>
      </div>

      <Marquee
        items={TICKER}
        speed={34}
        className="bg-sun py-3 text-ink"
        itemClassName="text-base font-semibold tracking-tight md:text-lg"
        separator={
          <span className="mx-6" aria-hidden="true">
            ✦
          </span>
        }
      />
    </section>
  );
}
