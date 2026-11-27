import { CONTACT, IMG } from './site.js';
import { SOLO_PLANS, TEAM_PLANS, LOWEST_SOLO_PRICE, LOWEST_TEAM_PRICE, formatPrice } from './plans.js';
import { PAGE_FAQS } from './faqs.js';

/**
 * Search, answer-engine and AI-assistant metadata for every page.
 * Plain JS (no JSX) so vite.config.js can also read it at build time to write the
 * site-wide JSON-LD into index.html, plus sitemap.xml and llms.txt.
 */
export const SITE_URL = 'https://letswork.pk';
export const BRAND = "Let's Work";
const BUSINESS_ID = `${SITE_URL}/#localbusiness`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const abs = (path) => `${SITE_URL}${path}`;

const desk = formatPrice(LOWEST_SOLO_PRICE);
const team = formatPrice(LOWEST_TEAM_PRICE);
const gold = formatPrice(SOLO_PLANS.find((p) => p.id === 'gold').price);

export const BUSINESS_DESCRIPTION = `${BRAND} is a coworking space in Multan, Pakistan, at Nandla Chowk, Shuhada Road. It offers hot desks, dedicated desks, private team offices, meeting rooms and instant offices on monthly plans — desks from ${desk} and private offices from ${team} a month — with 5G internet, air-conditioning and free parking.`;

/**
 * One entry per route. `title` gets " | Let's Work Multan" appended unless `fullTitle` is set.
 * `service` adds a Service node; `plans` lists the monthly offers that service is sold under.
 */
export const PAGES = {
  home: {
    path: '/',
    name: 'Home',
    fullTitle: `Coworking Space in Multan from ${desk}/month | ${BRAND}`,
    description: `${BRAND} is a coworking space in Multan at Nandla Chowk, Shuhada Road. Hot desks, dedicated desks and private offices on monthly plans from ${desk}.`,
    faqs: PAGE_FAQS.home,
    priority: '1.0',
  },
  spaces: {
    path: '/spaces',
    name: 'All Workspaces',
    title: 'Office Space & Coworking in Multan',
    description: `Compare every workspace at ${BRAND} Multan — coworking, dedicated desks, private offices, meeting rooms and instant offices, all on simple monthly plans.`,
    priority: '0.9',
  },
  coworking: {
    path: '/coworking-space',
    name: 'Coworking Space',
    title: 'Best Coworking Space in Multan',
    description: `Coworking space in Multan for freelancers and startups. Shared desks from ${desk} a month with 5G internet, AC, free parking and networking events.`,
    faqs: PAGE_FAQS.coworking,
    service: 'Coworking space',
    plans: SOLO_PLANS,
    priority: '0.9',
  },
  dedicated: {
    path: '/dedicated-desk-coworking-space',
    name: 'Dedicated Desk',
    title: 'Dedicated Desk Coworking Space in Multan',
    description: `Your own fixed desk at ${BRAND} Multan from ${gold} a month — priority 5G internet, secure storage, AC and free parking. Book a free tour.`,
    faqs: PAGE_FAQS.dedicated,
    service: 'Dedicated desk',
    plans: SOLO_PLANS.filter((p) => p.id !== 'silver'),
    priority: '0.9',
  },
  private: {
    path: '/private-office-space',
    name: 'Private Office',
    title: 'Private Office Space in Multan',
    description: `Private, lockable office space in Multan for teams of 6–8, from ${team} a month. Furnished, with 5G internet, a full kitchen, tea service and free parking.`,
    faqs: PAGE_FAQS.private,
    service: 'Private office space',
    plans: TEAM_PLANS,
    priority: '0.9',
  },
  meeting: {
    path: '/meeting-room',
    name: 'Meeting Room',
    title: 'Meeting Room in Multan for Pitches & Teams',
    description: `Premium meeting rooms at ${BRAND} Multan for client pitches, interviews and training — modern tech and comfortable seating, for members on our monthly plans.`,
    faqs: PAGE_FAQS.meeting,
    service: 'Meeting room',
    priority: '0.8',
  },
  instant: {
    path: '/instant-office-space',
    name: 'Instant Office',
    title: 'Instant Office Space in Multan',
    description: `Instant office space in Multan, often ready the same day. Furnished desks and private offices on monthly plans from ${desk}, with no long lease.`,
    faqs: PAGE_FAQS.instant,
    service: 'Instant shared office',
    plans: [...SOLO_PLANS, ...TEAM_PLANS],
    priority: '0.8',
  },
  about: {
    path: '/about-us',
    name: 'About Us',
    title: 'About Us',
    type: 'AboutPage',
    description: `${BRAND} is a coworking space at Nandla Chowk, Multan — over 10 years of experience building flexible, professional workspaces for freelancers, startups and teams.`,
    priority: '0.6',
  },
  contact: {
    path: '/contact-us',
    name: 'Contact Us',
    title: 'Contact Us',
    type: 'ContactPage',
    description: `Contact ${BRAND} coworking space in Multan — call or WhatsApp ${CONTACT.phoneDisplay}, email ${CONTACT.email}, or visit us at Nandla Chowk, Shuhada Road.`,
    priority: '0.7',
  },
  privacy: {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    title: 'Privacy Policy',
    description: `How ${BRAND} coworking space in Multan collects and uses your information.`,
    priority: '0.2',
  },
};

/** @param {object} page an entry of PAGES */
export function pageTitle(page) {
  return page.fullTitle ?? `${page.title} | ${BRAND} Multan`;
}

