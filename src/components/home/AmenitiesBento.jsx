import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Car, Coffee, CupSoda, Lock, Printer, Users } from 'lucide-react';
import { IMG } from '../../data/site.js';
import { ScrollTilt } from '../ui/ScrollTilt.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';

const card = 'group relative overflow-hidden rounded-[26px] p-6 transition-transform duration-500 hover:-translate-y-1';

function WifiBars() {
  return (
    <span className="flex items-end gap-1" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-full bg-sun"
          style={{ height: 8 + i * 6 }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </span>
  );
}

function Small({ icon: Icon, title, text, className = '' }) {
  return (
    <div className={`${card} ${className}`}>
      <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
      <h3 className="mt-6 text-lg font-semibold tracking-tight lg:mt-auto">{title}</h3>
      <p className="mt-1 text-sm opacity-70">{text}</p>
    </div>
  );
}

/** Bento grid of amenities mixing real photos, glass and solid tiles. */
export function AmenitiesBento() {
  return (
    <section className="relative overflow-hidden bg-paper" aria-labelledby="amenities-title">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 size-[520px] rounded-full bg-sun/25 blur-[130px]" />
      <div className="wrap sec relative">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow num="05">Included, always</Eyebrow>
            <SplitWords id="amenities-title" text="The small things that make a *big* workday." className="t-h2 mt-4" />
          </div>
        </div>

        <ScrollTilt className="mt-12" from={22}>
        <div className="grid gap-3 sm:grid-cols-2 lg:auto-rows-[205px] lg:grid-cols-4">
          <div className={`${card} min-h-[340px] p-0 sm:col-span-2 lg:row-span-2`}>
            <img src={IMG.hotDesks} alt="Hot desks with green dividers at Let's Work" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <div className="glass-dark absolute inset-x-4 bottom-4 rounded-[20px] p-5 text-cream">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold tracking-tight">High-speed internet</h3>
                <WifiBars />
              </div>
              <p className="mt-1 text-sm text-cream/70">Upload the deck. Join the call. Nobody freezes mid-sentence.</p>
            </div>
          </div>

          <Small icon={Coffee} title="Chai on call" text="Office boy service — tea arrives before your second email." className="flex flex-col bg-ink text-cream" />

          <div className={`${card} min-h-[340px] p-0 lg:row-span-2`}>
            <img
              src={IMG.desksTall}
              alt="Window-side dedicated desks on the Let's Work floor"
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <span className="glass absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-medium">Our actual floor</span>
            <div className="absolute inset-x-5 bottom-5 text-cream">
              <h3 className="text-lg font-semibold tracking-tight">Dedicated desks</h3>
              <p className="text-sm text-cream/75">Ergonomic chairs. Real desks. Not café stools.</p>
            </div>
          </div>

          <Small icon={Car} title="Free parking" text="Park right here. No circling the chowk." className="flex flex-col bg-sun text-on-sun" />
          <Small icon={Lock} title="Private lockers" text="Leave the laptop. Walk home light." className="glass flex flex-col" />

          <div className={`${card} flex min-h-[205px] bg-cream-deep p-0 sm:col-span-2`}>
            <div className="flex flex-1 flex-col p-6">
              <span className="label text-graphite">By the hour</span>
              <h3 className="mt-auto text-2xl font-semibold tracking-tight">Meeting rooms</h3>
              <p className="text-sm text-graphite">Pitches, interviews, workshops.</p>
            </div>
            <div className="relative w-[46%] overflow-hidden">
              <img src={IMG.meetingRoom} alt="Let's Work meeting room" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
            </div>
          </div>

          <Small icon={Printer} title="Printing" text="Print the contract, sign it, done." className="glass flex flex-col" />
          <Small icon={CupSoda} title="Refreshments" text="Complimentary, all day." className="glass flex flex-col" />
          <Small icon={Users} title="Networking events" text="Skill-sharing and people worth knowing." className="flex flex-col bg-ink-soft text-cream" />

          <Link to="/spaces" className={`${card} flex flex-col justify-between bg-ink text-cream sm:col-span-2`}>
            <span className="label text-sun">All of it, every plan</span>
            <span className="flex items-end justify-between gap-4">
              <span className="max-w-xs text-2xl font-semibold leading-tight tracking-tight">See which space fits how you work</span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sun text-on-sun transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </span>
          </Link>
        </div>
        </ScrollTilt>
      </div>
    </section>
  );
}
