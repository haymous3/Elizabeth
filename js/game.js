// "Find our hearts": a memory-match game. Each matched pair reveals a reason I love you.
window.Game = (function () {
  const { game } = window.SITE;

  const HEART_PATH =
    "M12 20.5s-7.5-4.6-9.6-9.3C.9 7.8 3 4.5 6.4 4.5c2.1 0 3.5 1.2 4.4 2.6l1.2 1.8 1.2-1.8c.9-1.4 2.3-2.6 4.4-2.6 3.4 0 5.5 3.3 4 6.7-2.1 4.7-9.6 9.3-9.6 9.3z";

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function makeCard(pairId, src, position) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.dataset.pair = pairId;
    card.setAttribute("aria-label", "Card " + position + ", face down");
    card.innerHTML =
      '<span class="card__inner">' +
      '<span class="card__back" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="' + HEART_PATH + '"/></svg></span>' +
      '<span class="card__face"><img alt="" draggable="false"></span>' +
      "</span>";
    card.querySelector("img").src = src;
    return card;
  }

  // Animation hooks are optional; without them the game still works.
  function init({ onComplete, burst, onMatch = () => {}, onReason = () => {}, onCount = () => {} }) {
    const grid = document.getElementById("game-grid");
    const count = document.getElementById("game-count");
    const reasonsList = document.getElementById("game-reasons");
    const done = document.getElementById("game-done");
    const continueBtn = document.getElementById("game-continue");

    const totalPairs = game.cards.length;
    const deck = shuffle(game.cards.flatMap((src, i) => [{ i, src }, { i, src }]));

    let first = null;
    let busy = false;
    let found = 0;

    function updateCount() {
      count.textContent = "Hearts found: " + found + " of " + totalPairs;
    }

    function addReason() {
      const li = document.createElement("li");
      li.className = "is-new";
      li.textContent = game.reasons[found - 1] || "";
      reasonsList.querySelectorAll(".is-new").forEach((el) => el.classList.remove("is-new"));
      reasonsList.prepend(li); // newest sits right under the cards, where she's looking
      onReason(li);
    }

    function flip(card) {
      card.classList.add("is-flipped");
      card.setAttribute("aria-label", card.getAttribute("aria-label").replace("face down", "face up"));
    }

    function unflip(card) {
      card.classList.remove("is-flipped");
      card.setAttribute("aria-label", card.getAttribute("aria-label").replace("face up", "face down"));
    }

    function onPick(card) {
      if (busy || card === first || card.classList.contains("is-matched")) return;
      flip(card);

      if (!first) {
        first = card;
        return;
      }

      const second = card;
      if (first.dataset.pair === second.dataset.pair) {
        [first, second].forEach((c) => {
          c.classList.add("is-matched");
          c.setAttribute("aria-label", "Matched");
        });
        onMatch([first, second]);
        first = null;
        found += 1;
        updateCount();
        onCount(count);
        addReason();
        if (found === totalPairs) finish();
        return;
      }

      busy = true;
      const a = first;
      first = null;
      setTimeout(() => {
        unflip(a);
        unflip(second);
        busy = false;
      }, 900);
    }

    function finish() {
      burst({ big: true });
      done.hidden = false;
      setTimeout(() => done.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
    }

    deck.forEach((entry, n) => {
      const card = makeCard(entry.i, entry.src, n + 1);
      card.addEventListener("click", () => onPick(card));
      grid.append(card);
    });

    continueBtn.addEventListener("click", onComplete);
    updateCount();
  }

  return { init };
})();
