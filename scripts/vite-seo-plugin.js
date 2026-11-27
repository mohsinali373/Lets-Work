/**
 * Build-time SEO for this single-page app (see src/data/seo.js for the data):
 * - fills the <!--seo--> marker in index.html with the title, meta tags, canonical and JSON-LD,
 * - writes a copy of index.html for every page (dist/<path>/index.html) with that page's own head,
 *   so crawlers and AI assistants that don't run JavaScript still get the right title, description and schema,
 * - writes sitemap.xml, robots.txt and llms.txt (also served by the dev server).
 */
import { PAGES, SITE_URL, llmsTxt, pageGraph, pageTitle, siteGraph, sitemapXml, toJsonLd } from '../src/data/seo.js';
import { IMG } from '../src/data/site.js';

const MARKER = '<!--seo-->';
const BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const OG_IMAGE = `${SITE_URL}${IMG.building}`;

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The head block for one page; the JSON-LD script id is reused at runtime by components/layout/Page.jsx. */
function headFor(page) {
  const url = `${SITE_URL}${page.path}`;
  const title = escapeAttr(pageTitle(page));
  const description = escapeAttr(page.description);
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large" />',
    '<meta name="author" content="SeoMasters" />',
    `<link rel="canonical" href="${url}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="Let&#39;s Work" />`,
    '<meta property="og:locale" content="en_PK" />',
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<script type="application/ld+json" id="seo-jsonld">${toJsonLd([...siteGraph(), ...pageGraph(page)])}</script>`,
  ];
  return `<!--seo:start-->\n    ${tags.join('\n    ')}\n    <!--seo:end-->`;
}

const ROBOTS = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

function extraFiles() {
  return {
    'sitemap.xml': sitemapXml(new Date().toISOString().slice(0, 10)),
    'robots.txt': ROBOTS,
    'llms.txt': llmsTxt(),
  };
}

const CONTENT_TYPES = { 'sitemap.xml': 'application/xml', 'robots.txt': 'text/plain', 'llms.txt': 'text/plain' };

export function seoPlugin() {
  return {
    name: 'letswork-seo',
    enforce: 'post', // run generateBundle after Vite has emitted index.html
    transformIndexHtml(html) {
      return html.replace(MARKER, headFor(PAGES.home));
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const name = req.url?.slice(1);
        if (!CONTENT_TYPES[name]) return next();
        res.setHeader('Content-Type', `${CONTENT_TYPES[name]}; charset=utf-8`);
        res.end(extraFiles()[name]);
      });
    },
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (!index) return;
      const html = String(index.source);
      for (const page of Object.values(PAGES)) {
        if (page.path === '/') continue;
        this.emitFile({ type: 'asset', fileName: `${page.path.slice(1)}/index.html`, source: html.replace(BLOCK, headFor(page)) });
      }
      // for hosts that serve 404.html on unknown URLs: no canonical, not indexed
      const notFoundHead = `<!--seo:start-->
    <title>Page not found | Let&#39;s Work Multan</title>
    <meta name="robots" content="noindex, follow" />
    <!--seo:end-->`;
      this.emitFile({ type: 'asset', fileName: '404.html', source: html.replace(BLOCK, notFoundHead) });
      for (const [fileName, source] of Object.entries(extraFiles())) {
        this.emitFile({ type: 'asset', fileName, source });
      }
    },
  };
}
