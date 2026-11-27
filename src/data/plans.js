/**
 * Monthly plans shown in the home page "Plans" section (components/home/PricingPlans.jsx).
 * Prices are in Pakistani rupees per month. `tier` picks the medal colour: silver | gold | diamond.
 */

export const SOLO_PLANS = [
  {
    id: 'silver',
    tier: 'silver',
    name: 'Silver',
    blurb: 'A flexible seat on the shared floor.',
    price: 10999,
    perks: ['Flexible shared desk', '5G high-speed internet', 'Fully air-conditioned', 'Free parking & networking'],
  },
  {
    id: 'gold',
    tier: 'gold',
    name: 'Gold',
    blurb: 'Your own fixed desk, every day.',
    price: 12999,
    badge: 'Best value',
    perks: ['Dedicated fixed desk', 'Priority 5G internet', 'Guest room access', 'Fully air-conditioned', 'Free parking & networking'],
  },
  {
    id: 'diamond',
    tier: 'diamond',
    name: 'Diamond',
    blurb: 'The premium desk with client access.',
    price: 14999,
    perks: ['Premium dedicated desk', 'Uninterrupted 5G internet', 'Client meeting access', 'VIP networking', 'Executive comfort'],
  },
];

export const SOLO_NOTES = [
  { icon: 'coffee', text: 'Tea/coffee & printing are available at extra charges.' },
  { icon: 'shield', text: 'A 1-month security deposit applies to all plans.' },
];

export const TEAM_PLANS = [
  {
    id: 'startup',
    tier: 'silver',
    name: 'Startup Team',
    blurb: 'A lockable office for a growing team.',
    price: 85000,
    rows: [
      { icon: 'space', title: 'Space', text: 'Standard private lockable office (6–8 seats).' },
      { icon: 'wifi', title: 'Facilities', text: '5G internet, AC and comfortable furniture.' },
      { icon: 'tea', title: 'Kitchen & tea', text: 'Full kitchen. Our office boy makes and serves tea — once a day free, more on demand.' },
      { icon: 'car', title: 'Access', text: 'Free parking and a shared guest room.' },
    ],
  },
  {
    id: 'corporate',
    tier: 'gold',
    name: 'Corporate Team',
    blurb: 'A premium office with a better view.',
    price: 95000,
    badge: 'Recommended',
    rows: [
      { icon: 'space', title: 'Space', text: 'Premium private office with a better view and location.' },
      { icon: 'wifi', title: 'Facilities', text: 'Priority 5G internet, AC and executive furniture.' },
      { icon: 'tea', title: 'Kitchen & tea', text: 'Full kitchen. Tea served to your team and guests — twice a day free.' },
      { icon: 'car', title: 'Access', text: 'Free parking, networking events and priority guest handling.' },
    ],
  },
  {
    id: 'executive',
    tier: 'diamond',
    name: 'Executive Team',
    blurb: 'The best room in the space.',
    price: 110000,
    rows: [
      { icon: 'space', title: 'Space', text: 'VIP executive private office — the best room in the space.' },
      { icon: 'wifi', title: 'Facilities', text: 'Uninterrupted 5G internet, AC and premium seating.' },
      { icon: 'tea', title: 'Kitchen & tea', text: 'Full kitchen. A dedicated office boy serves tea on demand, any time.' },
      { icon: 'car', title: 'Access', text: 'Special arrangements for client meetings, free parking and VIP guest handling.' },
    ],
  },
];

export const TEAM_NOTES = [
  { icon: 'lock', text: 'Your own private space' },
  { icon: 'focus', text: 'A productive environment' },
  { icon: 'grow', text: 'Room to grow your team' },
];
