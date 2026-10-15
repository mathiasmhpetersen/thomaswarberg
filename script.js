/* ===========================================================
   Thomas Warberg — video landing page
   Edit the constants below to repoint the funnel. All changes
   are one-line edits.
   =========================================================== */

const TICKET_URL = "https://thomaswarberg.dk"; // ticket destination
const YOUTUBE_ID = "hRVRtHOxXrM";
const NEW_SHOW = "Fars fede onemanshow";
const POSTER_URL = "https://thomaswarberg.dk/wp-content/uploads/2026/09/TW_Tour27_Plakat_Medium-728x1024.webp"; // self-hosted at img/plakat.webp

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
