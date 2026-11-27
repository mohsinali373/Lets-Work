import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../data/services.js';
import { Reveal } from '../ui/Reveal.jsx';
import { ScrollTilt } from '../ui/ScrollTilt.jsx';
import { sized } from '../../data/imageSizes.js';

/**
 * "Other ways to work here" — the remaining four spaces as photo cards.
 * @param {{ currentId: string, title?: string }} props
 */
export function RelatedSpaces({ currentId, title = 'Not quite it? Try one of these.' }) {
  const others = SERVICES.filter((s) => s.id !== currentId);
  return (
    <section className="wrap sec-tight">
      <div className="flex items-end justify-between gap-6">
        <h2 className="t-h3 max-w-md">{title}</h2>
        <Link to="/spaces" className="ulink label shrink-0">
          Compare all
        </Link>
      </div>
      <ScrollTilt className="mt-8" from={20}>
      <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {others.map((s, i) => (
          <Reveal as="li" key={s.id} delay={i * 0.07}>
            <Link to={s.path} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-cream-deep">
                <img
                  {...sized(s.thumb)}
                  alt={`${s.name} at Let's Work`} title={`${s.name} at Let's Work`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-110"
                />
                <span className="glass absolute right-3 top-3 grid size-10 place-items-center rounded-full text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 font-semibold tracking-tight">{s.name}</p>
              <p className="label text-graphite">{s.tag}</p>
            </Link>
          </Reveal>
        ))}
      </ul>
      </ScrollTilt>
    </section>
  );
}
