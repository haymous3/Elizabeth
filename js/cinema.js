// The opening cinema: tapping the ticket starts the film; scrolling away docks it in the corner.
window.Cinema = (function () {
  function init() {
    const ticket = document.getElementById("ticket");
    const screen = document.getElementById("screen");
    const after = document.getElementById("cinema-after");
    const cue = document.getElementById("cinema-cue");
    let rolling = false;

    ticket.addEventListener(
      "click",
      () => {
        Music.start(); // must run inside the tap so the film may play with sound
        ticket.disabled = true;
        Motion.playCinema(() => {
          rolling = true;
          Music.fromTheTop();
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
