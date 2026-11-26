import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { X, Phone } from 'lucide-react';
import { CONTACT, IMG, TOUR_MSG, waLink } from '../../data/site.js';
import { SERVICES } from '../../data/services.js';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion.js';
import { WhatsAppIcon } from '../ui/Icons.jsx';

const MAIN = [
  { label: 'Home', to: '/' },
  { label: 'All spaces', to: '/spaces' },
  { label: 'About', to: '/about-us' },
  { label: 'Contact', to: '/contact-us' },
];

/** Full-screen menu for phones and tablets, opened with a circular wipe. */
export function MobileMenu({ onClose }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-cream"
      initial={{ clipPath: 'circle(0% at 92% 6%)' }}
      animate={{ clipPath: 'circle(150% at 92% 6%)' }}
      exit={{ clipPath: 'circle(0% at 92% 6%)' }}
      transition={{ duration: 0.7, ease: EASE_IN_OUT }}
      data-lenis-prevent
    >
      <div className="flex items-center justify-between px-6 pt-6">
        <img src={IMG.logo} alt="Let's Work" width="2740" height="490" className="h-7 w-auto" />
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close menu"
          className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/10"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 px-6 pt-10">
        <ul>
          {MAIN.map((item, i) => (
            <motion.li
              key={item.to}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 + i * 0.06 }}
            >
              <Link to={item.to} onClick={onClose} className="t-h2 block py-1.5 transition-colors hover:text-sun">
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>
        <p className="label mt-10 text-cream/40">Spaces</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <Link to={s.path} onClick={onClose} className="text-cream/75 hover:text-sun">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-2 gap-3 p-6">
        <a href={CONTACT.tel} className="flex items-center justify-center gap-2 rounded-full bg-white/10 py-3.5 font-medium">
          <Phone size={17} aria-hidden="true" /> Call
        </a>
        <a
          href={waLink(TOUR_MSG)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-sun py-3.5 font-semibold text-ink"
        >
          <WhatsAppIcon size={18} /> WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
