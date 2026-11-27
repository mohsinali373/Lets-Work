import { IMG } from './site.js';
import { LOWEST_SOLO_PRICE, LOWEST_TEAM_PRICE, formatPrice } from './plans.js';

/**
 * The five Let's Work products. Copy is rewritten from the current letswork.pk pages.
 * Paths keep the old WordPress slugs so existing search rankings carry over.
 */
export const SERVICES = [
  {
    id: 'coworking',
    path: '/coworking-space',
    num: '01',
    name: 'Coworking Space',
    short: 'Coworking',
    tag: 'Hot desk / Flexible',
    oneLiner: 'Pick any open seat, plug in, get going.',
    blurb:
      'An open, bright floor for freelancers, founders and startups — with the community and amenities of a big office at a budget-friendly rate.',
    image: IMG.floorLong,
    thumb: IMG.hotDesks,
    tone: 'paper',
  },
  {
    id: 'dedicated',
    path: '/dedicated-desk-coworking-space',
    num: '02',
    name: 'Dedicated Desk',
    short: 'Dedicated Desk',
    tag: 'Your desk / Every day',
    oneLiner: 'Same desk every morning. Your stuff stays put.',
    blurb:
      'Claim your spot in the community — a personal desk, secure storage and high-speed internet that is ready when you are.',
    image: IMG.desksTall,
    thumb: IMG.desksTall2,
    tone: 'ink',
  },
  {
    id: 'private',
    path: '/private-office-space',
    num: '03',
    name: 'Private Office',
    short: 'Private Office',
    tag: 'Lockable / Team-ready',
    oneLiner: 'A door that closes and an address clients respect.',
    blurb:
      'Fully furnished, serviced private offices for individuals and teams who need quiet, privacy and room to grow.',
    image: IMG.privateOffice,
    thumb: IMG.officeDesk,
    tone: 'sun',
  },
  {
    id: 'meeting',
    path: '/meeting-room',
    num: '04',
    name: 'Meeting Room',
    short: 'Meeting Room',
    tag: 'Members / Pitch-ready',
    oneLiner: 'Pitch, interview or workshop in a room that looks the part.',
    blurb:
      'Premium meeting rooms with modern tech and comfortable seating — from a small room for one-to-ones to a long table for the whole team.',
    image: IMG.boardroom,
    thumb: IMG.meetingRoom,
    tone: 'deep',
  },
  {
    id: 'instant',
    path: '/instant-office-space',
    num: '05',
    name: 'Instant Office',
    short: 'Instant Office',
    tag: 'Same day / Monthly',
    oneLiner: 'Need an office by this afternoon? Done.',
    blurb:
      'A fully equipped shared office on short notice. Pick a monthly plan in the morning and start working the same day.',
    image: IMG.teamRoom,
    thumb: IMG.lounge,
    tone: 'glass',
  },
];

/**
 * @param {string} id
 */
export function getService(id) {
  return SERVICES.find((s) => s.id === id);
}

/** How Let's Work charges: every space runs on a monthly plan. */
export const MONTHLY_TERMS = [
  { label: 'Billed', big: 'Monthly', line: 'One fixed fee a month, with internet, AC and parking included.' },
  { label: 'Desks from', big: formatPrice(LOWEST_SOLO_PRICE), line: 'Silver, Gold and Diamond plans for freelancers and solo workers.' },
  { label: 'Team offices from', big: formatPrice(LOWEST_TEAM_PRICE), line: 'Private, lockable offices for teams of 6–8 people.' },
];

export const MONTHLY_TERMS_NOTE =
  'Need a space for only a week or two? We can arrange it, but it is charged at the monthly rate. A one-month security deposit applies to all plans.';
