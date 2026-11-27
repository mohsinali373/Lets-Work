import { IMG } from './site.js';

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
    tag: 'By the hour',
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
    tag: 'Same day / No lease',
    oneLiner: 'Need an office by this afternoon? Done.',
    blurb:
      'A fully equipped shared office on short notice. No leases, no paperwork — book by the hour, day or week and pay only for what you use.',
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

export const FLEX_TERMS = [
  { unit: 'Hour', line: 'A focused sprint or one client meeting.' },
  { unit: 'Day', line: 'A full workday with everything included.' },
  { unit: 'Week', line: 'A project, a visit, or a trial run.' },
];
