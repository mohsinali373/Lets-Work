import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { EASE_OUT } from '../../lib/motion.js';

/**
 * Accordion. First item open by default.
 * @param {{ items: {q: string, a: string}[], dark?: boolean }} props
 */
export function Faq({ items, dark = false }) {
  const [open, setOpen] = useState(0);
  const uid = useId();
  const line = dark ? 'border-white/12' : 'border-ink/12';

  return (
    <div className={`border-t ${line}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        return (
          <div key={item.q} className={`border-b ${line}`}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={isOpen ? panelId : undefined}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left md:py-6"
              >
                <span className="text-lg font-medium tracking-tight md:text-xl">{item.q}</span>
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                    isOpen ? 'rotate-45 bg-sun text-on-sun' : dark ? 'bg-white/10 group-hover:bg-white/20' : 'bg-ink/6 group-hover:bg-ink/12'
                  }`}
                >
                  <Plus size={18} aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-2xl pb-6 pr-12 ${dark ? 'text-white/65' : 'text-graphite'}`}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
