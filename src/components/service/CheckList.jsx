import { Check } from 'lucide-react';
import { Reveal } from '../ui/Reveal.jsx';

/**
 * Bold-title checklist used for "what you get" blocks.
 * @param {{ items: {title: string, text?: string}[], dark?: boolean }} props
 */
export function CheckList({ items, dark = false }) {
  return (
    <ul className="space-y-1">
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} delay={i * 0.06} className={`flex gap-4 border-b py-4 ${dark ? 'border-white/10' : 'border-ink/10'}`}>
          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-sun text-ink">
            <Check size={15} strokeWidth={2.6} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-semibold">{it.title}</span>
            {it.text && <span className={`mt-0.5 block text-[0.95rem] ${dark ? 'text-cream/60' : 'text-graphite'}`}>{it.text}</span>}
          </span>
        </Reveal>
      ))}
    </ul>
  );
}
