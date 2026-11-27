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
    a: `Solo plans cost ${solo.silver} a month (Silver, flexible shared desk), ${solo.gold} (Gold, dedicated fixed desk) and ${solo.diamond} (Diamond, premium desk). Private team offices for 6–8 people cost ${teamRange} a month. A one-month security deposit applies to all plans.`,
  },
  terms: {
    q: 'Do you rent by the hour, day or week?',
    a: 'No. Every Let’s Work space is rented on a monthly plan — there are no hourly or daily rates. If you only need a space for a week or two, we can arrange it, but it is charged at the monthly rate. There is no long lease and no hidden fees.',
  },
  hotVsDedicated: {
    q: 'What is the difference between a hot desk and a dedicated desk?',
    a: `A hot desk (Silver, ${solo.silver} a month) is a flexible seat on the shared floor — you sit at any open desk. A dedicated desk (Gold, ${solo.gold}, or Diamond, ${solo.diamond}) is a fixed desk that is yours every day, so you can leave your things there.`,
  },
  privateSize: {
    q: 'How many people fit in a private office?',
    a: `Each private office is lockable and seats a team of 6 to 8 people. There are three levels — Startup Team, Corporate Team and Executive Team — priced from ${teamRange} a month.`,
  },
  meetingAccess: {
    q: 'Who can use the meeting rooms?',
    a: 'Meeting rooms are for Let’s Work members on a monthly plan. Gold members get guest room access, Diamond members get client meeting access, and every team plan includes a guest room. Message us a date and time to book a slot.',
  },
  instantSpeed: {
    q: 'How fast can I get an instant office?',
    a: 'Often the same day. Message us in the morning with how many people need space; if a desk or office is free, you can start working that afternoon on a monthly plan.',
  },
  amenities: {
    q: "What's included in a Let's Work membership?",
    a: 'High-speed 5G internet, a desk with ergonomic furniture, private lockers, an office boy facility, free parking, air-conditioning and networking with other members. Gold, Diamond and team plans add meeting room access. Printing and refreshments are not included.',
  },
  meetings: {
    q: 'Can I hold team meetings here?',
    a: 'Yes. We have private meeting rooms and collaborative areas for meetings, brainstorming sessions and presentations — from one-to-ones to full-team sessions.',
  },
  trial: {
    q: 'Is there a trial period?',
    a: "We often run trial periods and special offers for new members. Message us on WhatsApp and ask what's running this month.",
  },
  customize: {
    q: 'Can I customise my workspace?',
    a: 'Yes. Private offices and team areas can be set up around how you work — layout, seating and storage.',
  },
  where: {
    q: 'Where is Let’s Work in Multan?',
    a: 'Let’s Work is at Nandla Chowk, Shuhada Road, Multan, Punjab. Free parking is available on site.',
  },
  tour: {
    q: 'Can I see the space before I book?',
    a: 'Yes. Tours are free — send us a WhatsApp or call 0326-6802515 and pick a time that suits you.',
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
