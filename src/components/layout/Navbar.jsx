import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { BrandLogo } from './PaletteSwitcher.jsx';
import { CONTACT, TOUR_MSG, waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { useLenis } from '../../lib/SmoothScroll.jsx';
import { EASE_OUT } from '../../lib/motion.js';
import { MegaMenu } from './MegaMenu.jsx';
import { MobileMenu } from './MobileMenu.jsx';

function linkClass({ isActive }) {
  return `relative rounded-full px-4 py-2 text-[0.95rem] transition-colors hover:bg-white/8 ${
    isActive ? 'text-sun' : 'text-cream/85 hover:text-cream'
  }`;
}

export function Navbar() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setIsHidden(y > prev && y > 260);
  });

  // Route changed: close any open menu.
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!lenis) return;
    if (isMenuOpen) lenis.stop();
    else lenis.start();
  }, [isMenuOpen, lenis]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') {
        setIsMegaOpen(false);
        setIsMenuOpen(false);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const spacesActive = pathname === '/spaces' || /space|desk|meeting|office/.test(pathname);

  return (
    <>
      <motion.header
        onMouseLeave={() => setIsMegaOpen(false)}
        className="fixed inset-x-0 top-3 z-50 px-3 md:top-4"
        animate={{ y: isHidden && !isMegaOpen ? -120 : 0 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      >
        <nav
          aria-label="Main"
          className="glass-dark mx-auto flex max-w-[1180px] items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 text-cream"
        >
          <Link to="/" aria-label="Let's Work — home" className="shrink-0">
            <BrandLogo alt="Let's Work coworking space" className="h-7 w-auto md:h-[30px]" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            <li onMouseEnter={() => setIsMegaOpen(false)}>
              <NavLink to="/" end className={linkClass}>
                Let's Work
              </NavLink>
            </li>
            <li onMouseEnter={() => setIsMegaOpen(false)}>
              <NavLink to="/about-us" className={linkClass}>
                About
              </NavLink>
            </li>
            <li onMouseEnter={() => setIsMegaOpen(false)}>
              <NavLink to="/privacy-policy" className={linkClass}>
                Privacy Policy
              </NavLink>
            </li>
            <li className="relative" onMouseEnter={() => setIsMegaOpen(true)}>
              <button
                type="button"
                aria-expanded={isMegaOpen}
                aria-controls={isMegaOpen ? 'mega-spaces' : undefined}
                onClick={() => setIsMegaOpen((o) => !o)}
                className={`flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] transition-colors hover:bg-white/8 ${
                  spacesActive ? 'text-sun' : 'text-cream/85 hover:text-cream'
                }`}
              >
                Our Spaces
                <ChevronDown size={15} className={`transition-transform duration-300 ${isMegaOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            </li>
            <li onMouseEnter={() => setIsMegaOpen(false)}>
              <NavLink to="/contact-us" className={linkClass}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={CONTACT.tel}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-cream/80 transition-colors hover:text-sun xl:flex"
            >
              <Phone size={15} aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
            <Button href={waLink(TOUR_MSG)} className="hidden !py-1.5 !text-[0.9rem] sm:inline-flex">
              Book a free tour
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
              className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 lg:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </nav>
        {/* full-width spaces panel; lives in the header (not the nav) so it can span the whole window */}
        <AnimatePresence>{isMegaOpen && <MegaMenu onNavigate={() => setIsMegaOpen(false)} />}</AnimatePresence>
      </motion.header>

      <AnimatePresence>{isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}</AnimatePresence>
    </>
  );
}
