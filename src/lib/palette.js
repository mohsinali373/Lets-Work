import { useSyncExternalStore } from 'react';

/**
 * TEMPORARY: the two colour directions the client is choosing between.
 * Each palette rewrites the theme tokens from src/styles/index.css and picks its logo.
 * Once one is chosen, bake its values into index.css and delete this file + PaletteSwitcher.
 */
export const PALETTES = [
  {
    id: 'ocean',
    name: 'Deep Ocean',
    note: 'Dark blue with a teal hint, yellow accent',
    logo: '/img/logo.png',
    ink: '#082236', soft: '#10324c', graphite: '#465d6c',
    sun: '#f5b82e', sunSoft: '#fbe2a1', sunDeep: '#c98d07', onSun: '#082236',
    cream: '#f3eee3', creamDeep: '#e8dfcc', paper: '#faf7f0',
  },
  {
    id: 'logo-clean',
    name: 'Logo Clean',
    note: 'Logo blue + red on crisp cool white',
    logo: '/img/logo-red.png',
    ink: '#0f1d5a', soft: '#172a78', graphite: '#4c5577',
    sun: '#da2c2c', sunSoft: '#f8d1d1', sunDeep: '#b01f22', onSun: '#ffffff',
    cream: '#f1f3f8', creamDeep: '#dfe4ee', paper: '#fafbfd',
  },
];

const TOKENS = {
  ink: '--color-ink', soft: '--color-ink-soft', graphite: '--color-graphite',
  sun: '--color-sun', sunSoft: '--color-sun-soft', sunDeep: '--color-sun-deep', onSun: '--color-on-sun',
  cream: '--color-cream', creamDeep: '--color-cream-deep', paper: '--color-paper',
};
const STORAGE_KEY = 'lw-palette-final';
const listeners = new Set();

function findPalette(id) {
  return PALETTES.find((p) => p.id === id);
}

function readInitialPalette() {
  const fromUrl = new URLSearchParams(window.location.search).get('palette');
  return findPalette(fromUrl) ?? findPalette(window.localStorage.getItem(STORAGE_KEY)) ?? PALETTES[0];
}

function applyPalette(palette) {
  const root = document.documentElement.style;
  Object.entries(TOKENS).forEach(([key, cssVar]) => root.setProperty(cssVar, palette[key]));
}

let current = readInitialPalette();
applyPalette(current); // before first paint, so there is no flash of the old colours

export function setPalette(id) {
  const next = findPalette(id);
  if (!next || next === current) return;
  current = next;
  applyPalette(next);
  window.localStorage.setItem(STORAGE_KEY, next.id);
  listeners.forEach((notify) => notify());
}

function subscribe(notify) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

/** The active palette; components re-render when it changes. */
export function usePalette() {
  return useSyncExternalStore(subscribe, () => current);
}
