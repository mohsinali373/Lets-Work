import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { getService } from '../../data/services.js';
import { EASE_OUT } from '../../lib/motion.js';

const NEEDS = [
  { label: 'Focus work, most days', pick: 'dedicated' },
  { label: 'Somewhere to work, flexibly', pick: 'coworking' },
  { label: 'Meeting a client', pick: 'meeting' },
  { label: 'A base for my team', pick: 'private' },
  { label: 'An office — today', pick: 'instant' },
];

/** One-question picker that recommends a space. */
export function SpaceFinder() {
  const [need, setNeed] = useState(null);
  const match = need ? getService(need.pick) : null;

  return (
    <div className="glass rounded-[28px] p-5 md:p-6">
      <p className="label text-graphite">Quick space finder</p>
      <p className="mt-2 text-xl font-semibold tracking-tight">What do you need it for?</p>
      <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="What do you need it for?">
        {NEEDS.map((n) => {
          const isOn = need?.label === n.label;
          return (
            <button
              key={n.label}
              type="button"
              role="radio"
              aria-checked={isOn}
              onClick={() => setNeed(n)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                isOn ? 'bg-ink text-cream' : 'bg-white/60 hover:bg-white'
              }`}
            >
              {n.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 min-h-[84px]" aria-live="polite">
        <AnimatePresence mode="wait">
          {match ? (
            <motion.div key={match.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: EASE_OUT }}>
              <Link to={match.path} className="group flex items-center gap-4 rounded-[20px] bg-sun p-3 pr-4">
                <img src={match.thumb} alt={match.name} title={match.name} className="size-16 rounded-2xl object-cover" />
                <span className="flex-1">
                  <span className="label block text-ink/60">Try this</span>
                  <span className="text-lg font-semibold tracking-tight">{match.name}</span>
                </span>
                <span className="grid size-10 place-items-center rounded-full bg-ink text-sun transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ) : (
            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-3 text-sm text-graphite">
              Pick one — we'll point you to the right room.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
