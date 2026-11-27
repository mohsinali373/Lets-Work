import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../data/services.js';
import { EASE_OUT } from '../../lib/motion.js';

const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } };
const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

/**
 * Desktop "Our Spaces" dropdown: a full-width panel under the header with the spaces in rows of three
 * (no photos), plus a "compare all" card to fill the grid.
 * Rendered inside the full-width fixed header (outside the nav), so `absolute inset-x-0 top-full` spans the window.
 */
export function MegaMenu({ onNavigate }) {
  return (
    <motion.div
      id="mega-spaces"
      className="absolute inset-x-0 top-full px-3 pt-3"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
    >
      <div className="rounded-[28px] bg-ink/[0.97] p-6 text-cream shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-xl">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-5 flex items-center justify-between px-1">
            <p className="label text-cream/50">Our spaces · Nandla Chowk, Multan</p>
            <Link to="/spaces" onClick={onNavigate} className="ulink text-sm text-sun">
              Compare all spaces
            </Link>
          </div>

          <motion.ul className="grid grid-cols-3 gap-3" variants={listVariants} initial="hidden" animate="show">
            {SERVICES.map((s) => (
              <motion.li key={s.id} variants={cardVariants}>
                <Link
                  to={s.path}
                  onClick={onNavigate}
                  className="group flex h-full items-start justify-between gap-4 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/[0.08] transition-colors duration-300 hover:bg-white/[0.08] hover:ring-sun/40"
                >
                  <span>
                    <span className="label text-sun">{s.num}</span>
                    <span className="mt-1.5 block text-lg font-semibold tracking-tight">{s.name}</span>
                    <span className="label mt-1 block text-[0.65rem] text-cream/45">{s.tag}</span>
                    <span className="mt-3 block text-sm leading-snug text-cream/65">{s.oneLiner}</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 text-cream/30 transition-all duration-300 group-hover:rotate-45 group-hover:text-sun"
                  />
                </Link>
              </motion.li>
            ))}

            {/* sixth tile completes the second row */}
            <motion.li variants={cardVariants}>
              <Link
                to="/spaces"
                onClick={onNavigate}
                className="group flex h-full flex-col justify-between gap-4 rounded-2xl bg-sun p-5 text-on-sun transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="label opacity-70">Not sure yet?</span>
                <span className="flex items-end justify-between gap-3">
                  <span className="text-lg font-semibold leading-tight tracking-tight">Compare all five spaces side by side</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
}
