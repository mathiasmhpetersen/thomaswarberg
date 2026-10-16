/* ===========================================================
   Thomas Warberg — video landing page
   Edit the constants below to repoint the funnel. All changes
   are one-line edits.
   =========================================================== */

const TICKET_URL = "https://thomaswarberg.dk"; // ticket destination
const YOUTUBE_ID = "hRVRtHOxXrM";
const NEW_SHOW = "Fars fede onemanshow";
const POSTER_URL = "https://thomaswarberg.dk/wp-content/uploads/2026/09/TW_Tour27_Plakat_Medium-728x1024.webp"; // self-hosted at img/plakat.webp

/* Press cards shown under the video. Edit freely — order = display order.
   `rating` is a list of icon keys: "star" or "heart" (both filled gold). */
const REVIEWS = [
  {
    quote: "Warbergs foreløbigt bedste onemanshow",
    rating: ["star", "star", "star", "star", "star", "star"],
    source: "Jyllands-Posten"
  },
  {
    quote: "Rockstjernekomiker med sans for mindreværd",
    rating: ["heart", "heart", "heart", "heart", "heart"],
    source: "Politiken"
  },
  {
    quote: "Thomas Warbergs nye one-man show besidder en misundelsesværdig ligefremhed…",
    rating: ["star", "star", "star", "star"],
    source: "Scenekanten"
  }
];

/* Audience quotes for the marquee strip (verbatim — no names, handles or dates).
   Each is shown with the source label "Seer på YouTube". */
const VOICES = [
  "Fuck det er fedt det her show! Man får da det BEDSTE grin",
  "Græder stadig af grin en uge efter",
  "Du er en kæmpe inspiration for en deltidsfar, der også troede alt skulle være perfekt",
  "Wauw – fantastisk show!!",
  "Fantastisk 😂😂 tak for det 🙏",
  "Et fantastisk og nærværende show med sjov og eftertænksomt indhold. Det kan ikke fra bedre"
];
const VOICE_SOURCE = "Seer på YouTube";

(function () {
  "use strict";

  const poster = document.getElementById("videoPoster");

  // --- Ticket links: badge, new-show button, sticky-bar button ---
  document.querySelectorAll(".js-ticket").forEach(function (el) {
    el.setAttribute("href", TICKET_URL);
  });

  // --- New-show name (badge, title, sticky bar) ---
  document.querySelectorAll(".js-newshow").forEach(function (el) {
    el.textContent = NEW_SHOW;
  });

  // --- Video poster image (from YOUTUBE_ID) ---
  if (poster) {
    const posterUrl = "https://i.ytimg.com/vi/" + YOUTUBE_ID + "/maxresdefault.jpg";
    poster.style.backgroundImage = 'url("' + posterUrl + '")';
  }

  /* -------------------- Press cards -------------------- */
  const ICONS = {
    star: '<svg class="icon icon--star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.4l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.2l6.5-.9z"/></svg>',
    heart: '<svg class="icon icon--heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.3l-1.4-1.3C5.4 15.3 2 12.2 2 8.5 2 5.5 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.1 3.8 14.8 3 16.5 3 19.6 3 22 5.5 22 8.5c0 3.7-3.4 6.8-8.6 11.5L12 21.3z"/></svg>'
  };

  const RATING_LABELS = { star: "stjerner", heart: "hjerter" };

  function ratingAriaLabel(rating) {
    var allSame = rating.every(function (k) { return k === rating[0]; });
    if (allSame && RATING_LABELS[rating[0]]) {
      return rating.length + " " + RATING_LABELS[rating[0]];
    }
    return "Anmelderrating";
  }

  function buildCard(review) {
    var fig = document.createElement("figure");
    fig.className = "press__card";

    var q = document.createElement("blockquote");
    q.className = "press__quote";
    q.textContent = "„" + review.quote + "”"; // „ … "
    fig.appendChild(q);

    var row = document.createElement("div");
    row.className = "press__rating";
    row.setAttribute("role", "img");
    row.setAttribute("aria-label", ratingAriaLabel(review.rating));
    row.innerHTML = review.rating
      .map(function (k) { return ICONS[k] || ""; })
      .join("");
    fig.appendChild(row);

    var src = document.createElement("figcaption");
    src.className = "press__source";
    src.textContent = review.source;
    fig.appendChild(src);

    return fig;
  }

  function initPress() {
    var press = document.getElementById("press");
    if (!press || !REVIEWS.length) return;

    // Build every card and show them all at once (replaces the no-JS fallback).
    press.innerHTML = "";
    REVIEWS.forEach(function (review) {
      press.appendChild(buildCard(review));
    });
  }

  initPress();

  /* -------------------- Audience quotes marquee -------------------- */
  function buildVoice(text) {
    var item = document.createElement("span");
    item.className = "voices__item";

    var q = document.createElement("span");
    q.className = "voices__q";
    q.textContent = "„" + text + "”"; // „ … "

    var src = document.createElement("span");
    src.className = "voices__src";
    src.textContent = VOICE_SOURCE;

    var sep = document.createElement("span");
    sep.className = "voices__sep";
    sep.setAttribute("aria-hidden", "true");
    sep.textContent = "·";

    item.appendChild(q);
    item.appendChild(src);
    item.appendChild(sep);
    return item;
  }

  function initVoices() {
    var track = document.getElementById("voicesTrack");
    if (!track || !VOICES.length) return;

    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.innerHTML = "";

    if (reduce) {
      // Static: first two quotes, centered and wrapped, no animation.
      VOICES.slice(0, 2).forEach(function (t) { track.appendChild(buildVoice(t)); });
      track.classList.add("is-static");
      return;
    }

    // Build the list twice so the translateX(-50%) loop is seamless.
    var frag = document.createDocumentFragment();
    VOICES.forEach(function (t) { frag.appendChild(buildVoice(t)); });
    VOICES.forEach(function (t) { frag.appendChild(buildVoice(t)); });
    track.appendChild(frag);

    // Pause on touch (hover is handled in CSS). Passive so scrolling isn't blocked.
    var vp = track.parentNode;
    vp.addEventListener("touchstart", function () { track.classList.add("is-paused"); }, { passive: true });
    vp.addEventListener("touchend", function () { track.classList.remove("is-paused"); });
    vp.addEventListener("touchcancel", function () { track.classList.remove("is-paused"); });
  }

  initVoices();

  // --- Click-to-play: swap poster for the autoplaying YouTube iframe ---
  function playVideo() {
    if (!poster) return;

    const iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube-nocookie.com/embed/" +
      YOUTUBE_ID +
      "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
    iframe.title = 'Thomas Warberg — "Perfektion, overskud og andre lorteord"';
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    const frame = poster.parentNode; // .video__frame
    frame.replaceChild(iframe, poster);

    // Reveal the sticky mobile CTA (CSS limits it to < 768px).
    document.body.classList.add("is-playing");
    const bar = document.getElementById("stickyBar");
    if (bar) bar.setAttribute("aria-hidden", "false");
  }

  if (poster) {
    poster.addEventListener("click", playVideo);
  }
})();
