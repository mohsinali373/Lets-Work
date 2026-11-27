import { createElement, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Armchair, ChevronDown, DoorClosed, LayoutGrid, Phone, Presentation, Users, X, Zap } from 'lucide-react';
import { BrandLogo } from './PaletteSwitcher.jsx';
import { CONTACT, TOUR_MSG, waLink } from '../../data/site.js';
import { SERVICES } from '../../data/services.js';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion.js';
import { WhatsAppIcon } from '../ui/Icons.jsx';

/** Outline icon per space in the phone menu (photos were too small to read there). */
const SPACE_ICONS = { coworking: Users, dedicated: Armchair, private: DoorClosed, meeting: Presentation, instant: Zap, all: LayoutGrid };

const LINKS = [
  { label: "Let's Work", to: '/' },
  { label: 'About', to: '/about-us' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Our Spaces', spaces: true },
  { label: 'Contact Us', to: '/contact-us' },
];

const row = 'flex w-full items-center justify-between border-b border-white/10 py-4 text-[1.6rem] font-semibold tracking-tight';

/** Full-screen phone menu: four rows, "Our Spaces" expands in place (no duplicate list). */
export function MobileMenu({ onClose }) {
  const { pathname } = useLocation();
  const onSpacePage = SERVICES.some((s) => s.path === pathname) || pathname === '/spaces';
  const [isSpacesOpen, setIsSpacesOpen] = useState(onSpacePage);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-cream"
      initial={{ clipPath: 'circle(0% at 92% 6%)' }}
      animate={{ clipPath: 'circle(150% at 92% 6%)' }}
      exit={{ clipPath: 'circle(0% at 92% 6%)' }}
      transition={{ duration: 0.6, ease: EASE_IN_OUT }}
      data-lenis-prevent
    >
      <div className="flex items-center justify-between px-5 pt-5">
        <BrandLogo alt="Let's Work" width="2740" height="490" className="h-7 w-auto" />
        <button type="button" onClick={onClose} autoFocus aria-label="Close menu" className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/10">
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="px-5 pt-8">
        <ul className="border-t border-white/10">
          {LINKS.map((item, i) => (
            <motion.li key={item.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 + i * 0.05 }}>
              {item.spaces ? (
                <>
                  <button
                    type="button"
                    aria-expanded={isSpacesOpen}
                    onClick={() => setIsSpacesOpen((o) => !o)}
                    className={`${row} cursor-pointer text-left ${onSpacePage ? 'text-sun' : ''}`}
                  >
                    {item.label}
                    <ChevronDown size={22} className={`transition-transform duration-300 ${isSpacesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isSpacesOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                        className="overflow-hidden border-b border-white/10"
                      >
                        {[...SERVICES, { id: 'all', name: 'Compare all spaces', path: '/spaces' }].map((s) => (
                          <li key={s.id}>
                            <Link
                              to={s.path}
                              onClick={onClose}
                              className={`flex items-center gap-3 py-2.5 text-base ${pathname === s.path ? 'text-sun' : 'text-cream/75'}`}
                            >
                              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/15 text-sun">
                                {createElement(SPACE_ICONS[s.id], { size: 18, strokeWidth: 1.75, 'aria-hidden': true })}
                              </span>
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link to={item.to} onClick={onClose} className={`${row} ${pathname === item.to ? 'text-sun' : ''}`}>
                  {item.label}
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto px-5 pb-6 pt-8">
        <p className="mb-3 text-sm text-cream/50">{CONTACT.address}</p>
        <div className="grid grid-cols-2 gap-3">
          <a href={CONTACT.tel} className="flex items-center justify-center gap-2 rounded-full bg-white/10 py-3.5 font-medium">
            <Phone size={17} aria-hidden="true" /> Call
          </a>
          <a
            href={waLink(TOUR_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-sun py-3.5 font-semibold text-on-sun"
          >
            <WhatsAppIcon size={18} /> WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
