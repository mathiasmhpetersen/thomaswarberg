# Thomas Warberg — Video Landing Page

Single-purpose, conversion-focused video landing page for paid social (Meta) traffic.
The page has two jobs, in order: (1) get the visitor to watch the full previous show,
(2) make it obvious — before, during and after the video — that there is a **new show**
with tickets on sale now. One funnel, ticket links only.

## Stack
Plain static site — `index.html`, `styles.css`, `script.js` + `img/plakat.webp`. No
framework, build step, dependencies, or backend. Deploys to Vercel as a zero-config
static site (`thomaswarberg.vercel.app`).

## Configuration
All config lives at the top of `script.js` — each change is a one-line edit:

```js
const TICKET_URL = "{{TICKET_URL}}"; // TODO: swap in real ticket link
const YOUTUBE_ID = "hRVRtHOxXrM";
const NEW_SHOW   = "Fars fede onemanshow";
const POSTER_URL = "https://thomaswarberg.dk/.../TW_Tour27_Plakat_Medium-728x1024.webp";
```

- `TICKET_URL` populates every ticket link (top badge, new-show button, sticky mobile bar).
- `YOUTUBE_ID` drives the video poster image and the embed.
- `NEW_SHOW` fills the show name in the badge, the new-show title, and the sticky bar.
- `POSTER_URL` documents the source of the tour poster, which is **self-hosted** at
  `img/plakat.webp` (downloaded 728×1024). To refresh it, re-download and replace that file.

## Page structure
1. Gold badge — new show + "billetsalget er åbnet →" (ticket link, above the fold on mobile)
2. Headline block — kicker `FULDT SHOW · 71 MINUTTER`, gold display headline, `★★★★★★ Jyllands-Posten`
3. Video — click-to-play poster → `youtube-nocookie` embed (`rel=0`, `modestbranding`, `playsinline`); muted note below
4. New-show block — tour poster + copy + "Se byer og køb billet" button (two-column desktop, stacked mobile)
5. Review line — *„Warbergs foreløbigt bedste onemanshow" — Jyllands-Posten*
6. Footer — small wordmark

A **sticky bottom CTA** appears on < 768px once the visitor taps play (slides up, respects
the iOS safe area; page reserves bottom space so it never covers the review line).

## Local preview
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Notes
- The YouTube player is **not** loaded on page load; a poster is shown and swapped for the
  autoplaying iframe on click. The 16:9 box (`aspect-ratio`) and the poster image
  (`width`/`height` attrs, 728×1024) reserve their space → no layout shift.
- No dates, years, or city list appear on the page by design.
- **Display font:** the live site's "Brush Up" headlines are baked into images, not served as
  a web font, so they aren't grabbable. Falls back to **Permanent Marker** (Google Fonts).
  Body/CTA uses **Archivo**.
- Replace `{{TICKET_URL}}` before going live.
