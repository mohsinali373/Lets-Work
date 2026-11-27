/** Business facts. Everything here is taken from the current letswork.pk site. */
export const CONTACT = {
  phoneDisplay: '0326-6802515',
  phoneIntl: '+92 326 6802515',
  tel: 'tel:+923266802515',
  whatsapp: 'https://wa.me/923266802515',
  email: 'info@letswork.pk',
  address: 'Nandla Chowk, Shuhada Road, Multan',
  mapEmbed: 'https://www.google.com/maps?q=Nandla+Chowk+Shuhada+Road+Multan&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Nandla+Chowk+Shuhada+Road+Multan',
};

/**
 * Add real profile URLs here ({ label, href }). They appear in the footer and as `sameAs` in the
 * LocalBusiness schema, which tells Google these profiles belong to Let's Work.
 */
export const SOCIAL = [];

/**
 * Opening hours for the LocalBusiness schema. Fill in when confirmed, e.g.
 * { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '21:00' }
 */
export const HOURS = null;

/**
 * Builds a WhatsApp deep link with a pre-written message.
 * @param {string} text
 * @returns {string}
 */
export function waLink(text) {
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const TOUR_MSG = "Hi Let's Work! I'd like to book a free tour of the coworking space.";

/** Real photos of the Let's Work space (from the old letswork.pk media library), in /public/img/space. */
const space = (name) => `/img/space/${name}.webp`;

export const IMG = {
  logo: '/img/logo.webp',
  building: space('building'), // outside, signage on Shuhada Road
  boardroom: space('boardroom'), // yellow feature wall, long table
  boardroomU: space('boardroom-wide'), // U-shaped table, brightened crop
  meetingRoom: space('meeting-room'),
  teamRoom: space('team-room-bright'), // smaller room, green desks + TV
  privateOffice: space('private-office'), // manager desk, yellow wall
  officeDesk: space('office-desk'), // tighter crop of the private office desk
  reception: space('reception'),
  floorLong: space('floor-long'), // long desks, round yellow wall
  floorCircles: space('floor-circles'), // portrait: long tables to the circle wall
  hotDesks: space('desks-green'), // green-divider desks, wide
  desksTall: space('desks-tall'), // portrait
  desksTall2: space('desks-tall-2'), // portrait, logo wall
  lounge: space('lounge-bright'), // blue sofa, green wall, plant
  // Tomb of Shah Rukn-e-Alam, Multan — photo by Shairyar Khan on Unsplash (Unsplash License, free to use)
  multan: space('multan-tomb'),
};


export const NAV = [
  { label: 'Spaces', to: '/spaces', mega: true },
  { label: 'About', to: '/about-us' },
  { label: 'Contact', to: '/contact-us' },
];
