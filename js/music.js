// Our film: the YouTube video plays on the cinema screen, then follows her down the page in a corner player.
window.Music = (function () {
  const { song } = window.SITE;

  const player = document.getElementById("player");
  const screen = document.getElementById("screen");
  const slot = document.getElementById("dock-slot");
  const toggle = document.getElementById("dock-toggle");
  const hint = document.getElementById("screen-hint");
  const fallback = document.getElementById("screen-fallback");

  let yt = null;
  let ready = false;
  let wantPlay = false;
  let playing = false;
  let failed = false;
  let docked = false;
  let collapsed = false;
  let collapsedOnce = false;

  document.getElementById("fallback-link").href = "https://www.youtube.com/watch?v=" + song.youtubeId;

  window.onYouTubeIframeAPIReady = function () {
    const playerVars = {
      playsinline: 1,
      rel: 0,
      iv_load_policy: 3,
      loop: 1,
      playlist: song.youtubeId, // required for loop to work on a single video
    };
    if (location.protocol.startsWith("http")) playerVars.origin = location.origin;

    yt = new YT.Player("yt-player", {
      videoId: song.youtubeId,
      width: "100%",
      height: "100%",
      playerVars,
      events: {
        onReady() {
          ready = true;
          if (wantPlay) yt.playVideo();
        },
        onStateChange(e) {
          playing = e.data === YT.PlayerState.PLAYING;
          if (playing) hint.hidden = true;
        },
        onError(e) {
          console.warn("YouTube player error code:", e.data);
          fail();
        },
      },
    });
  };

  const api = document.createElement("script");
  api.src = "https://www.youtube.com/iframe_api";
  api.onerror = fail;
  document.head.append(api);

  function fail() {
    failed = true;
    hint.hidden = true;
    fallback.hidden = false;
    if (docked) undock();
  }

  // Called inside the "Roll the film" tap, so the browser lets the film play with sound.
  function start() {
    wantPlay = true;
    if (ready) yt.playVideo();

    // Some phones still insist on a tap on the video itself.
    setTimeout(() => {
      if (failed) return;
      if (!ready) {
        console.warn("YouTube player did not load in time");
        return fail();
      }
      if (!playing) hint.hidden = false;
    }, 4500);
  }

  function setCollapsed(value, instant) {
    collapsed = value;
    Motion.tuck(player, value, instant);
    toggle.setAttribute("aria-expanded", String(!value));
    toggle.textContent = value ? "♪ " + song.title : "Hide video";
  }

  toggle.addEventListener("click", () => setCollapsed(!collapsed));

  // She scrolled past the cinema: the film flies into the corner and keeps playing.
  function dock() {
    if (docked || failed) return;
    docked = true;
    Motion.fly(player, slot, () => player.classList.add("is-docked"));
    toggle.hidden = false;
  }

  // She scrolled back up: the film flies back onto the big screen.
  function undock() {
    if (!docked) return;
    docked = false;
    toggle.hidden = true;
    if (collapsed) setCollapsed(false, true);
    Motion.fly(player, screen, () => player.classList.remove("is-docked"));
  }

  // Tucks the docked player away once (so it doesn't cover the game). She can bring it back.
  function collapseOnce() {
    if (collapsedOnce || !docked) return;
    collapsedOnce = true;
    setCollapsed(true);
  }

  return { start, dock, undock, collapseOnce };
})();
