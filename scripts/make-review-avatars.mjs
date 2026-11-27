/**
 * Draws the illustrated reviewer avatars in /public/img/reviews (run once: `node scripts/make-review-avatars.mjs`).
 * They are cartoon illustrations, not photos of real people. When real Google reviews are added,
 * use each reviewer's own Google profile photo instead.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

const OUT = 'public/img/reviews';

const BASE = {
  size: 128,
  radius: 50,
  eyes: ['happy'],
  mouth: ['smile'],
  eyebrows: ['defaultNatural'],
  accessoriesProbability: 0,
  hatColor: ['25557c'],
};

const MAN = { facialHairProbability: 100, hairColor: ['2c1b18'], facialHairColor: ['2c1b18'] };
const WOMAN = { facialHairProbability: 0, hairColor: ['2c1b18'] };

/** One entry per reviewer slug used in src/data/reviews.js. */
const PEOPLE = {
  'ahmed-raza': { ...MAN, skinColor: ['d08b5b'], top: ['shortFlat'], facialHair: ['beardMedium'], clothing: ['blazerAndShirt'], clothesColor: ['262e33'], backgroundColor: ['fbe2a1'] },
  'ayesha-malik': { ...WOMAN, skinColor: ['edb98a'], top: ['hijab'], hatColor: ['25557c'], clothing: ['shirtScoopNeck'], clothesColor: ['25557c'], backgroundColor: ['c9dcef'] },
  'usman-tariq': { ...MAN, skinColor: ['ae5d29'], top: ['theCaesarAndSidePart'], facialHair: ['beardLight'], clothing: ['collarAndSweater'], clothesColor: ['3c4f5c'], backgroundColor: ['d7e8d0'] },
  'hira-siddiqui': { ...WOMAN, skinColor: ['d08b5b'], top: ['straight01'], clothing: ['shirtVNeck'], clothesColor: ['ff5c5c'], backgroundColor: ['f6d3cf'], accessoriesProbability: 100, accessories: ['round'] },
  'bilal-qureshi': { ...MAN, skinColor: ['edb98a'], top: ['shortWaved'], facialHair: ['beardMajestic'], clothing: ['shirtCrewNeck'], clothesColor: ['5199e4'], backgroundColor: ['e7dcc8'] },
  'fatima-noor': { ...WOMAN, skinColor: ['ae5d29'], top: ['hijab'], hatColor: ['929598'], clothing: ['blazerAndSweater'], clothesColor: ['262e33'], backgroundColor: ['fbe2a1'] },
  'hamza-sheikh': { ...MAN, skinColor: ['d08b5b'], top: ['shortCurly'], facialHair: ['beardLight'], clothing: ['hoodie'], clothesColor: ['25557c'], backgroundColor: ['c9dcef'] },
  'zainab-iqbal': { ...WOMAN, skinColor: ['edb98a'], top: ['longButNotTooLong'], clothing: ['shirtScoopNeck'], clothesColor: ['a7ffc4'], backgroundColor: ['d7e8d0'] },
};

mkdirSync(OUT, { recursive: true });
for (const [slug, options] of Object.entries(PEOPLE)) {
  const svg = createAvatar(avataaars, { ...BASE, ...options, seed: slug }).toString();
  writeFileSync(`${OUT}/${slug}.svg`, svg);
}