/** A monthly plan as a schema.org Offer. */
function planOffer(plan) {
  return {
    '@type': 'Offer',
    name: `${plan.name} plan`,
    description: plan.blurb,
    price: plan.price,
    priceCurrency: 'PKR',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: plan.price,
      priceCurrency: 'PKR',
      unitCode: 'MON',
      unitText: 'month',
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
    },
    availability: 'https://schema.org/InStock',
    seller: { '@id': BUSINESS_ID },
  };
}

const AMENITIES = ['5G high-speed internet', 'Air-conditioning', 'Free parking', 'Meeting rooms', 'Private lockers', 'Office boy facility', 'Full kitchen', 'Networking events'];

/** Site-wide nodes: the WebSite and the LocalBusiness. Written into index.html at build time. */
export function siteGraph() {
  return [
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: BRAND,
      alternateName: "Let's Work Coworking Space Multan",
      url: `${SITE_URL}/`,
      description: BUSINESS_DESCRIPTION,
      inLanguage: 'en-PK',
      publisher: { '@id': BUSINESS_ID },
    },
    {
      '@type': 'LocalBusiness',
      '@id': BUSINESS_ID,
      additionalType: 'https://en.wikipedia.org/wiki/Coworking',
      name: "Let's Work Coworking Space",
      alternateName: [BRAND, "Let's Work Multan"],
      slogan: 'Dynamic Spaces for Dynamic People',
      description: BUSINESS_DESCRIPTION,
      url: `${SITE_URL}/`,
      image: [abs(IMG.building), abs(IMG.floorLong), abs(IMG.boardroom), abs(IMG.privateOffice)],
      logo: abs(IMG.logo),
      telephone: CONTACT.phoneIntl.replace(/\s/g, ''),
      email: CONTACT.email,
      priceRange: `${desk} – ${formatPrice(Math.max(...TEAM_PLANS.map((p) => p.price)))} per month`,
      currenciesAccepted: 'PKR',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Nandla Chowk, Shuhada Road',
        addressLocality: 'Multan',
        addressRegion: 'Punjab',
        addressCountry: 'PK',
      },
      hasMap: CONTACT.mapLink,
      areaServed: { '@type': 'City', name: 'Multan' },
      amenityFeature: AMENITIES.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
      knowsAbout: ['Coworking', 'Hot desks', 'Dedicated desks', 'Private offices', 'Meeting rooms', 'Instant offices'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Monthly workspace plans',
        itemListElement: [...SOLO_PLANS, ...TEAM_PLANS].map(planOffer),
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: CONTACT.phoneIntl.replace(/\s/g, ''),
        email: CONTACT.email,
        areaServed: 'PK',
        availableLanguage: ['English', 'Urdu'],
      },
    },
  ];
}

/** Page-level nodes: WebPage, BreadcrumbList, and Service / FAQPage where the page has them. */
export function pageGraph(page) {
  const url = abs(page.path);
  const isHome = page.path === '/';
  const nodes = [
    {
      '@type': page.type ?? 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: pageTitle(page),
      description: page.description,
      inLanguage: 'en-PK',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': BUSINESS_ID },
      ...(isHome ? {} : { breadcrumb: { '@id': `${url}#breadcrumb` } }),
    },
  ];

  if (!isHome) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: page.name, item: url },
      ],
    });
  }

  if (page.service) {
    nodes.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: `${page.service} in Multan`,
      serviceType: page.service,
      description: page.description,
      url,
      provider: { '@id': BUSINESS_ID },
      areaServed: { '@type': 'City', name: 'Multan' },
      ...(page.plans ? { offers: page.plans.map(planOffer) } : {}),
    });
  }

  if (page.faqs?.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: page.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  return nodes;
}

/** JSON for a <script type="application/ld+json">, with "<" escaped so it can never close the tag early. */
export function toJsonLd(graph) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

/** sitemap.xml for every page. */
export function sitemapXml(lastmod) {
  const urls = Object.values(PAGES)
    .map((p) => `  <url>\n    <loc>${abs(p.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${p.priority}</priority>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** llms.txt: a plain-text brief that AI assistants can read without running JavaScript. */
export function llmsTxt() {
  const planLine = (p) => `- ${p.name}: ${formatPrice(p.price)} per month — ${p.blurb}`;
  const pages = Object.values(PAGES)
    .map((p) => `- [${p.name}](${abs(p.path)}): ${p.description}`)
    .join('\n');
  const faqs = Object.values(PAGE_FAQS)
    .flat()
    .filter((f, i, all) => all.indexOf(f) === i)
    .map((f) => `### ${f.q}\n${f.a}`)
    .join('\n\n');
  return `# ${BRAND} — Coworking Space in Multan

> ${BUSINESS_DESCRIPTION}

## Key facts
- Address: Nandla Chowk, Shuhada Road, Multan, Punjab, Pakistan
- Phone / WhatsApp: ${CONTACT.phoneIntl}
- Email: ${CONTACT.email}
- Billing: monthly plans only. No hourly or daily rates; a week or two can be arranged but is charged at the monthly rate.
- Security deposit: one month, on all plans.
- Free tour: yes, book on WhatsApp or by phone.

## Solo plans (per month)
${SOLO_PLANS.map(planLine).join('\n')}

## Team plans — private lockable offices for 6–8 people (per month)
${TEAM_PLANS.map(planLine).join('\n')}

## Pages
${pages}

## FAQ
${faqs}
`;
}
