/** Intrinsic pixel size of every image in /public, so <img> tags can reserve space (no layout shift). */
export const IMAGE_SIZES = {
  '/img/space/boardroom-wide.webp': [1600, 816],
  '/img/space/boardroom.webp': [1600, 1200],
  '/img/space/building.webp': [1600, 1200],
  '/img/space/desks-green.webp': [1600, 738],
  '/img/space/desks-tall-2.webp': [960, 1280],
  '/img/space/desks-tall.webp': [960, 1280],
  '/img/space/floor-circles.webp': [820, 960],
  '/img/space/floor-long.webp': [1280, 960],
  '/img/space/lounge-bright.webp': [1280, 710],
  '/img/space/meeting-room.webp': [1280, 960],
  '/img/space/office-desk.webp': [896, 738],
  '/img/space/private-office.webp': [1600, 738],
  '/img/space/reception.webp': [1600, 738],
  '/img/space/team-room-bright.webp': [1600, 1200],
  '/img/space/multan-tomb.webp': [900, 900],
  '/img/logo.webp': [720, 129],
  '/img/logo-red.webp': [720, 129],
  '/video/walkin-poster.webp': [1600, 900]
};

const AVATAR_SIZE = [128, 128]; // illustrated reviewer avatars in /img/reviews

/**
 * `src` plus its intrinsic width and height, to spread onto an <img>: <img {...sized(IMG.lounge)} alt="" />.
 * Unknown sources (e.g. external photos) come back with just `src`.
 * @param {string} src
 * @returns {{ src: string, width?: number, height?: number }}
 */
export function sized(src) {
  const size = IMAGE_SIZES[src] ?? (src?.startsWith('/img/reviews/') ? AVATAR_SIZE : null);
  return size ? { src, width: size[0], height: size[1] } : { src };
}
