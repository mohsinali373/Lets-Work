import { Wifi, Lock, Armchair, Coffee, Car, Presentation, Printer, CupSoda, Users } from 'lucide-react';

/** Amenities listed on the current letswork.pk site (cards + FAQ answers). */
export const AMENITIES = [
  { icon: Wifi, name: 'High-speed internet', note: 'Fast, stable Wi-Fi across the floor — calls stay clear.' },
  { icon: Lock, name: 'Private lockers', note: 'Lock your laptop and files away. Walk in light tomorrow.' },
  { icon: Armchair, name: 'Dedicated desks', note: 'Ergonomic chairs and proper desks, not café stools.' },
  { icon: Coffee, name: 'Office boy service', note: 'Chai on call. It reaches you before your second email.' },
  { icon: Car, name: 'Free parking', note: 'Park right here. No circling Nandla Chowk.' },
  { icon: Presentation, name: 'Meeting rooms', note: 'Book by the hour for pitches, interviews and workshops.' },
  { icon: Printer, name: 'Printing', note: 'Print the contract, sign it, done.' },
  { icon: CupSoda, name: 'Refreshments', note: 'Complimentary refreshments to keep the day moving.' },
  { icon: Users, name: 'Networking events', note: 'Skill-sharing sessions and people worth knowing.' },
];
