import { Wifi, Lock, Armchair, ConciergeBell, Car, Presentation, Snowflake, Users } from 'lucide-react';

/** Facilities from the old letswork.pk service pages, plus the AC and networking listed on the monthly plans. No printing or refreshments. */
export const AMENITIES = [
  { icon: Wifi, name: 'High-speed internet', note: 'Fast, stable Wi-Fi across the floor — calls stay clear.' },
  { icon: Lock, name: 'Private lockers', note: 'Lock your laptop and files away. Walk in light tomorrow.' },
  { icon: Armchair, name: 'Dedicated desks', note: 'Ergonomic chairs and proper desks, not café stools.' },
  { icon: ConciergeBell, name: 'Office boy facility', note: 'Someone on hand through the day — just ask at the desk.' },
  { icon: Car, name: 'Free parking', note: 'Park right here. No circling Nandla Chowk.' },
  { icon: Presentation, name: 'Meeting rooms', note: 'Book a slot for pitches, interviews and workshops.' },
  { icon: Snowflake, name: 'Fully air-conditioned', note: 'Cool and comfortable, even in a Multan June.' },
  { icon: Users, name: 'Networking events', note: 'Skill-sharing sessions and people worth knowing.' },
];
