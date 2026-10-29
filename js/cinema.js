// The opening cinema: the ticket opens the curtains, a title card asks her to listen closely,
// "Roll the film" starts the video, and scrolling away docks it in the corner.
window.Cinema = (function () {
  function init() {
    const ticket = document.getElementById("ticket");
    const preshow = document.getElementById("preshow");
    const roll = document.getElementById("roll-film");
    const screen = document.getElementById("screen");
    const after = document.getElementById("cinema-after");
    const cue = document.getElementById("cinema-cue");
    let rolling = false;

    // 1. The ticket gets her in: lights down, curtains open, the title card appears.
    ticket.addEventListener(
      "click",
      () => {
        ticket.disabled = true;
        Motion.playCinema(() => {
          preshow.hidden = false;
          roll.hidden = false;
          Motion.preshow(preshow, roll);
        });
      },
      { once: true }
    );

    // 2. "Roll the film" starts the video — inside the tap, so the browser lets it play with sound.
    roll.addEventListener(
      "click",
      () => {
        Music.start();
        roll.disabled = true;
        Motion.rollFilm(preshow, roll, () => {
          preshow.hidden = true;
          roll.hidden = true;
          rolling = true;
          document.documentElement.classList.remove("is-locked");
          after.hidden = false;
          cue.hidden = false;
          Motion.appear([after, cue]);
        });
      },
      { once: true }
    );

    // Dock when most of the screen has scrolled away; undock when it's mostly back.
    // The gap between the two thresholds stops it flapping at the boundary.
    if (!("IntersectionObserver" in window)) return;
    new IntersectionObserver(
      ([entry]) => {
        if (!rolling) return;
        if (entry.intersectionRatio < 0.3) Music.dock();
        else if (entry.intersectionRatio > 0.6) Music.undock();
      },
      { threshold: [0, 0.3, 0.6, 1] }
    ).observe(screen);
  }

  return { init };
})();
