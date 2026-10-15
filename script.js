/* ===========================================================
   Thomas Warberg — video landing page
   Edit the two constants below to repoint the funnel.
   =========================================================== */

const TICKET_URL = "{{TICKET_URL}}"; // TODO: swap in real ticket link
const YOUTUBE_ID = "hRVRtHOxXrM";

(function () {
  "use strict";

  const poster = document.getElementById("videoPoster");
  const ctaButton = document.getElementById("ctaButton");

  // --- Poster image (from YOUTUBE_ID) ---
  const posterUrl = "https://i.ytimg.com/vi/" + YOUTUBE_ID + "/maxresdefault.jpg";
  if (poster) {
    poster.style.backgroundImage = 'url("' + posterUrl + '")';
  }

  // --- CTA href (from TICKET_URL) ---
  if (ctaButton) {
    ctaButton.setAttribute("href", TICKET_URL);
  }

  // --- Click-to-play: swap poster for the autoplaying YouTube iframe ---
  function playVideo() {
    if (!poster) return;

    const iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube.com/embed/" +
      YOUTUBE_ID +
      "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
    iframe.title = 'Thomas Warberg — "Perfektion, overskud og andre lorteord"';
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    const frame = poster.parentNode; // .video__frame
    frame.replaceChild(iframe, poster);
  }

  if (poster) {
    poster.addEventListener("click", playVideo);
  }
})();
