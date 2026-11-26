import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { SmoothScroll, useLenis } from './lib/SmoothScroll.jsx';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { FloatingWhatsApp, ScrollProgress } from './components/layout/Chrome.jsx';
import { CoworkFloaters } from './components/layout/CoworkFloaters.jsx';
import { Home } from './pages/Home.jsx';

// Every page except Home is split into its own chunk.
const loaders = {
  spaces: () => import('./pages/Spaces.jsx').then((m) => ({ default: m.Spaces })),
  about: () => import('./pages/About.jsx').then((m) => ({ default: m.About })),
  contact: () => import('./pages/Contact.jsx').then((m) => ({ default: m.Contact })),
  privacy: () => import('./pages/Privacy.jsx').then((m) => ({ default: m.Privacy })),
  notFound: () => import('./pages/NotFound.jsx').then((m) => ({ default: m.NotFound })),
  coworking: () => import('./pages/services/Coworking.jsx').then((m) => ({ default: m.Coworking })),
  dedicated: () => import('./pages/services/DedicatedDesk.jsx').then((m) => ({ default: m.DedicatedDesk })),
  private: () => import('./pages/services/PrivateOffice.jsx').then((m) => ({ default: m.PrivateOffice })),
  meeting: () => import('./pages/services/MeetingRoom.jsx').then((m) => ({ default: m.MeetingRoom })),
  instant: () => import('./pages/services/InstantOffice.jsx').then((m) => ({ default: m.InstantOffice })),
};

const Spaces = lazy(loaders.spaces);
const About = lazy(loaders.about);
const Contact = lazy(loaders.contact);
const Privacy = lazy(loaders.privacy);
const NotFound = lazy(loaders.notFound);
const Coworking = lazy(loaders.coworking);
const DedicatedDesk = lazy(loaders.dedicated);
const PrivateOffice = lazy(loaders.private);
const MeetingRoom = lazy(loaders.meeting);
const InstantOffice = lazy(loaders.instant);

/** Keeps the ink curtain up while a page chunk downloads, so the transition never flashes. */
function Curtain() {
  return <div aria-hidden="true" className="fixed inset-0 z-[90] bg-ink" />;
}

/** Warm the other pages once the browser is idle, so later navigation is instant. */
function usePrefetchPages() {
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => Object.values(loaders).forEach((load) => load()));
    return () => cancel(id);
  }, []);
}

/** Old WordPress URLs are kept as the canonical paths so search rankings carry over. */
function AnimatedRoutes() {
  const location = useLocation();
  const lenis = useLenis();

  function resetScroll() {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }

  return (
    <AnimatePresence mode="wait" onExitComplete={resetScroll}>
      <Suspense key={location.pathname} fallback={<Curtain />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/coworking-space" element={<Coworking />} />
          <Route path="/dedicated-desk-coworking-space" element={<DedicatedDesk />} />
          <Route path="/private-office-space" element={<PrivateOffice />} />
          <Route path="/meeting-room" element={<MeetingRoom />} />
          <Route path="/instant-office-space" element={<InstantOffice />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export function App() {
  usePrefetchPages();

  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:rounded-full focus:bg-sun focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CoworkFloaters />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
