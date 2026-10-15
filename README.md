# Thomas Warberg — Video Landing Page

Single-purpose, conversion-focused video landing page for paid social (Meta) traffic.
The visitor watches the full recording of the previous show, then clicks through to buy
tickets for the new show. One funnel, one CTA goal.

## Stack
Plain static site — `index.html`, `styles.css`, `script.js`. No framework, build step,
dependencies, or backend. Deploys to Vercel as a zero-config static site.

## Configuration
Both values live at the top of `script.js` — change is a one-line edit:

```js
const TICKET_URL = "{{TICKET_URL}}"; // TODO: swap in real ticket link
const YOUTUBE_ID = "hRVRtHOxXrM";
```

The CTA button's `href` and the video poster image are both derived from these at runtime.

## Local preview
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Notes
- The YouTube player is **not** loaded on page load. A poster
  (`https://i.ytimg.com/vi/<id>/maxresdefault.jpg`) is shown with a play button; clicking it
  swaps in the YouTube iframe with `autoplay=1`. The 16:9 box is reserved via `aspect-ratio`,
  so nothing shifts.
- **Display font:** the live site's headline "Brush Up" is baked into images, not served as a
  web font, so it isn't grabbable. Falls back to **Permanent Marker** (Google Fonts) — the
  closest free brush/marker display face. Body/CTA uses **Archivo**.
- Replace `{{TICKET_URL}}` before going live.
