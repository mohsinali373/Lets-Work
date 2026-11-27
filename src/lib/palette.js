import { useSyncExternalStore } from 'react';

/**
 * The site's two colour themes. Visitors switch between them with the "Colours" tab
 * (components/layout/PaletteSwitcher.jsx).
 *
 * The colours themselves live in src/styles/index.css: Deep Ocean is the default @theme,
 * Logo Clean overrides it under :root[data-theme="logo-clean"]. A small script in
 * index.html applies the saved theme before first paint, so there is no colour flash.
 * `ink` / `sun` here are only used to draw the swatch dots in the switcher.
 */
export const PALETTES = [
  { id: 'ocean', name: 'Deep Ocean', logo: '/img/logo.webp', ink: '#082236', sun: '#f5b82e' },
  { id: 'logo-clean', name: 'Logo Clean', logo: '/img/logo-red.webp', ink: '#0f1d5a', sun: '#da2c2c' },
];

const STORAGE_KEY = 'lw-theme'; // keep in sync with the script in index.html
const listeners = new Set();

function findPalette(id) {
  return PALETTES.find((p) => p.id === id);
}

function readSavedId() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage blocked (private mode etc.) — fall back to the default theme
  }
}

function readInitialPalette() {
  const fromUrl = new URLSearchParams(window.location.search).get('palette');
  return findPalette(fromUrl) ?? findPalette(readSavedId()) ?? PALETTES[0];
}

function applyPalette(palette) {
  const root = document.documentElement;
  if (palette === PALETTES[0]) delete root.dataset.theme;
  else root.dataset.theme = palette.id;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palette.ink);
}

let current = readInitialPalette();
applyPalette(current);

export function setPalette(id) {
  const next = findPalette(id);
  if (!next || next === current) return;
  current = next;
  applyPalette(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, next.id);
  } catch {
    // storage blocked — the theme still applies for this visit
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

/** The active theme; components re-render when it changes. */
export function usePalette() {
  return useSyncExternalStore(subscribe, () => current);
}
