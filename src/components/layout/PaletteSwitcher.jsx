import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Palette } from 'lucide-react';
import { EASE_OUT } from '../../lib/motion.js';
import { PALETTES, setPalette, usePalette } from '../../lib/palette.js';

/**
 * The "Colours" tab on the right edge: slides out a compact panel where visitors pick one of
 * the site's two themes (Deep Ocean or Logo Clean). Themes are defined in src/lib/palette.js.
 */
export function PaletteSwitcher() {
  const active = usePalette();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  function choose(id) {
    setPalette(id);
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Change site colour"
        aria-expanded={isOpen}
        className="fixed right-0 top-1/2 z-[80] flex -translate-y-1/2 flex-col items-center gap-2 rounded-l-2xl bg-sun px-2.5 py-4 text-on-sun shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] transition-[padding] duration-300 hover:pr-4"
      >
        <Palette size={20} aria-hidden="true" />
        <span className="label [writing-mode:vertical-rl]">Colours</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* invisible layer so a click anywhere else closes the panel */}
            <div aria-hidden="true" className="fixed inset-0 z-[81]" onClick={() => setIsOpen(false)} />
            <motion.div
              role="dialog"
              aria-label="Choose site colour"
              className="fixed right-0 top-1/2 z-[82] w-52 -translate-y-1/2 rounded-l-2xl bg-paper p-2 text-[#111] shadow-[0_20px_50px_-18px_rgba(0,0,0,0.55)] ring-1 ring-black/5"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              <p className="label px-2 pb-1.5 pt-1 text-[#57534b]">Site colour</p>
              {PALETTES.map((p) => (
                <PaletteOption key={p.id} palette={p} isActive={p.id === active.id} onSelect={choose} />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/** One row: a split dot (main colour / accent), the name, and a tick when active. */
function PaletteOption({ palette: p, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(p.id)}
      aria-pressed={isActive}
      className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm font-medium transition-colors ${isActive ? 'bg-cream-deep' : 'hover:bg-cream'}`}
    >
      <span
        aria-hidden="true"
        className="size-7 shrink-0 rounded-full ring-2 ring-white"
        style={{ background: `linear-gradient(135deg, ${p.ink} 0 55%, ${p.sun} 55% 100%)` }}
      />
      <span className="flex-1">{p.name}</span>
      {isActive && <Check size={16} aria-hidden="true" style={{ color: p.sun }} />}
    </button>
  );
}

/** The site logo in the active palette's version (yellow or red). Takes the same props as <img>. */
export function BrandLogo(props) {
  const { logo } = usePalette();
  return <img src={logo} {...props} />;
}
