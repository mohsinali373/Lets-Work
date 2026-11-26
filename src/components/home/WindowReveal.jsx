import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { EASE_OUT } from '../../lib/motion.js';

const VIDEO = { large: '/video/arrive.mp4', small: '/video/arrive-sm.mp4', poster: '/video/arrive-poster.jpg' };

/** Captions keyed to the video's own timeline (seconds). */
const BEATS = [
  { at: 0, time: '08:55', title: 'She walks in.', text: 'No lease signed. One WhatsApp message and a free tour.' },
  { at: 4.5, time: '08:57', title: 'Past the glass offices…', text: 'Quiet rooms for calls, meeting rooms by the hour.' },
  { at: 8.5, time: '08:59', title: 'Finds her desk.', text: 'Fast Wi-Fi, an ergonomic chair, a plug by her knee.' },
  { at: 11.5, time: '09:00', title: 'Laptop open. Work begins.', text: 'That is the whole onboarding. Yours can start tomorrow.' },
];

const SCRUB_START = 0.14; // scroll progress where the video starts moving (after the window opens)
const SCRUB_END = 0.96;

/**
 * Scroll-scrubbed video: one continuous real shot that plays forward and backward
 * exactly with the scrollbar — no cuts, the camera simply follows her to her desk.
 * The file is encoded with a keyframe every few frames so seeking stays smooth.
 */
export function WindowReveal() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const targetRef = useRef(0);
  const [src, setSrc] = useState(null);
  const [beat, setBeat] = useState(-1);
  const [isReady, setIsReady] = useState(false);
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const inset = useTransform(p, [0, SCRUB_START], [8, 0]);
  const radius = useTransform(p, [0, SCRUB_START], [40, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius}px)`;
  const zoom = useTransform(p, [0, SCRUB_START, 1], [1.18, 1.06, 1]);
  const peekOpacity = useTransform(p, [0, 0.1], [1, 0]);

  // Pick a file for the screen size, only once the section is close.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSrc(window.innerWidth < 768 ? VIDEO.small : VIDEO.large);
        io.disconnect();
      },
      { rootMargin: '800px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Ease the video's time toward the scroll target every frame (smooth, never ahead of a pending seek).
  useEffect(() => {
    let frame = 0;
    function tick() {
      frame = requestAnimationFrame(tick);
      const v = videoRef.current;
      if (!v || !v.duration || v.seeking) return;
      const target = targetRef.current * v.duration;
      const diff = target - v.currentTime;
      if (Math.abs(diff) > 0.02) v.currentTime = v.currentTime + diff * 0.35;
    }
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  useMotionValueEvent(p, 'change', (v) => {
    const t = Math.min(1, Math.max(0, (v - SCRUB_START) / (SCRUB_END - SCRUB_START)));
    targetRef.current = t;
    const seconds = t * (videoRef.current?.duration || 15);
    setBeat(v < SCRUB_START * 0.7 ? -1 : BEATS.reduce((acc, b, i) => (seconds >= b.at ? i : acc), 0));
  });

  function handleLoaded() {
    const v = videoRef.current;
    if (!v) return;
    // iOS only paints seeks after the video has played once.
    v.play()
      .then(() => v.pause())
      .catch(() => {});
    setIsReady(true);
  }

  const caption = beat >= 0 ? BEATS[beat] : null;
  const isLast = beat === BEATS.length - 1;

  return (
    <section ref={sectionRef} className="relative h-[420vh]" aria-label="A morning at Let's Work, played as you scroll">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0 bg-ink">
          <motion.div style={{ scale: zoom }} className="absolute inset-0">
            <img src={VIDEO.poster} alt="" className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${isReady ? 'opacity-0' : 'opacity-100'}`} />
            {src && (
              <video
                ref={videoRef}
                src={src}
                muted
                playsInline
                preload="auto"
                onLoadedData={handleLoaded}
                aria-label="A woman walks through a modern office, sits at a desk and opens her laptop"
                className="absolute inset-0 size-full object-cover"
              />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25" />
        </motion.div>

        <motion.p style={{ opacity: peekOpacity }} className="label absolute inset-x-0 top-[16%] text-center text-cream">
          Keep scrolling — the door's open
        </motion.p>

        <div className="wrap pointer-events-none absolute inset-x-0 bottom-0 pb-6 md:pb-10">
          <AnimatePresence mode="wait">
            {caption && (
              <motion.div
                key={caption.time}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="glass-dark pointer-events-auto max-w-sm rounded-[24px] p-5 text-cream"
              >
                <p className="font-mono text-2xl font-medium text-sun">{caption.time}</p>
                <p className="mt-1 text-lg font-semibold tracking-tight">{caption.title}</p>
                <p className="mt-1 text-sm text-cream/65">{caption.text}</p>
                {isLast && (
                  <div className="mt-4">
                    <Button href={waLink("Hi Let's Work! I'd like to reserve a desk.")} className="!py-1.5 !text-sm">
                      Reserve your desk
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
