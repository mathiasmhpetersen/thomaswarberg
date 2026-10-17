/* ===========================================================
   Thomas Warberg — video landing page
   Edit the constants below to repoint the funnel. All changes
   are one-line edits.
   =========================================================== */

const TICKET_URL = "https://thomaswarberg.dk"; // ticket destination
const YOUTUBE_ID = "hRVRtHOxXrM";
const NEW_SHOW = "Fars fede onemanshow";
const POSTER_URL = "https://thomaswarberg.dk/wp-content/uploads/2026/09/TW_Tour27_Plakat_Medium-728x1024.webp"; // self-hosted at img/plakat.webp

/* Audience quotes for the marquee strip (verbatim — no names, handles or dates). */
const VOICES = [
  "Fuck det er fedt det her show! Man får da det BEDSTE grin",
  "Græder stadig af grin en uge efter",
  "Du er en kæmpe inspiration for en deltidsfar, der også troede alt skulle være perfekt",
  "Wauw – fantastisk show!!",
  "Fantastisk 😂😂 tak for det 🙏",
  "Et fantastisk og nærværende show med sjov og eftertænksomt indhold. Det kan ikke fra bedre"
];

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

  // --- Meta Pixel: "Se byer og køb billet" fires AddToWishlist ---
  document.querySelectorAll(".js-track-wishlist").forEach(function (el) {
    el.addEventListener("click", function () {
      if (typeof window.fbq === "function") window.fbq("track", "AddToWishlist");
    });
  });

  // --- Video poster image (from YOUTUBE_ID) ---
  if (poster) {
    const posterUrl = "https://i.ytimg.com/vi/" + YOUTUBE_ID + "/maxresdefault.jpg";
    poster.style.backgroundImage = 'url("' + posterUrl + '")';
  }

  /* -------------------- Audience quotes marquee -------------------- */
  function buildVoice(text) {
    var item = document.createElement("span");
    item.className = "voices__item";

    var q = document.createElement("span");
    q.className = "voices__q";
    q.textContent = "„" + text + "”"; // „ … "

    var sep = document.createElement("span");
    sep.className = "voices__sep";
    sep.setAttribute("aria-hidden", "true");
    sep.textContent = "·";

    item.appendChild(q);
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
