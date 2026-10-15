/* ===========================================================
   Thomas Warberg — video landing page
   Edit the constants below to repoint the funnel. All changes
   are one-line edits.
   =========================================================== */

const TICKET_URL = "https://thomaswarberg.dk"; // ticket destination
const YOUTUBE_ID = "hRVRtHOxXrM";
const NEW_SHOW = "Fars fede onemanshow";
const POSTER_URL = "https://thomaswarberg.dk/wp-content/uploads/2026/09/TW_Tour27_Plakat_Medium-728x1024.webp"; // self-hosted at img/plakat.webp

/* Press cards rotating under the video. Edit freely — order = rotation order.
   `rating` is a list of icon keys: "star" (filled) or outlined
   "heart" / "shield" / "diamond" / "spiral". `crown: true` adds a faint
   crown behind the card. Quotes 4–6 are jokes from the show — keep as-is. */
const REVIEWS = [
  {
    quote: "Warbergs foreløbigt bedste onemanshow",
    rating: ["star", "star", "star", "star", "star", "star"],
    source: "Jyllands-Posten"
  },
  {
    quote: "… det mest fantastiske nye one-man show jeg har set en mindeværdig…",
    rating: ["star", "star", "star", "star"],
    source: "Politiken"
  },
  {
    quote: "Har et sikkert medfødt funny bone",
    rating: ["star", "star", "star", "star"],
    source: "POV International"
  },
  {
    quote: "Troværdig køkkenkomiker med sans for mindreværd.",
    rating: ["heart", "shield", "heart", "diamond", "spiral"],
    source: "Politiken"
  },
  {
    quote: "Det får kongekrone – sjovt",
    rating: ["star", "star", "star", "star"],
    source: "Mana-or Ettype",
    crown: true
  },
  {
    quote: "Det er konsekrone sjovt",
    rating: ["star", "star", "star", "star"],
    source: "Konsekrone Stjerne"
  }
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

  // --- Video poster image (from YOUTUBE_ID) ---
  if (poster) {
    const posterUrl = "https://i.ytimg.com/vi/" + YOUTUBE_ID + "/maxresdefault.jpg";
    poster.style.backgroundImage = 'url("' + posterUrl + '")';
  }

  /* -------------------- Press cards -------------------- */
  const ICONS = {
    star: '<svg class="icon icon--star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.4l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.2l6.5-.9z"/></svg>',
    heart: '<svg class="icon icon--line" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3l-1.3-1.2C6 14.9 3 12.1 3 8.8 3 6.3 5 4.3 7.5 4.3c1.5 0 2.9.7 3.8 1.9l.7.9.7-.9c.9-1.2 2.3-1.9 3.8-1.9C19 4.3 21 6.3 21 8.8c0 3.3-3 6.1-7.7 10.3L12 20.3z"/></svg>',
    shield: '<svg class="icon icon--line" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l7.5 2.8v5.6c0 4.6-3.2 8.6-7.5 10.1-4.3-1.5-7.5-5.5-7.5-10.1V5.3L12 2.5z"/></svg>',
    diamond: '<svg class="icon icon--line" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8.5 9-8.5 9-8.5-9z"/></svg>',
    spiral: '<svg class="icon icon--line" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12A9 9 0 1 1 3 12A7 7 0 1 1 17 12A5 5 0 1 1 7 12A3 3 0 1 1 15 12"/></svg>'
  };
  const CROWN =
    '<svg class="icon icon--line" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8l4.2 3.6L12 5l4.8 6.6L21 8l-1.8 10.5H4.8z"/></svg>';

  const RATING_LABELS = {
    star: "stjerner",
    heart: "hjerter",
    shield: "skjolde",
    diamond: "diamanter",
    spiral: "spiraler"
  };

  function ratingAriaLabel(rating) {
    // homogeneous row → "6 stjerner"; mixed → generic label
    var allSame = rating.every(function (k) { return k === rating[0]; });
    if (allSame && RATING_LABELS[rating[0]]) {
      return rating.length + " " + RATING_LABELS[rating[0]];
    }
    return "Anmelderrating";
  }

  function buildCard(review) {
    var fig = document.createElement("figure");
    fig.className = "press__card";

    if (review.crown) {
      var crown = document.createElement("div");
      crown.className = "press__crown";
      crown.setAttribute("aria-hidden", "true");
      crown.innerHTML = CROWN;
      fig.appendChild(crown);
    }

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

    // Build all cards, replacing the static no-JS fallback.
    var cards = REVIEWS.map(buildCard);
    press.innerHTML = "";
    cards.forEach(function (c) { press.appendChild(c); });
    cards[0].classList.add("is-active");

    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || cards.length < 2) return; // static first card

    var index = 0;
    var paused = false;
    var stopped = false;
    var timer = window.setInterval(function () {
      if (paused || stopped) return;
      var next = (index + 1) % cards.length;
      cards[index].classList.remove("is-active");
      cards[next].classList.add("is-active");
      index = next;
    }, 4000);

    // Pause on hover / touch.
    press.addEventListener("mouseenter", function () { paused = true; });
    press.addEventListener("mouseleave", function () { paused = false; });
    press.addEventListener("touchstart", function () { paused = true; }, { passive: true });
    press.addEventListener("touchend", function () { paused = false; });

    // Expose a stopper so playback can end the rotation for good.
    window.__stopPress = function () {
      stopped = true;
      window.clearInterval(timer);
    };
  }

  initPress();

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

    // Stop the press-card rotation so it doesn't distract from the video.
    if (typeof window.__stopPress === "function") window.__stopPress();

    // Reveal the sticky mobile CTA (CSS limits it to < 768px).
    document.body.classList.add("is-playing");
    const bar = document.getElementById("stickyBar");
    if (bar) bar.setAttribute("aria-hidden", "false");
  }

  if (poster) {
    poster.addEventListener("click", playVideo);
  }
})();
