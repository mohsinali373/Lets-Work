import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { CONTACT, IMG, TOUR_MSG, waLink } from '../../../data/site.js';
import { Eyebrow } from '../../ui/Eyebrow.jsx';
import { Button } from '../../ui/Button.jsx';
import { EASE_OUT } from '../../../lib/motion.js';
import { ROUTE, STOPS, buildScene } from './buildScene.js';

const ZONES = [
  { time: '08:45', title: 'Welcome to the floor.', text: 'Every room on one floor at Nandla Chowk. Keep scrolling — we will walk you through it.', photo: IMG.building },
  { time: '08:50', title: 'Say hi at reception.', text: 'Free parking outside, a friendly front desk inside. Your free tour starts right here.', photo: IMG.reception },
  { time: '09:30', title: 'Grab a hot desk.', text: 'White desks, green dividers, fast Wi-Fi and an ergonomic chair. Plug in and go.', photo: IMG.hotDesks },
  { time: '12:15', title: 'Chai on call in the lounge.', text: 'Blue sofas, a green wall and an office boy who keeps the tea coming.', photo: IMG.lounge },
  { time: '15:00', title: 'Pitch in the boardroom.', text: 'The long wooden table, the yellow wall, the big screen — booked by the hour.', photo: IMG.boardroom },
  { time: '16:30', title: 'Close the door.', text: 'Private offices for focused work, client calls and growing teams.', photo: IMG.privateOffice },
  { time: '18:30', title: "That's the whole floor.", text: 'Five ways to work, one address. Come and see it in person.', photo: IMG.floorPeople },
];

const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

/** Stop index + eased fraction for scroll progress p (0..1). */
function stopAt(p) {
  const span = STOPS.length - 1;
  const t = Math.min(span, Math.max(0, p * span));
  const i = Math.min(span - 1, Math.floor(t));
  return { i, f: smooth(t - i) };
}

/** Where the camera should be for a scroll progress p (0..1). */
function poseAt(p) {
  const { i, f } = stopAt(p);
  const a = STOPS[i];
  const b = STOPS[i + 1];
  const mix = (k) => a[k].map((v, n) => lerp(v, b[k][n], f));
  return { pos: mix('pos'), look: mix('look') };
}

// Her route, measured once: cumulative distance at each waypoint and at each camera stop.
const CUM = ROUTE.reduce((acc, pt, idx) => {
  if (idx === 0) return [0];
  const [ax, az] = ROUTE[idx - 1].p;
  return [...acc, acc[idx - 1] + Math.hypot(pt.p[0] - ax, pt.p[1] - az)];
}, []);
const STOP_S = STOPS.map((_, s) => CUM[ROUTE.findIndex((pt) => pt.stop === s)]);

/** Her (x, z) on the route for scroll progress p. */
function walkerAt(p) {
  const { i, f } = stopAt(p);
  const s = lerp(STOP_S[i], STOP_S[i + 1], f);
  let k = 0;
  while (k < CUM.length - 2 && CUM[k + 1] < s) k += 1;
  const segment = CUM[k + 1] - CUM[k] || 1;
  const t = Math.min(1, Math.max(0, (s - CUM[k]) / segment));
  const [ax, az] = ROUTE[k].p;
  const [bx, bz] = ROUTE[k + 1].p;
  return [lerp(ax, bx, t), lerp(az, bz, t)];
}

