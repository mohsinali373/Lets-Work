import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion.js';
import { useSectionReveal } from '../../lib/useSectionReveal.js';
import { IMG } from '../../data/site.js';
import { SITE_URL, pageGraph, pageTitle, siteGraph, toJsonLd } from '../../data/seo.js';

const OG_IMAGE = `${SITE_URL}${IMG.building}`;

/** Removes a <meta>/<link> from <head>, so a page without one never inherits the previous page's. */
function removeHeadTag(tag, key, keyValue) {
  document.head.querySelector(`${tag}[${key}="${keyValue}"]`)?.remove();
}

/** Finds (or creates) a <meta>/<link> in <head> and sets one attribute on it. */
function setHeadTag(tag, key, keyValue, attr, value) {
  let el = document.head.querySelector(`${tag}[${key}="${keyValue}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(key, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * Keeps the single JSON-LD block in <head> (written at build time by scripts/vite-seo-plugin.js)
 * in step with the page after client-side navigation, so there is never a second, duplicate block.
 * @param {object | undefined} seo
 */
function useJsonLd(seo) {
  useEffect(() => {
    let el = document.getElementById('seo-jsonld');
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = 'seo-jsonld';
      document.head.appendChild(el);
    }
    el.textContent = toJsonLd(seo ? [...siteGraph(), ...pageGraph(seo)] : siteGraph());
  }, [seo]);
}

/**
 * Title, description, canonical, Open Graph and robots for the current page.
 * @param {{ title: string, description?: string, url?: string, noindex: boolean }} head
 */
function useHead({ title, description, url, noindex }) {
  useEffect(() => {
    document.title = title;
    setHeadTag('meta', 'name', 'robots', 'content', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setHeadTag('meta', 'property', 'og:title', 'content', title);
    setHeadTag('meta', 'property', 'og:image', 'content', OG_IMAGE);
    setHeadTag('meta', 'name', 'twitter:card', 'content', 'summary_large_image');
    setHeadTag('meta', 'name', 'twitter:title', 'content', title);
    const described = [
      ['meta', 'name', 'description'],
      ['meta', 'property', 'og:description'],
      ['meta', 'name', 'twitter:description'],
    ];
    described.forEach(([tag, key, name]) => (description ? setHeadTag(tag, key, name, 'content', description) : removeHeadTag(tag, key, name)));
    if (url) {
      setHeadTag('link', 'rel', 'canonical', 'href', url);
      setHeadTag('meta', 'property', 'og:url', 'content', url);
    } else {
      removeHeadTag('link', 'rel', 'canonical');
      removeHeadTag('meta', 'property', 'og:url');
    }
  }, [title, description, url, noindex]);
}

/**
 * Wraps every route: sets the head tags and page structured data from data/seo.js,
 * and plays the ink curtain transition. Pages without an SEO entry (the 404) pass `title` and are not indexed.
 * @param {{ seo?: object, title?: string, children: React.ReactNode }} props
 */
export function Page({ seo, title, children }) {
  const mainRef = useRef(null);
  useSectionReveal(mainRef);
  useHead({
    title: seo ? pageTitle(seo) : `${title} | Let's Work Multan`,
    description: seo?.description,
    url: seo ? `${SITE_URL}${seo.path}` : undefined,
    noindex: !seo,
  });
  useJsonLd(seo);

  return (
    <>
      {/* lifts away on enter */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.8, ease: EASE_IN_OUT, delay: 0.1 } }}
        exit={{ scaleY: 0 }}
      >
        <span className="absolute inset-x-0 bottom-0 h-1 bg-sun" />
      </motion.div>
      {/* rises up on exit */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-ink"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.55, ease: EASE_IN_OUT } }}
      />
      <motion.main
        ref={mainRef}
        id="main"
        className="relative z-[1]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT, delay: 0.3 } }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.55 }}
      >
        {children}
      </motion.main>
    </>
  );
}
