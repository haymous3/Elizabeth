// The question (with a "No" button that refuses to be pressed) and the "officially mine" reveal.
window.Finale = (function () {
  const { finale } = window.SITE;

  const section = document.getElementById("finale");
  const ask = document.getElementById("finale-ask");
  const official = document.getElementById("finale-official");
  const yes = document.getElementById("btn-yes");
  const no = document.getElementById("btn-no");
  const certDate = document.getElementById("cert-date");
  const usPhoto = document.getElementById("us-photo");

  let attempts = 0;
  let lastDodge = 0;

  function overlaps(a, b) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }

  // Jump to a random spot on screen, away from the finger and from the Yes button.
  function moveNo() {
    const pad = 16;
    const w = no.offsetWidth;
    const h = no.offsetHeight;
    const maxX = Math.max(pad, window.innerWidth - w - pad);
    const maxY = Math.max(pad, window.innerHeight - h - 150); // keep clear of the docked film
    const current = no.getBoundingClientRect();
    const yesBox = yes.getBoundingClientRect();
    const margin = 24;

    let x = pad;
    let y = pad;
    for (let tries = 0; tries < 30; tries++) {
      x = pad + Math.random() * (maxX - pad);
      y = pad + Math.random() * (maxY - pad);
      const box = { left: x - margin, right: x + w + margin, top: y - margin, bottom: y + h + margin };
      const farFromFinger = Math.hypot(x - current.left, y - current.top) > 120;
      if (farFromFinger && !overlaps(box, yesBox)) break;
    }

    if (!no.classList.contains("is-loose")) {
      // Pin it where it is first, so the jump animates from its spot in the row.
      no.style.left = current.left + "px";
      no.style.top = current.top + "px";
      no.classList.add("is-loose");
    }
    Motion.place(no, x, y);
  }

  function dodge(e) {
    e.preventDefault();
    const now = Date.now();
    if (now - lastDodge < 350) return; // one touch fires both pointerdown and click
    lastDodge = now;

    attempts += 1;
    Motion.grow(yes, 1 + Math.min(attempts, 5) * 0.16);

    if (attempts >= finale.noAttempts.length) {
      Motion.vanish(no);
      no.setAttribute("aria-hidden", "true");
      no.tabIndex = -1;
      yes.focus({ preventScroll: true });
      return;
    }

    no.textContent = finale.noAttempts[attempts];
    moveNo();
  }

  function sayYes(burst) {
    no.hidden = true;
    ask.hidden = true;
    official.hidden = false;
    certDate.textContent = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    Motion.official();
    official.scrollIntoView({ behavior: "auto", block: "start" });
    burst({ big: true });
    setTimeout(() => burst({ big: true }), 700);
  }

  function init({ burst }) {
    yes.textContent = finale.yes;
    no.textContent = finale.noAttempts[0];
    usPhoto.src = finale.usPhoto;

    no.addEventListener("pointerdown", dodge);
    no.addEventListener("click", dodge);
    no.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse") dodge(e);
    });
    yes.addEventListener("click", () => sayYes(burst));
  }

  // Unlocked once the game is finished.
  function reveal() {
    section.hidden = false;
    Motion.finale();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return { init, reveal };
})();
