import { AMENITIES } from '../../data/amenities.js';
import { Reveal } from '../ui/Reveal.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { ScrollTilt } from '../ui/ScrollTilt.jsx';

/**
 * Dark band listing every amenity — the "what's included" answer on service pages.
 * @param {{ title?: string, intro?: string }} props
 */
export function AmenityBand({
  title = 'Every plan comes with *the lot.*',
  intro = "No add-on menu, no surprise charges. Whichever seat you pick, this is what's waiting for you.",
}) {
  return (
    <section className="bg-ink text-cream">
      <div className="wrap sec">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <SplitWords text={title} className="t-h2 md:col-span-7" />
          <Reveal as="p" className="text-cream/60 md:col-span-4 md:col-start-9">
            {intro}
          </Reveal>
        </div>
        <ScrollTilt from={18}>
        <ul className="mt-12 grid overflow-hidden rounded-[28px] border border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map(({ icon: Icon, name, note }, i) => (
            <Reveal
              as="li"
              key={name}
              delay={(i % 3) * 0.06}
              className="group relative -mb-px -mr-px border-b border-r border-white/10 p-6 transition-colors duration-500 hover:bg-sun hover:text-on-sun md:p-8"
            >
              <div className="flex items-start justify-between">
                <Icon size={26} strokeWidth={1.6} aria-hidden="true" className="text-sun transition-colors duration-500 group-hover:text-ink" />
                <span className="label text-cream/30 transition-colors group-hover:text-ink/50">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-10 text-xl font-semibold tracking-tight">{name}</h3>
              <p className="mt-1.5 text-[0.95rem] text-cream/55 transition-colors duration-500 group-hover:text-ink/70">{note}</p>
            </Reveal>
          ))}
        </ul>
        </ScrollTilt>
      </div>
    </section>
  );
}
