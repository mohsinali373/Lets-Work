import { FLEX_TERMS } from '../../data/services.js';
import { Reveal } from '../ui/Reveal.jsx';
import { ScrollTilt } from '../ui/ScrollTilt.jsx';

/**
 * Hour / Day / Week tiles — the "no lease" hook that appears on several pages.
 * @param {{ dark?: boolean, className?: string }} props
 */
export function FlexTerms({ dark = false, className = '' }) {
  const tile = dark ? 'glass-dark text-cream' : 'glass';
  const sub = dark ? 'text-cream/55' : 'text-graphite';
  return (
    <div className={className}>
      <ScrollTilt from={18}>
      <ul className="grid gap-3 sm:grid-cols-3">
        {FLEX_TERMS.map((t, i) => (
          <Reveal as="li" key={t.unit} delay={i * 0.08} className={`${tile} group rounded-[24px] p-6 transition-transform duration-500 hover:-translate-y-1`}>
            <p className="label opacity-50">Book by the</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight">
              {t.unit}
              <span className="text-sun">.</span>
            </p>
            <p className={`mt-3 text-sm ${sub}`}>{t.line}</p>
          </Reveal>
        ))}
      </ul>
      </ScrollTilt>
      <p className={`mt-4 text-sm ${sub}`}>No long-term commitment. No hidden fees. You pay only for the time you use.</p>
    </div>
  );
}
