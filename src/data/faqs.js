/** FAQ answers come from the current site; the last few are drawn from its service pages. */
export const FAQS = {
  amenities: {
    q: "What's included in a Let's Work membership?",
    a: 'High-speed internet, ergonomic furniture, meeting rooms, printing, complimentary refreshments, private lockers, free parking, office boy service and regular networking events.',
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
  terms: {
    q: 'Do I need to sign a long contract?',
    a: 'No. Book by the hour, day or week. You pay only for the time you use — no long-term commitment and no hidden fees.',
  },
  where: {
    q: 'Where exactly are you?',
    a: 'Nandla Chowk, Shuhada Road, Multan. Free parking is available on site.',
  },
  tour: {
    q: 'Can I see the space before I book?',
    a: 'Please do. Tours are free — send us a WhatsApp or call 0326-6802515 and pick a time that suits you.',
  },
};

export const HOME_FAQ = ['amenities', 'terms', 'meetings', 'trial', 'customize', 'tour'].map((k) => FAQS[k]);
