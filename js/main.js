// Fills the page from config.js, builds the gallery, poem and game, and starts the cinema.
(function () {
  const SITE = window.SITE;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function lookup(path) {
    const value = path.split(".").reduce((obj, key) => (obj == null ? obj : obj[key]), SITE);
    if (typeof value !== "string") return value;
    return value.replace(/\{herName\}/g, SITE.herName).replace(/\{yourName\}/g, SITE.yourName);
  }

  function ordinal(n) {
    const tens = n % 100;
    if (tens >= 11 && tens <= 13) return n + "th";
    return n + ({ 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th");
  }

  // Heart confetti, used by the game and the finale.
  let heartShape = null;
  function burst({ big = false } = {}) {
    if (reduceMotion || typeof window.confetti !== "function") return;
    if (!heartShape && typeof confetti.shapeFromPath === "function") {
      heartShape = confetti.shapeFromPath({
        path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
      });
    }
    const colors = ["#f3b9c8", "#c8456b", "#d9b46f", "#f8ecdf"];
    const shapes = heartShape ? [heartShape, "circle"] : ["circle"];
    const base = { colors, shapes, scalar: big ? 1.6 : 1.3, ticks: 260, zIndex: 70 };
    confetti({ ...base, particleCount: big ? 140 : 60, spread: big ? 100 : 70, origin: { y: 0.6 } });
    if (big) {
      confetti({ ...base, particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.75 } });
      confetti({ ...base, particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.75 } });
    }
  }

  // ---------- Text ----------
  function fillText() {
    document.title = "Happy Birthday, " + SITE.herName;
    document.querySelectorAll("[data-text]").forEach((el) => {
      const value = lookup(el.dataset.text);
      if (value != null) el.textContent = value;
    });
    if (SITE.age) {
      document.getElementById("hero-greeting").textContent = "Happy " + ordinal(SITE.age) + " birthday,";
    }
    document.getElementById("hero-name").setAttribute(
      "aria-label",
      document.getElementById("hero-greeting").textContent + " " + SITE.herName
    );
  }

  // ---------- [0] Marquee bulbs ----------
  function buildBulbs() {
    document.querySelectorAll(".marquee__bulbs").forEach((row) => {
      for (let i = 0; i < 13; i++) {
        const bulb = document.createElement("span");
        bulb.className = "marquee__bulb";
        row.append(bulb);
      }
    });
  }

  // ---------- [1] Floating hearts ----------
  function buildHearts() {
    if (reduceMotion) return;
    const box = document.getElementById("hero-hearts");
    for (let i = 0; i < 14; i++) {
      const h = document.createElement("span");
      h.className = "float-heart";
      h.textContent = "♥";
      h.style.setProperty("--x", Math.random() * 100 + "%");
      h.style.setProperty("--size", 0.8 + Math.random() * 1.6 + "rem");
      h.style.setProperty("--dur", 12 + Math.random() * 10 + "s");
      h.style.setProperty("--delay", -Math.random() * 20 + "s");
      h.style.setProperty("--sway", (Math.random() - 0.5) * 80 + "px");
      h.style.setProperty("--alpha", (0.15 + Math.random() * 0.3).toFixed(2));
      box.append(h);
    }
  }

  // ---------- [2] Gallery ----------
  function buildGallery() {
    const board = document.getElementById("gallery-board");
    SITE.gallery.items.forEach((item) => {
      const fig = document.createElement("figure");
      fig.className = "polaroid gallery__item" + (item.type === "video" ? " gallery__item--video" : "");

      let media;
      if (item.type === "video") {
        media = document.createElement("video");
        media.muted = true;
        media.loop = true;
        media.playsInline = true;
        media.preload = "none";
        media.poster = item.poster;
        media.disablePictureInPicture = true;
        media.setAttribute("muted", "");
        media.setAttribute("playsinline", "");
        media.src = item.src;
      } else {
        media = document.createElement("img");
        media.loading = "lazy";
        media.alt = "";
        media.src = item.src;
      }
      media.className = "polaroid__media";

      const cap = document.createElement("figcaption");
      cap.className = "polaroid__caption";
      cap.textContent = item.caption;

      fig.append(media, cap);
      board.append(fig);
    });

    // Videos only play while they're on screen.
    const videos = board.querySelectorAll("video");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          if (entry.isIntersecting) {
            const p = v.play();
            if (p && p.catch) p.catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.4 }
    );
    videos.forEach((v) => io.observe(v));
  }

  // ---------- [3] Poem ----------
  function buildPoem() {
    const body = document.getElementById("poem-body");
    SITE.poem.stanzas.forEach((lines) => {
      const p = document.createElement("p");
      p.className = "stanza";
      lines.forEach((line) => {
        const span = document.createElement("span");
        span.textContent = line;
        p.append(span);
      });
      body.append(p);
    });
  }

  // Tuck the docked film away when she reaches the game, so it doesn't cover cards.
  function watchGame() {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          Music.collapseOnce();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(document.getElementById("game-grid"));
  }

  // Always start at the cinema, even on reload.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  fillText();
  buildBulbs();
  buildHearts();
  buildGallery();
  buildPoem();
  Game.init({
    burst,
    onComplete: Finale.reveal,
    onMatch: Motion.match,
    onReason: Motion.reason,
    onCount: Motion.bump,
  });
  Finale.init({ burst, onYes: Notify.saidYes });
  Cinema.init();
  watchGame();

  // Text animations measure the lettering, so let the fonts arrive first — but never wait long.
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1500))]).then(() => {
    Motion.intro();
    Motion.scrollReveals();
  });
})();
