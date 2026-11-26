import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { CONTACT, IMG, TOUR_MSG, waLink } from '../../../data/site.js';
import { Button } from '../../ui/Button.jsx';
import { EASE_OUT } from '../../../lib/motion.js';
import { ROUTE, STOPS, buildScene } from './buildScene.js';

const ZONES = [
  { time: '08:45', title: 'Welcome to the floor', text: 'Every room on one floor at Nandla Chowk.', photo: IMG.building },
  { time: '08:50', title: 'Say hi at reception', text: 'Free parking outside, your free tour starts here.', photo: IMG.reception },
  { time: '09:30', title: 'Grab a hot desk', text: 'Fast Wi-Fi, monitors, ergonomic chairs.', photo: IMG.hotDesks },
  { time: '12:15', title: 'Chai on call in the lounge', text: 'Blue sofas and an office boy with the tea.', photo: IMG.lounge },
  { time: '15:00', title: 'Pitch in the boardroom', text: 'Long table, big screen — by the hour.', photo: IMG.boardroom },
  { time: '16:30', title: 'Close the door', text: 'Private offices for calls and focus.', photo: IMG.privateOffice },
  { time: '18:30', title: "That's the whole floor", text: 'Five ways to work, one address.', photo: IMG.floorPeople },
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

/** Where the camera should be for scroll progress p. */
function poseAt(p) {
  const { i, f } = stopAt(p);
  const mix = (k) => STOPS[i][k].map((v, n) => lerp(v, STOPS[i + 1][k][n], f));
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
  const t = Math.min(1, Math.max(0, (s - CUM[k]) / (CUM[k + 1] - CUM[k] || 1)));
  const [ax, az] = ROUTE[k].p;
  const [bx, bz] = ROUTE[k + 1].p;
  return [lerp(ax, bx, t), lerp(az, bz, t)];
}

function lerpAngle(a, b, t) {
  const d = ((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  return a + d * t;
}

/**
 * Pinned scroll section: a Three.js diorama of the floor. The camera flies zone to zone while a
 * member walks the aisles. three.js and its add-ons download only when the section gets close.
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
        const [THREE, rb, env, bgu, ec, rp, gt, op] = await Promise.all([
          import('three'),
          import('three/addons/geometries/RoundedBoxGeometry.js'),
          import('three/addons/environments/RoomEnvironment.js'),
          import('three/addons/utils/BufferGeometryUtils.js'),
          import('three/addons/postprocessing/EffectComposer.js'),
          import('three/addons/postprocessing/RenderPass.js'),
          import('three/addons/postprocessing/GTAOPass.js'),
          import('three/addons/postprocessing/OutputPass.js'),
        ]);

        const isSmall = window.innerWidth < 768;
        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.88;
        renderer.domElement.setAttribute('aria-hidden', 'true');
        stage.appendChild(renderer.domElement);

        const { scene, ring, person, dispose } = buildScene(THREE, {
          RoundedBoxGeometry: rb.RoundedBoxGeometry,
          mergeGeometries: bgu.mergeGeometries,
        });
        const pmrem = new THREE.PMREMGenerator(renderer);
        const envMap = pmrem.fromScene(new env.RoomEnvironment(), 0.04).texture;
        scene.environment = envMap;
        scene.environmentIntensity = 0.5;

        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
        const start0 = poseAt(progressRef.current);
        camera.position.fromArray(start0.pos);
        const look = new THREE.Vector3().fromArray(start0.look);
        const targetPos = new THREE.Vector3();
        const targetLook = new THREE.Vector3();
        const [px0, pz0] = walkerAt(progressRef.current);
        person.group.position.set(px0, 0, pz0);
        let stride = 0;
        let yaw = 0;

        // Ambient occlusion: soft contact shadows where furniture meets the floor (skipped on phones).
        const composer = new ec.EffectComposer(renderer);
        composer.addPass(new rp.RenderPass(scene, camera));
        let gtao = null;
        if (!isSmall) {
          gtao = new gt.GTAOPass(scene, camera, 1, 1);
          gtao.updateGtaoMaterial({ radius: 0.45, distanceExponent: 1.5, thickness: 1, scale: 1.25, samples: 16 });
          gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 16 });
          composer.addPass(gtao);
        }
        composer.addPass(new op.OutputPass());

        let dirty = true;
        function resize() {
          const { clientWidth: w, clientHeight: h } = stage;
          renderer.setSize(w, h, false);
          composer.setSize(w, h);
          camera.aspect = w / h;
          camera.fov = w < 768 ? 46 : 32;
          camera.updateProjectionMatrix();
          dirty = true;
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
          const camMove = camera.position.distanceTo(targetPos) + look.distanceTo(targetLook);
          camera.position.lerp(targetPos, 0.08);
          look.lerp(targetLook, 0.08);
          camera.lookAt(look);

          const [tx, tz] = walkerAt(progressRef.current);
          const g = person.group.position;
          const nx = lerp(g.x, tx, 0.1);
          const nz = lerp(g.z, tz, 0.1);
          const moved = Math.hypot(nx - g.x, nz - g.z);
          if (moved > 0.0015) yaw = lerpAngle(yaw, Math.atan2(nx - g.x, nz - g.z), 0.18);
          g.set(nx, Math.abs(Math.sin(stride)) * 0.03 * Math.min(1, moved * 45), nz);
          person.group.rotation.y = yaw;
          stride += moved * 7;
          const swing = Math.sin(stride) * 0.6 * Math.min(1, moved * 45);
          person.legs[0].rotation.x = swing;
          person.legs[1].rotation.x = -swing;
          person.arms[0].rotation.x = -swing * 0.8;
          person.arms[1].rotation.x = swing * 0.8;
          ring.position.set(nx, 0.012, nz);
          ring.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 3) * 0.1);

          // Only re-render when something actually changes (the ring pulse is cheap to skip).
          if (dirty || camMove > 0.002 || moved > 0.0005 || Math.round(clock.getElapsedTime() * 30) % 2 === 0) {
            composer.render();
            dirty = false;
          }
        }
        tick();
        setStatus('ready');

        cleanup = () => {
          cancelAnimationFrame(frame);
          ro.disconnect();
          dispose();
          gtao?.dispose();
          composer.dispose();
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
  const isLast = index === ZONES.length - 1;

  return (
    <section ref={sectionRef} className="relative bg-ink text-cream" style={{ height: `${ZONES.length * 70 + 30}vh` }} aria-labelledby="tour-title">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={stageRef} className="absolute inset-0 [&>canvas]:size-full" />
        {status === 'failed' && <img src={zone.photo} alt="" className="absolute inset-0 size-full object-cover opacity-60" />}
        {status === 'idle' && <p className="label absolute inset-x-0 top-1/2 text-center text-cream/40">Loading the 3D floor…</p>}

        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ink/70 to-transparent pb-16 pt-24 md:pt-28">
          <div className="wrap flex items-end justify-between gap-4">
            <h2 id="tour-title" className="text-xl font-semibold tracking-tight md:text-2xl">
              Walk the floor <span className="accent text-sun">in 3D</span>
            </h2>
            <p className="label hidden text-cream/40 sm:block">Illustrated layout · not to scale</p>
          </div>
        </div>

        {/* slim caption bar — keeps the scene clear */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-5 md:pb-8">
          <div className="glass-dark mx-auto flex max-w-2xl items-center gap-3 rounded-[22px] p-2.5 pr-4 md:gap-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={zone.time}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="flex min-w-0 flex-1 items-center gap-3 md:gap-4"
              >
                <img src={zone.photo} alt={`Real photo: ${zone.title}`} className="size-14 shrink-0 rounded-2xl object-cover md:size-16" />
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold tracking-tight md:text-lg">
                    <span className="mr-2 font-mono text-sun">{zone.time}</span>
                    {zone.title}
                  </p>
                  <p className="truncate text-sm text-cream/60">{zone.text}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            {isLast ? (
              <Button href={waLink(TOUR_MSG)} className="hidden shrink-0 !py-1.5 !text-sm sm:inline-flex">
                Book the real tour
              </Button>
            ) : (
              <ol className="hidden shrink-0 gap-1 sm:flex" aria-label="Tour progress">
                {ZONES.map((z, i) => (
                  <li key={z.time} className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-sun' : i < index ? 'w-1.5 bg-sun/60' : 'w-1.5 bg-white/20'}`} />
                ))}
              </ol>
            )}
          </div>
          {isLast && (
            <p className="mt-2 text-center text-sm text-cream/60 sm:hidden">
              <a href={CONTACT.tel} className="ulink">
                Call {CONTACT.phoneDisplay}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
