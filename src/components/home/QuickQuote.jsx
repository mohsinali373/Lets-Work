import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { waLink } from '../../data/site.js';
import { EASE_OUT } from '../../lib/motion.js';

const SPACES = ['Hot desk', 'Dedicated desk', 'Private office', 'Meeting room', 'Instant office'];
const WHEN = ['A few hours', 'A day', 'A week', 'A month+'];
const TEAM = ['Just me', '2–5 people', '6+ people'];

/** Custom dropdown in the site's style (opens upward so the hero never clips it). */
function Choice({ label, options, value, onChange }) {
  const id = useId();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(() => options.indexOf(value));

  useEffect(() => {
    if (!isOpen) return undefined;
    const close = (e) => {
      if (!ref.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [isOpen]);

  function open() {
    setActive(options.indexOf(value));
    setIsOpen(true);
  }
  function choose(i) {
    onChange(options[i]);
    setIsOpen(false);
  }
  function handleKey(e) {
    if (e.key === 'Escape') setIsOpen(false);
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) open();
      else setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if ((e.key === 'Enter' || e.key === ' ') && isOpen) {
      e.preventDefault();
      choose(active);
    }
  }

  return (
    <div ref={ref} className="relative min-w-0 flex-1">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-list`}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleKey}
        className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-left transition-colors ${
          isOpen ? 'bg-white/14' : 'bg-white/6 hover:bg-white/10'
        }`}
      >
        <span className="min-w-0">
          <span className="label block text-cream/50">{label}</span>
          <span className="block truncate font-semibold text-cream">{value}</span>
        </span>
        <ChevronDown size={18} className={`shrink-0 text-sun transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={`${id}-list`}
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute bottom-full left-0 right-0 z-30 mb-2 origin-bottom rounded-2xl border border-white/10 bg-ink-soft p-1.5 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)]"
          >
            {options.map((o, i) => {
              const isSelected = o === value;
              return (
                <li
                  key={o}
                  role="option"
                  aria-selected={isSelected}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => choose(i)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    i === active ? 'bg-white/10' : ''
                  } ${isSelected ? 'font-semibold text-sun' : 'text-cream/85'}`}
                >
                  {o}
                  {isSelected && <Check size={15} aria-hidden="true" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Hotel-style availability bar: three picks, one WhatsApp message. */
export function QuickQuote() {
  const [space, setSpace] = useState(SPACES[0]);
  const [when, setWhen] = useState(WHEN[1]);
  const [team, setTeam] = useState(TEAM[0]);
  const message = `Hi Let's Work! Is a ${space.toLowerCase()} available? For: ${when.toLowerCase()}. Team: ${team.toLowerCase()}.`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.open(waLink(message), '_blank', 'noopener,noreferrer');
      }}
      className="glass-dark flex flex-col gap-2 rounded-[26px] p-2 md:flex-row md:items-stretch"
      aria-label="Check availability"
    >
      <Choice label="I need a" options={SPACES} value={space} onChange={setSpace} />
      <Choice label="For" options={WHEN} value={when} onChange={setWhen} />
      <Choice label="Team" options={TEAM} value={team} onChange={setTeam} />
      <button
        type="submit"
        className="roll-host group flex shrink-0 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-sun px-6 py-4 font-semibold text-on-sun transition-colors hover:bg-[color-mix(in_srgb,var(--color-sun)_85%,white)]"
      >
        <span className="roll">
          <span>Check availability</span>
          <span aria-hidden="true">Check availability</span>
        </span>
        <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
      </button>
    </form>
  );
}
