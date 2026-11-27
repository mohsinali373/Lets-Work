import { useEffect } from 'react';

const START_INSET = 6; // % of width trimmed from each side when a section first appears
const START_RADIUS = 44; // px corner radius at the start

/** True when the section paints its own background (transparent ones have nothing to clip). */
function hasBackground(el) {
  const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
  return Boolean(m) && !(m.length === 4 && Number(m[3]) === 0);
}

/**
 * Site-wide scroll effect: every coloured top-level section enters as a rounded card
 * and opens out to full width as it scrolls up the screen. Purely scroll-linked.
 * A section marked `data-no-reveal` stays full width from the start.
 * @param {React.RefObject<HTMLElement>} rootRef
 */
export function useSectionReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let sections = [];
    let frame = 0;

    function collect() {
      sections = [...root.querySelectorAll('section')].filter((s, i) => i > 0 && !s.parentElement.closest('section') && !('noReveal' in s.dataset) && hasBackground(s));
    }

    function update() {
      frame = 0;
      const vh = window.innerHeight;
      for (const s of sections) {
        const top = s.getBoundingClientRect().top;
        if (top > vh || top < -vh * 0.2) {
          if (top < 0 && s.style.clipPath) s.style.clipPath = '';
          continue;
        }
        const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.65)));
        const e = 1 - Math.pow(1 - p, 3); // ease-out
        const inset = START_INSET * (1 - e);
        const radius = START_RADIUS * (1 - e);
        s.style.clipPath = e >= 0.999 ? '' : `inset(0 ${inset}% 0 ${inset}% round ${radius}px)`;
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    collect();
    update();
    const late = window.setTimeout(() => {
      collect();
      update();
    }, 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(late);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      sections.forEach((s) => {
        s.style.clipPath = '';
      });
    };
  }, [rootRef]);
}
