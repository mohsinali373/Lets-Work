import { CONTACT, waLink } from '../../data/site.js';
import { Faq } from '../ui/Faq.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { WhatsAppIcon } from '../ui/Icons.jsx';

/**
 * FAQ with a sticky "ask a human" card beside it.
 * @param {{ items: {q: string, a: string}[], title?: string, className?: string }} props
 */
export function FaqSection({ items, title = 'Questions people *actually* ask us.', className = '' }) {
  return (
    <section className={`wrap sec grid gap-10 md:grid-cols-12 ${className}`} aria-label="Frequently asked questions">
      <div className="md:col-span-5">
        <div className="md:sticky md:top-28">
          <SplitWords text={title} className="t-h2 max-w-md" />
          <Reveal className="glass mt-8 max-w-sm rounded-[24px] p-6" delay={0.1}>
            <p className="font-medium">Didn't see your question?</p>
            <p className="mt-1 text-sm text-graphite">
              Message us — a real person at the front desk replies, not a bot.
            </p>
            <a
              href={waLink("Hi Let's Work, I have a question:")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-ink-soft"
            >
              <WhatsAppIcon size={16} className="text-sun" /> {CONTACT.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </div>
      <Reveal className="md:col-span-7" delay={0.1}>
        <Faq items={items} />
      </Reveal>
    </section>
  );
}
