# Let's Work — letswork.pk

React rebuild of the Let's Work coworking space website (Nandla Chowk, Multan).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production files in dist/
npm run preview  # serve the production build locally
```

## Stack

- React 19 + Vite, React Router 7
- Tailwind CSS v4 (tokens in `src/styles/index.css` → `@theme`)
- `motion` (scroll/hover/page-transition animation), `lenis` (smooth scrolling)
- Fonts: Instrument Sans, Instrument Serif (italic accents), JetBrains Mono (labels)

## Brand

| Token        | Hex       | Use                         |
| ------------ | --------- | --------------------------- |
| Cream        | `#F3EEE3` | page background             |
| Ink Black    | `#111111` | text, dark sections, nav    |
| Sunlit Yellow| `#F5B82E` | accents, CTAs (replaces burnt orange) |

## Where things live

- `src/data/site.js` — phone, WhatsApp, email, address, image list, social links
- `src/data/services.js` — the five spaces (names, URLs, copy)
- `src/data/faqs.js`, `src/data/amenities.js` — FAQ answers and amenities
- `src/pages/` — one file per page; service pages in `src/pages/services/`
- `public/img/` — real Let's Work photos and the logo

URLs match the old WordPress site (`/coworking-space`, `/meeting-room`, `/about-us`, …) so search rankings carry over.

## Scroll video

The home page "walk-in" section scrubs `public/video/walkin-*.mp4` (our own walk-in film, deflickered and encoded at 1080p / 720p / 480p) with the scroll.
To re-shoot or replace it, see [docs/video-prompt.md](docs/video-prompt.md).

## Before going live

- **Photos:** every photo is a real Let's Work photo (`public/img/space/`), and the home film is our own walk-in video.
- **Social links:** add profile URLs to `SOCIAL` in `src/data/site.js`; they appear in the footer automatically.
- **Hosting:** this is a single-page app. Configure the host to serve `index.html` for every route (Netlify `_redirects`: `/* /index.html 200`; Vercel does this by default for Vite).
- **Contact form:** there is no backend — it opens WhatsApp (or email) with the visitor's message pre-written.
