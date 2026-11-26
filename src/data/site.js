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

/** Add real profile URLs here ({ label, href }) and they appear in the footer automatically. */
export const SOCIAL = [];

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
const space = (name) => `/img/space/${name}.jpg`;

export const IMG = {
  logo: '/img/logo.png',
  building: space('building'), // outside, signage on Shuhada Road
  exteriorWide: space('exterior-wide'),
  boardroom: space('boardroom'), // yellow feature wall, long table
  boardroomU: space('boardroom-u'),
  boardroomSide: space('boardroom-side'),
  meetingRoom: space('meeting-room'),
  teamRoom: space('team-room'), // smaller room, green desks + TV
  privateOffice: space('private-office'), // manager desk, yellow wall
  privateDesk: space('private-desk'),
  reception: space('reception'),
  floorLong: space('floor-long'), // long desks, round yellow wall
  floorPeople: space('floor-people'), // members working, blue sofa
  hotDesks: space('hot-desks'), // green-divider desks, wide
  desksTall: space('desks-tall'), // portrait
  desksTall2: space('desks-tall-2'), // portrait, logo wall
  lounge: space('lounge'), // blue sofa, green wall, plant
  // Atmosphere shot kept for the "door's open" scroll reveal on the home page (client's choice).
  openOffice: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=72',
};

/** Every real photo, for galleries. */
export const GALLERY = [
  { src: IMG.boardroom, label: 'Boardroom' },
  { src: IMG.hotDesks, label: 'Hot desks' },
  { src: IMG.lounge, label: 'Lounge' },
  { src: IMG.privateOffice, label: 'Private office' },
  { src: IMG.floorPeople, label: 'The floor' },
  { src: IMG.teamRoom, label: 'Team room' },
  { src: IMG.desksTall, label: 'Window desks' },
  { src: IMG.reception, label: 'Reception' },
  { src: IMG.boardroomU, label: 'Training setup' },
  { src: IMG.floorLong, label: 'Long tables' },
  { src: IMG.desksTall2, label: 'Dedicated desks' },
  { src: IMG.building, label: 'Shuhada Road' },
];

export const NAV = [
  { label: 'Spaces', to: '/spaces', mega: true },
  { label: 'About', to: '/about-us' },
  { label: 'Contact', to: '/contact-us' },
];
