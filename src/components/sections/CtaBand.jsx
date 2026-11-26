import { Phone } from 'lucide-react';
import { CONTACT, TOUR_MSG, waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { Reveal } from '../ui/Reveal.jsx';

/**
 * Closing call-to-action: a calm, full-width yellow band — headline, one line, two buttons.
 * @param {{ title?: string, text?: string, message?: string }} props
 */
export function CtaBand({
  title = 'Your desk is *waiting.* Come see it first.',
  text = 'Walk the floor, try the chairs, ask anything. No pressure, no paperwork.',
  message = TOUR_MSG,
}) {
  return (
    <section className="relative overflow-hidden bg-sun text-ink" aria-label="Book a free tour">
      <div className="wrap grid gap-8 py-14 md:grid-cols-12 md:items-center md:py-20">
        <div className="md:col-span-7">
          <p className="label text-ink/60">Free tour · no commitment</p>
          <SplitWords text={title} className="t-h2 mt-4 max-w-xl" />
          <Reveal as="p" className="mt-4 max-w-md text-lg text-ink/70" delay={0.1}>
            {text}
          </Reveal>
        </div>
        <Reveal className="flex flex-wrap gap-3 md:col-span-5 md:justify-end" delay={0.15}>
          <Button href={waLink(message)} variant="ink">
            Book on WhatsApp
          </Button>
          {/* on phones the floating call button already covers this */}
          <Button href={CONTACT.tel} variant="ghost" icon={Phone} className="hidden sm:inline-flex">
            {CONTACT.phoneDisplay}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
