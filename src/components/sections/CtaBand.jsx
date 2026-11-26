import { ArrowUpRight, Phone } from 'lucide-react';
import { CONTACT, TOUR_MSG, waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { RotatingBadge } from '../ui/RotatingBadge.jsx';

/**
 * Closing yellow call-to-action used at the bottom of most pages.
 * @param {{ title?: string, text?: string, message?: string }} props
 */
export function CtaBand({
  title = 'Your desk is *waiting.* Come see it first.',
  text = 'Drop by Nandla Chowk, walk the floor, sit in the chairs, ask your questions. No pressure, no paperwork.',
  message = TOUR_MSG,
}) {
  return (
    <section className="relative overflow-hidden bg-sun text-ink" aria-label="Book a tour">
      <div className="wrap sec relative grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="label mb-6">( Free tour — no commitment )</p>
          <SplitWords text={title} className="t-display max-w-4xl" />
        </div>
        <Reveal className="md:col-span-4" delay={0.15}>
          <p className="text-lg leading-relaxed text-ink/75">{text}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={waLink(message)} variant="ink">
              Book on WhatsApp
            </Button>
            <Button href={CONTACT.tel} variant="ghost" icon={Phone}>
              {CONTACT.phoneDisplay}
            </Button>
          </div>
          <p className="mt-6 text-sm text-ink/60">
            New here? Ask about our <span className="accent text-base text-ink">trial offer</span> for new members.
          </p>
        </Reveal>
      </div>
      <RotatingBadge
        text="FREE TOUR • NANDLA CHOWK • MULTAN • "
        className="absolute -right-10 -top-10 hidden size-44 text-ink/70 lg:grid"
        center={<ArrowUpRight size={28} className="rotate-90" aria-hidden="true" />}
      />
    </section>
  );
}
