import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { waLink } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { EASE_OUT } from '../../lib/motion.js';
import { sized } from '../../data/imageSizes.js';

/** Our own walk-in film, encoded at three sizes with a keyframe every 3 frames for clean scrubbing. */
const VIDEO = {
  hd: '/video/walkin-1080.mp4',
  md: '/video/walkin-720.mp4',
  sm: '/video/walkin-480.mp4',
  poster: '/video/walkin-poster.webp',
};

/** Laptops and desktops always get full 1080p; tablets 720p; phones the light file. */
function pickSource() {
  const w = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;
  if (w >= 1024 || w * dpr >= 1600) return VIDEO.hd;
  if (w >= 640) return VIDEO.md;
  return VIDEO.sm;
}

/** Captions timed to the film as a fraction of its length (0..1). */
const BEATS = [
  { at: 0, time: 'Multan’s no.1 coworking space', title: 'The space for imagination.', text: 'A dynamic, collaborative workspace at Nandla Chowk for entrepreneurs, startups and remote workers.' },
  { at: 0.17, time: 'Coworking & dedicated desks', title: 'Productivity, built in.', text: 'High-speed internet, ergonomic furniture, private lockers and an office boy on call.' },
  { at: 0.5, time: 'Private offices & meeting rooms', title: 'Room to grow your team.', text: 'Fully furnished, serviced offices and meeting rooms for clients, interviews and workshops.' },
  { at: 0.72, time: 'Monthly plans · no hidden fees', title: 'One simple monthly plan.', text: 'Internet, AC and parking included in one fixed fee. Your first tour is free.' },
];

const SCRUB_START = 0.14; // scroll progress where the film starts moving (after the window opens)
const SCRUB_END = 0.96;
const EASE_TO_TARGET = 0.22; // how far the playhead moves toward the scroll target each frame

/**
 * Scroll-scrubbed film of a real morning at Let's Work: it plays forward and backward with the
 * scrollbar, one continuous shot, while captions change on the left — plain text, no box.
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
  // no scaling once the film is playing: upscaling a 1080p frame is what made it look soft
  const zoom = useTransform(p, [0, SCRUB_START], [1.06, 1]);
  const peekOpacity = useTransform(p, [0, 0.1], [1, 0]);
  const scrimOpacity = useTransform(p, [SCRUB_START * 0.6, SCRUB_START], [0, 1]);

  // Choose a file for this screen once the section is close.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSrc(pickSource());
        io.disconnect();
      },
      { rootMargin: '900px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Ease the playhead toward the scroll target every frame; never queue a seek on top of a seek.
  useEffect(() => {
    let frame = 0;
    function tick() {
      frame = requestAnimationFrame(tick);
      const v = videoRef.current;
      if (!v || !v.duration || v.seeking) return;
      const target = targetRef.current * (v.duration - 0.05);
      const diff = target - v.currentTime;
      if (Math.abs(diff) > 1 / 48) v.currentTime = v.currentTime + diff * EASE_TO_TARGET;
    }
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  useMotionValueEvent(p, 'change', (v) => {
    const t = Math.min(1, Math.max(0, (v - SCRUB_START) / (SCRUB_END - SCRUB_START)));
    targetRef.current = t;
    setBeat(v < SCRUB_START * 0.7 ? -1 : BEATS.reduce((acc, b, i) => (t >= b.at ? i : acc), 0));
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
    <section ref={sectionRef} className="relative h-[420vh] bg-ink" aria-label="A morning at Let's Work, played as you scroll">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0 bg-ink">
          <motion.div style={{ scale: zoom }} className="absolute inset-0">
            <img
              {...sized(VIDEO.poster)}
              alt="Walking into the Let's Work coworking space" title="Walking into the Let's Work coworking space"
              decoding="async"
              className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${isReady ? 'opacity-0' : 'opacity-100'}`}
            />
            {src && (
              <video
                ref={videoRef}
                src={src}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                onLoadedData={handleLoaded}
                aria-label="A member walks through Let's Work past the lounge and hot desks into a private office, sits down and opens her laptop"
                className="absolute inset-0 size-full object-cover"
              />
            )}
          </motion.div>
          {/* soft left-side fade so the captions read without a box */}
          <motion.div
            style={{ opacity: scrimOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent md:bg-gradient-to-r md:from-ink/65 md:via-ink/10 md:via-35% md:to-transparent md:to-55%"
          />
        </motion.div>

        <motion.p style={{ opacity: peekOpacity }} className="label absolute inset-x-0 top-[16%] text-center text-cream">
          Keep scrolling — the door's open
        </motion.p>

        {/* captions: plain text on the left */}
        <div className="wrap pointer-events-none absolute inset-0 flex items-end pb-16 md:items-center md:pb-0">
          <div className="max-w-md text-cream [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
            <AnimatePresence mode="wait">
              {caption && (
                <motion.div key={caption.time} initial="in" animate="show" exit="out">
                  <motion.p
                    variants={{ in: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 }, out: { opacity: 0, y: -14 } }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="label text-sun"
                  >
                    {caption.time}
                  </motion.p>
                  <motion.h3
                    variants={{ in: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 }, out: { opacity: 0, y: -14 } }}
                    transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.05 }}
                    className="t-h2 mt-2"
                  >
                    {caption.title}
                  </motion.h3>
                  <motion.p
                    variants={{ in: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 }, out: { opacity: 0, y: -10 } }}
                    transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.12 }}
                    className="mt-3 text-lg text-cream/85"
                  >
                    {caption.text}
                  </motion.p>
                  {isLast && (
                    <motion.div
                      variants={{ in: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 }, out: { opacity: 0 } }}
                      transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 }}
                      className="pointer-events-auto mt-6"
                    >
                      <Button href={waLink("Hi Let's Work! I'd like to reserve a desk.")}>Reserve your desk</Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {caption && (
              <ol className="mt-6 flex gap-1.5" aria-hidden="true">
                {BEATS.map((b, i) => (
                  <li key={b.time} className={`h-1 rounded-full transition-all duration-500 ${i === beat ? 'w-8 bg-sun' : i < beat ? 'w-3 bg-sun/60' : 'w-3 bg-white/30'}`} />
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
