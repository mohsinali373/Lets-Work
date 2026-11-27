import { SOLO_PLANS, TEAM_PLANS, LOWEST_TEAM_PRICE, formatPrice } from './plans.js';

/**
 * FAQ answers, written answer-first so search engines and AI assistants can quote them directly.
 * Every list in PAGE_FAQS is shown on its page AND sent as FAQPage structured data, so the two never drift.
 * Prices are read from plans.js.
 */
const solo = Object.fromEntries(SOLO_PLANS.map((p) => [p.id, formatPrice(p.price)]));
const teamRange = `${formatPrice(LOWEST_TEAM_PRICE)} to ${formatPrice(Math.max(...TEAM_PLANS.map((p) => p.price)))}`;

export const FAQS = {
  price: {
    q: 'How much does a coworking space in Multan cost at Let’s Work?',
    a: `For one person, it’s ${solo.silver} a month for a shared desk (Silver), ${solo.gold} for your own fixed desk (Gold) or ${solo.diamond} for our premium desk (Diamond). A private office for a team of 6–8 is ${teamRange} a month. Every plan has a one-month security deposit.`,
  },
  terms: {
    q: 'Do you rent by the hour, day or week?',
    a: 'No — all our plans are monthly, so there are no hourly or daily rates. Only need a space for a week or two? Talk to us and we’ll sort it out, but it’s charged at the monthly price. No long lease, no hidden fees.',
  },
  hotVsDedicated: {
    q: 'What is the difference between a hot desk and a dedicated desk?',
    a: `With a hot desk (Silver, ${solo.silver} a month) you sit wherever there’s a free seat on the shared floor. A dedicated desk (Gold at ${solo.gold} or Diamond at ${solo.diamond}) is the same desk every day — yours, so you can leave your things on it.`,
  },
  privateSize: {
    q: 'How many people fit in a private office?',
    a: `Each office is lockable and fits a team of 6 to 8. You can pick from three — Startup Team, Corporate Team and Executive Team — at ${teamRange} a month.`,
  },
  meetingAccess: {
    q: 'Who can use the meeting rooms?',
    a: 'Our members. Gold comes with guest room access, Diamond with client meeting access, and every team plan includes a guest room. Just message us the date and time and we’ll hold the room for you.',
  },
  instantSpeed: {
    q: 'How fast can I get an instant office?',
    a: 'Usually the same day. Message us in the morning and tell us how many of you there are — if a desk or office is free, you can be working by the afternoon.',
  },
  amenities: {
    q: "What's included in a Let's Work membership?",
    a: 'Fast 5G internet, a proper desk and chair, a private locker, an office boy on hand, free parking, AC and other members to network with. Gold, Diamond and team plans also get meeting room access. Printing and refreshments aren’t included.',
  },
  meetings: {
    q: 'Can I hold team meetings here?',
    a: 'Yes. There are private meeting rooms and open areas for everything from a quick one-to-one to a full-team brainstorm or presentation.',
  },
  trial: {
    q: 'Is there a trial period?',
    a: "We often run trial periods and special offers for new members. Message us on WhatsApp and ask what's running this month.",
  },
  customize: {
    q: 'Can I customise my workspace?',
    a: 'Yes. We can set up a private office or team area around the way you work — the layout, the seating and the storage.',
  },
  where: {
    q: 'Where is Let’s Work in Multan?',
    a: 'We’re at Nandla Chowk on Shuhada Road, Multan — and there’s free parking right outside.',
  },
  tour: {
    q: 'Can I see the space before I book?',
    a: 'Please do — tours are free. WhatsApp or call us on 0326-6802515 and pick a time that suits you.',
  },
};

const pick = (...keys) => keys.map((k) => FAQS[k]);

/** The FAQ list each page shows (and marks up as FAQPage). */
export const PAGE_FAQS = {
  home: pick('price', 'terms', 'hotVsDedicated', 'amenities', 'meetings', 'tour'),
  coworking: pick('price', 'hotVsDedicated', 'amenities', 'terms', 'where'),
  dedicated: pick('hotVsDedicated', 'terms', 'amenities', 'customize', 'tour'),
  private: pick('privateSize', 'customize', 'terms', 'meetingAccess', 'tour'),
  meeting: pick('meetingAccess', 'meetings', 'terms', 'where'),
  instant: pick('instantSpeed', 'terms', 'amenities', 'where'),
};
