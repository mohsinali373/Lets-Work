import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../data/services.js';
import { SplitWords } from '../ui/SplitWords.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Bridge } from '../ui/Bridge.jsx';
import { ScrollTilt } from '../ui/ScrollTilt.jsx';

const TONES = {
  paper: 'bg-paper text-ink',
  ink: 'bg-ink text-cream',
  sun: 'bg-sun text-on-sun',
  deep: 'bg-cream-deep text-ink',
  glass: 'glass text-ink',
};

/** Five tall "swatch" cards (a nod to the brand palette cards). Hovering one widens it and reveals the photo. */
export function SpacesShelf() {
  const [active, setActive] = useState(SERVICES[0].id);

  return (
    <section className="wrap sec" aria-labelledby="spaces-title">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Eyebrow num="02">Spaces</Eyebrow>
          <SplitWords id="spaces-title" text="Five ways to work here. *Pick yours.*" className="t-h2 mt-4" />
        </div>
        <Reveal as="p" className="t-lead md:col-span-4 md:col-start-9" delay={0.1}>
          From a single seat for an afternoon to a lockable office for the whole team — same address, same chai, same
          people.
        </Reveal>
      </div>

      <ScrollTilt from={18}>
      <ul className="mt-12 flex flex-col gap-3 lg:h-[540px] lg:flex-row">
        {SERVICES.map((s, i) => {
          const isActive = active === s.id;
          return (
            <Reveal
              as="li"
              key={s.id}
              delay={i * 0.07}
              onMouseEnter={() => setActive(s.id)}
              className={`relative overflow-hidden rounded-[28px] transition-[flex-grow] duration-700 ease-[var(--ease-expo)] ${TONES[s.tone]} ${
                isActive ? 'lg:grow-[2.6]' : 'lg:grow'
              } lg:basis-0`}
            >
              <Link to={s.path} onFocus={() => setActive(s.id)} className="flex h-full min-h-[220px] flex-col p-6 lg:p-5 xl:p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="label opacity-60">({s.num})</span>
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                      isActive ? 'rotate-45 bg-sun text-on-sun' : 'bg-current/10'
                    } ${s.tone === 'sun' && isActive ? '!bg-ink !text-sun' : ''}`}
                  >
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </div>

                <div
                  className={`pointer-events-none absolute inset-x-3 top-20 bottom-[46%] hidden overflow-hidden rounded-[20px] transition-all duration-700 ease-[var(--ease-expo)] lg:block ${
                    isActive ? 'opacity-100' : 'scale-95 opacity-0'
                  }`}
                >
                  <img src={s.image} alt="" loading="lazy" className="size-full object-cover" />
                </div>

                <div className="mt-auto pt-8">
                  <h3 className="max-w-[9ch] text-[1.75rem] font-semibold leading-[1.02] tracking-tight lg:text-[1.6rem] xl:text-[1.8rem]">{s.name}</h3>
                  <span className="mt-4 block h-px w-12 bg-current opacity-60" />
                  <p className="label mt-3 opacity-70">{s.tag}</p>
                  <p
                    className={`mt-3 max-w-sm text-[0.95rem] leading-snug opacity-80 transition-opacity duration-500 lg:absolute lg:bottom-6 lg:right-6 lg:mt-0 lg:w-[42%] ${
                      isActive ? 'lg:opacity-80 lg:delay-200' : 'lg:opacity-0'
                    }`}
                  >
                    {s.oneLiner}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ul>
      </ScrollTilt>

      <Bridge className="mt-14">Found your space? Now pick how long you need it.</Bridge>
    </section>
  );
}
