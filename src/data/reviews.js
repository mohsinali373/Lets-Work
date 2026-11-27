/**
 * Google reviews shown above the closing call-to-action on every page.
 *
 * ⚠️ SAMPLE CONTENT. The rating, count and reviews below are placeholders.
 * Before the site goes live, replace them with real reviews copied from the
 * Let's Work Google Business Profile. Publishing invented reviews breaks
 * Google's review policy and misleads visitors.
 *
 * For each real review, copy: the reviewer's name, their profile photo URL
 * (right-click the photo on Google Maps → "Copy image address"), the star rating,
 * the date and the text. Leave `photo` empty to show a Google-style initial.
 * The current photos are illustrated avatars drawn by scripts/make-review-avatars.mjs.
 */

const avatar = (slug) => `/img/reviews/${slug}.svg`;

/** Overall rating as shown on the Google Business Profile. */
export const GOOGLE_RATING = {
  rating: 4.9,
  count: 120,
  // Share of reviews at each star level, 5★ first (percent). Copy from the profile's rating bars.
  breakdown: [92, 6, 1, 0, 1],
  // Opens the Let's Work listing on Google Maps. Swap for the exact listing link once you have it.
  url: 'https://www.google.com/maps/search/?api=1&query=Let%27s+Work+Coworking+Nandla+Chowk+Shuhada+Road+Multan',
};

/**
 * @typedef {{ name: string, role?: string, photo?: string, stars: number, date: string, text: string }} Review
 * `date` is YYYY-MM-DD; the page turns it into "2 weeks ago" from today's date.
 * @type {Review[]}
 */
export const REVIEWS = [
  {
    name: 'Ahmed Raza',
    role: 'Freelance developer',
    photo: avatar('ahmed-raza'),
    stars: 5,
    date: '2026-11-12',
    text: 'Best coworking space in Multan. Fast internet, the AC actually works and the staff are very cooperative. I come here every day now.',
  },
  {
    name: 'Ayesha Malik',
    role: 'Marketing consultant',
    photo: avatar('ayesha-malik'),
    stars: 5,
    date: '2026-10-28',
    text: 'Booked the meeting room for a client presentation. Clean, quiet and the TV setup was ready before we arrived. Highly recommended.',
  },
  {
    name: 'Usman Tariq',
    role: 'Startup founder',
    photo: avatar('usman-tariq'),
    stars: 5,
    date: '2026-10-09',
    text: 'Our team of four moved into a private office here. Same-day setup and no long contract — exactly what a small startup needs.',
  },
  {
    name: 'Hira Siddiqui',
    role: 'Content writer',
    photo: avatar('hira-siddiqui'),
    stars: 4,
    date: '2026-09-21',
    text: 'Very peaceful environment for freelancing. The private lockers mean I don’t carry my laptop home every day.',
  },
  {
    name: 'Bilal Qureshi',
    role: 'Dedicated desk member',
    photo: avatar('bilal-qureshi'),
    stars: 5,
    date: '2026-09-02',
    text: 'Took the free tour first and signed up for a dedicated desk the same day. Shuhada Road location is easy to reach from anywhere.',
  },
  {
    name: 'Fatima Noor',
    role: 'Graphic designer',
    photo: avatar('fatima-noor'),
    stars: 5,
    date: '2026-08-15',
    text: 'Professional place with a friendly vibe. I meet other freelancers and business owners here, which has helped my work a lot.',
  },
  {
    name: 'Hamza Sheikh',
    role: 'Remote software engineer',
    photo: avatar('hamza-sheikh'),
    stars: 5,
    date: '2026-07-30',
    text: 'I work late hours with foreign clients and the space stays comfortable and secure. Fibre internet has never let me down on a call.',
  },
  {
    name: 'Zainab Iqbal',
    role: 'Online tutor',
    photo: avatar('zainab-iqbal'),
    stars: 5,
    date: '2026-07-11',
    text: 'Quiet corners for my online classes and a proper lounge for breaks. Much better than working from home with all the noise.',
  },
];
