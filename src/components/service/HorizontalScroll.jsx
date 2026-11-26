import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * Pinned section whose panels slide sideways as you scroll down.
 * Falls back to a normal vertical stack below the lg breakpoint.
 * @param {{ heading: React.ReactNode, children: React.ReactNode }} props
 */
export function HorizontalScroll({ heading, children }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  useEffect(() => {
    function measure() {
      const track = trackRef.current;
      if (!track) return;
      // Below lg the panels stack vertically, so there is nothing to slide.
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      setDistance(isDesktop ? Math.max(0, track.scrollWidth - window.innerWidth + 40) : 0);
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section ref={sectionRef} className="relative lg:h-[260vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="wrap pb-8 pt-16 lg:pt-0">{heading}</div>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex flex-col gap-4 px-[clamp(1.25rem,4vw,2.5rem)] pb-16 lg:w-max lg:flex-row lg:gap-5 lg:pb-0 lg:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
