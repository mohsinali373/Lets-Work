import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../data/services.js';
import { EASE_OUT } from '../../lib/motion.js';

/** Desktop "Spaces" dropdown: list on the left, live photo preview on the right. */
export function MegaMenu({ onNavigate }) {
  const [active, setActive] = useState(SERVICES[0]);

  return (
    <motion.div
      id="mega-spaces"
      className="absolute left-1/2 top-full w-[720px] pt-4"
      style={{ x: '-50%' }}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      <div className="grid grid-cols-[1.15fr_1fr] gap-3 rounded-[28px] bg-ink/[0.97] p-3 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-xl">
        <ul>
          {SERVICES.map((s) => (
            <li key={s.id}>
              <Link
                to={s.path}
                onClick={onNavigate}
                onMouseEnter={() => setActive(s)}
                onFocus={() => setActive(s)}
                className={`group flex items-center justify-between rounded-2xl px-4 py-3 transition-colors ${
                  active.id === s.id ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <span>
                  <span className="block font-medium text-cream">{s.name}</span>
                  <span className="label text-[0.65rem] text-cream/45">{s.tag}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className={`transition-all duration-300 ${active.id === s.id ? 'rotate-45 text-sun' : 'text-cream/30'}`}
                />
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t border-white/10 px-4 pt-3">
            <Link to="/spaces" onClick={onNavigate} className="ulink text-sm text-sun">
              Compare all spaces
            </Link>
          </li>
        </ul>
        <div className="relative overflow-hidden rounded-[20px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={active.id}
              src={active.thumb}
              alt=""
              className="absolute inset-0 size-full object-cover"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            />
          </AnimatePresence>
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-ink/55 p-4 backdrop-blur-md">
            <p className="text-sm leading-snug text-cream">{active.oneLiner}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