/** Shortest-way angle interpolation. */
function lerpAngle(a, b, t) {
  const d = ((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  return a + d * t;
}

/**
 * Pinned scroll section: a Three.js diorama of the floor; the camera flies zone to zone as you scroll.
 * three.js is downloaded only when the section gets close to the viewport.
 */
export function FloorTour3D() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | ready | failed
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v;
    setIndex(Math.min(ZONES.length - 1, Math.round(v * (ZONES.length - 1))));
  });

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return undefined;

    let cleanup = () => {};
    let started = false;
    let isVisible = false;
    let frame = 0;

    async function start() {
      started = true;
      try {
        const THREE = await import('three');
        const { RoundedBoxGeometry } = await import('three/addons/geometries/RoundedBoxGeometry.js');
        const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        stage.appendChild(renderer.domElement);
        renderer.domElement.setAttribute('aria-hidden', 'true');

        const { scene, ring, person, dispose } = buildScene(THREE, RoundedBoxGeometry);
        // soft studio reflections make the materials read as real surfaces
        const pmrem = new THREE.PMREMGenerator(renderer);
        const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = envMap;
        scene.environmentIntensity = 0.45;

        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
        const start0 = poseAt(progressRef.current);
        camera.position.fromArray(start0.pos);
        const look = new THREE.Vector3().fromArray(start0.look);
        const targetPos = new THREE.Vector3();
        const targetLook = new THREE.Vector3();
        const [px0, pz0] = walkerAt(progressRef.current);
        person.group.position.set(px0, 0, pz0);
        let stride = 0;
        let yaw = 0;

        function resize() {
          const { clientWidth: w, clientHeight: h } = stage;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          // pull back a little on narrow screens so the zone stays in frame
          camera.fov = w < 768 ? 48 : 34;
          camera.updateProjectionMatrix();
        }
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(stage);

        const clock = new THREE.Clock();
        function tick() {
          frame = requestAnimationFrame(tick);
          if (!isVisible) return;
          const pose = poseAt(progressRef.current);
          targetPos.fromArray(pose.pos);
          targetLook.fromArray(pose.look);
          camera.position.lerp(targetPos, 0.085);
          look.lerp(targetLook, 0.085);
          camera.lookAt(look);

          // she walks: position eases toward the scroll target, legs swing with distance covered
          const [tx, tz] = walkerAt(progressRef.current);
          const g = person.group.position;
          const nx = lerp(g.x, tx, 0.1);
          const nz = lerp(g.z, tz, 0.1);
          const moved = Math.hypot(nx - g.x, nz - g.z);
          if (moved > 0.0015) yaw = lerpAngle(yaw, Math.atan2(nx - g.x, nz - g.z), 0.18);
          g.set(nx, 0, nz);
          person.group.rotation.y = yaw;
          stride += moved * 7;
          const amp = Math.min(1, moved * 45);
          const swing = Math.sin(stride) * 0.6 * amp;
          person.legs[0].rotation.x = swing;
          person.legs[1].rotation.x = -swing;
          person.arms[0].rotation.x = -swing * 0.8;
          person.arms[1].rotation.x = swing * 0.8;
          person.group.position.y = Math.abs(Math.sin(stride)) * 0.03 * amp;

          ring.position.set(nx, 0.03, nz);
          ring.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 3) * 0.1);
          renderer.render(scene, camera);
        }
        tick();
        setStatus('ready');

        cleanup = () => {
          cancelAnimationFrame(frame);
          ro.disconnect();
          dispose();
          envMap.dispose();
          pmrem.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        setStatus('failed');
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (entry.isIntersecting && !started) start();
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(section);

    return () => {
      io.disconnect();
      cleanup();
    };
  }, []);

  const zone = ZONES[index];

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink text-cream"
      style={{ height: `${ZONES.length * 70 + 30}vh` }}
      aria-labelledby="tour-title"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun/10 blur-[140px]" />
        <div ref={stageRef} className="absolute inset-0 [&>canvas]:size-full" />

        {status === 'failed' && <img src={zone.photo} alt="" className="absolute inset-0 size-full object-cover opacity-60" />}
        {status === 'idle' && <p className="label absolute inset-x-0 top-1/2 text-center text-cream/40">Loading the 3D floor…</p>}

        <div className="wrap pointer-events-none relative flex h-full flex-col justify-end pb-6 pt-24 md:justify-center md:pb-0">
          <div className="pointer-events-auto max-w-md">
            <Eyebrow num="03" className="text-sun">
              <span id="tour-title">Walk the floor in 3D</span>
            </Eyebrow>
            <div className="glass-dark mt-4 overflow-hidden rounded-[28px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={zone.time}
                  initial={{ opacity: 0, y: 24, rotateX: -12 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -24, rotateX: 12 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  style={{ transformPerspective: 900 }}
                  className="grid grid-cols-[96px_1fr] gap-4 p-4 md:grid-cols-[120px_1fr] md:p-5"
                >
                  <img src={zone.photo} alt={`Real photo: ${zone.title}`} className="aspect-square w-full rounded-2xl object-cover" />
                  <div>
                    <p className="font-mono text-3xl font-medium tracking-tight text-sun md:text-4xl">{zone.time}</p>
                    <h3 className="mt-1 text-lg font-semibold leading-tight tracking-tight md:text-xl">{zone.title}</h3>
                    <p className="mt-1.5 text-sm text-cream/65">{zone.text}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <ol className="flex gap-1.5 px-5 pb-4" aria-label="Tour progress">
                {ZONES.map((z, i) => (
                  <li key={z.time} className="h-1 flex-1 overflow-hidden rounded-full bg-white/12">
                    <span className={`block h-full origin-left rounded-full bg-sun transition-transform duration-500 ${i <= index ? 'scale-x-100' : 'scale-x-0'}`} />
                  </li>
                ))}
              </ol>
            </div>
            <AnimatePresence>
              {index === ZONES.length - 1 && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex flex-wrap gap-3">
                  <Button href={waLink(TOUR_MSG)}>Book the real tour</Button>
                  <Button href={CONTACT.tel} variant="glass" icon={null}>
                    {CONTACT.phoneDisplay}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="label absolute bottom-4 right-5 text-cream/35 md:right-8">Illustrated layout · not to scale</p>
      </div>
    </section>
  );
}
