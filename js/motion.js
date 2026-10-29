// All the GSAP choreography. If GSAP can't load, or her phone asks for reduced motion,
// every function falls back to an instant change and the page stays fully readable.
window.Motion = (function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const on =
    !reduce &&
    typeof window.gsap !== "undefined" &&
    typeof window.ScrollTrigger !== "undefined" &&
    typeof window.SplitText !== "undefined";

  const root = document.documentElement;
  root.classList.add(on ? "has-motion" : "no-motion");
  if (on) gsap.registerPlugin(ScrollTrigger, SplitText);

  // Script lettering "writes" itself in, left to right. Negative insets leave room for the swashes.
  const WRITE_FROM = "inset(-35% 100% -35% -10%)";
  const WRITE_TO = "inset(-35% -10% -35% -10%)";

  function write(target, vars) {
    return gsap.fromTo(
      target,
      { clipPath: WRITE_FROM },
      Object.assign({ clipPath: WRITE_TO, duration: 1.5, ease: "power2.inOut", clearProps: "clipPath" }, vars)
    );
  }

  // Looping effects in the cinema pause while it's off screen.
  const cinemaLoops = [];
  let cinemaOnScreen = true;
  function addCinemaLoop(tween) {
    cinemaLoops.push(tween);
    if (!cinemaOnScreen) tween.pause();
  }

  // ---------- [0] Cinema ----------
  let ticketFloat = null;

  function intro() {
    if (!on) {
      root.classList.remove("motion-pending");
      return;
    }

    const kicker = SplitText.create(".marquee__kicker", { type: "chars" });
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });
    tl.from(".marquee", { y: -40, autoAlpha: 0, duration: 1 })
      .from(".marquee__bulb", { scale: 0, duration: 0.35, stagger: { each: 0.025, from: "center" } }, "-=0.6")
      .from(kicker.chars, { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.035 }, "-=0.4")
      .add(write(".marquee__title", { duration: 1.6 }), "-=0.2")
      .from(".marquee__sub", { y: 10, autoAlpha: 0, duration: 0.7 }, "-=0.8")
      .from(".seats", { y: 60, autoAlpha: 0, duration: 1.1 }, 0.3)
      .from(".ticket", { y: 90, rotation: -14, autoAlpha: 0, duration: 1, ease: "back.out(1.5)" }, "-=0.7");
    root.classList.remove("motion-pending");

    // Marquee bulbs chase forever; the ticket bobs gently, asking to be tapped.
    addCinemaLoop(
      gsap.to(".marquee__bulb", {
        opacity: 0.3,
        duration: 0.5,
        ease: "sine.inOut",
        stagger: { each: 0.09, repeat: -1, yoyo: true },
      })
    );
    ticketFloat = gsap.to(".ticket", {
      y: -6,
      rotation: 1.2,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: tl.duration() + 0.2,
    });

    ScrollTrigger.create({
      trigger: "#cinema",
      start: "top bottom",
      end: "bottom top",
      onToggle(self) {
        cinemaOnScreen = self.isActive;
        cinemaLoops.forEach((t) => (self.isActive ? t.resume() : t.pause()));
      },
    });
  }

  // The ticket tears, the house lights go down, the curtains part, the projector comes on.
  function playCinema(onOpened) {
    const cinema = document.getElementById("cinema");
    cinema.classList.add("is-playing");

    // The beam runs from the projector (bottom) and lands behind the middle of the screen,
    // a little wider than it (its top edge is 68% of the beam's width, see the clip-path).
    const room = cinema.getBoundingClientRect();
    const screen = document.getElementById("screen").getBoundingClientRect();
    const beam = document.querySelector(".beam");
    const beamWidth = (screen.width * 1.15) / 0.68;
    beam.style.height = room.bottom - (screen.top + screen.height / 2) + "px";
    beam.style.width = beamWidth + "px";
    beam.style.marginLeft = -beamWidth / 2 + "px";

    if (!on) {
      setTimeout(onOpened, reduce ? 450 : 1500);
      return;
    }

    if (ticketFloat) ticketFloat.kill();
    gsap
      .timeline({ onComplete: onOpened })
      .to(".ticket__stub", { x: 30, y: 140, rotation: 38, autoAlpha: 0, duration: 0.8, ease: "power2.in" })
      .to(".ticket__main", { y: -24, scale: 0.92, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 0.1)
      .to(".cinema__dim", { autoAlpha: 1, duration: 1.8, ease: "power1.inOut" }, 0.2)
      .to(".cinema__bar", { scaleY: 1, duration: 1.2, ease: "power3.inOut" }, 0.3)
      .to(".curtain--left", { xPercent: -92, duration: 1.9, ease: "power3.inOut" }, 0.45)
      .to(".curtain--right", { xPercent: 92, duration: 1.9, ease: "power3.inOut" }, 0.45)
      .to(
        ".screen",
        {
          boxShadow:
            "0 0 0 1px rgba(217, 180, 111, 0.6), 0 0 70px 12px rgba(255, 232, 214, 0.16), 0 18px 50px rgba(0, 0, 0, 0.6)",
          duration: 1.6,
        },
        1
      )
      .to(".beam", { autoAlpha: 0.75, duration: 1.4, ease: "power2.out" }, 1.2)
      .add(projector, 2.4);
  }

  function projector() {
    const beam = document.querySelector(".beam");
    for (let i = 0; i < 16; i++) {
      const dust = document.createElement("span");
      dust.className = "beam__dust";
      dust.style.left = gsap.utils.random(25, 75) + "%";
      dust.style.top = gsap.utils.random(5, 95) + "%";
      beam.append(dust);
    }
    addCinemaLoop(
      gsap.to(beam, { opacity: "random(0.55, 0.8)", duration: 0.12, ease: "none", repeat: -1, repeatRefresh: true })
    );
    addCinemaLoop(
      gsap.to(".beam__dust", {
        x: "random(-24, 24)",
        y: "random(-30, 30)",
        opacity: "random(0.1, 0.9)",
        duration: "random(2, 4)",
        ease: "sine.inOut",
        repeat: -1,
        repeatRefresh: true,
        stagger: 0.1,
      })
    );
  }

  // Fade in whatever appears once the film is rolling.
  function appear(els) {
    if (!on) return;
    gsap.from(els, { autoAlpha: 0, duration: 0.9, stagger: 0.3 });
  }

  // ---------- The film player ----------
  // Flies `el` (kept position: fixed in flight) to wherever `target` currently is, then calls onArrive.
  function fly(el, target, onArrive) {
    if (el._flight) el._flight.kill();
    if (!on) {
      onArrive();
      return;
    }

    const from = el.getBoundingClientRect();
    el.classList.add("is-flying");
    const place = (r) => {
      el.style.left = r.left + "px";
      el.style.top = r.top + "px";
      el.style.width = r.width + "px";
      el.style.height = r.height + "px";
    };
    place(from);

    const lerp = gsap.utils.interpolate;
    const p = { t: 0 };
    el._flight = gsap.to(p, {
      t: 1,
      duration: 0.75,
      ease: "power3.inOut",
      onUpdate() {
        // Re-read the target every frame, so the landing spot stays right even mid-scroll.
        const to = target.getBoundingClientRect();
        place({
          left: lerp(from.left, to.left, p.t),
          top: lerp(from.top, to.top, p.t),
          width: lerp(from.width, to.width, p.t),
          height: lerp(from.height, to.height, p.t),
        });
      },
      onComplete() {
        el._flight = null;
        onArrive();
        el.classList.remove("is-flying");
        el.style.left = el.style.top = el.style.width = el.style.height = "";
      },
    });
  }

  // Slides the docked player off the side of the screen (it keeps playing).
  function tuck(el, hidden, instant) {
    el.style.pointerEvents = hidden ? "none" : "";
    if (!on) {
      el.classList.toggle("is-collapsed", hidden);
      return;
    }
    const vars = { xPercent: hidden ? 130 : 0, opacity: hidden ? 0 : 1 };
    if (instant) gsap.set(el, vars);
    else gsap.to(el, Object.assign(vars, { duration: 0.45, ease: "power2.inOut" }));
  }

  // ---------- [1]–[4] Scroll-driven reveals ----------
  function scrollReveals() {
    if (!on) return;

    // Hero: the photo drops in and her name writes itself
    const heroLine = SplitText.create(".hero__line", { type: "words" });
    gsap
      .timeline({ scrollTrigger: { trigger: ".hero", start: "top 65%" }, defaults: { ease: "power3.out" } })
      .from(".hero__greeting", { y: 24, autoAlpha: 0, duration: 0.8 })
      .from(".polaroid--hero", { y: -160, rotation: -24, autoAlpha: 0, duration: 1.2, ease: "back.out(1.3)" }, "-=0.45")
      .add(write(".hero__name", { duration: 1.7 }), "-=0.5")
      .from(heroLine.words, { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.035 }, "-=0.9");

    // Script headings write themselves in (the finale's wait until it unlocks)
    gsap.utils.toArray(".js-write").forEach((el) => {
      if (el.closest(".finale")) return;
      write(el, { scrollTrigger: { trigger: el, start: "top 85%" } });
    });

    // Gallery: each photo is tossed onto the table and lands at its own tilt
    const photos = gsap.utils.toArray(".gallery__item");
    photos.forEach((el) => {
      el._rest = { rotation: gsap.getProperty(el, "rotation"), y: gsap.getProperty(el, "y") };
      gsap.set(el, {
        autoAlpha: 0,
        y: el._rest.y + 110,
        rotation: el._rest.rotation + gsap.utils.random(-24, 24),
        scale: 0.85,
      });
    });
    ScrollTrigger.batch(photos, {
      start: "top 92%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          y: (i, el) => el._rest.y,
          rotation: (i, el) => el._rest.rotation,
          scale: 1,
          duration: 1.1,
          ease: "back.out(1.2)",
          stagger: 0.14,
        }),
    });

    // Poem: the letter rises, then each line inks in
    gsap.from(".letter", {
      y: 90,
      rotationX: -18,
      transformPerspective: 1000,
      transformOrigin: "50% 0%",
      autoAlpha: 0,
      duration: 1.3,
      ease: "power3.out",
      scrollTrigger: { trigger: ".letter", start: "top 85%" },
    });
    gsap.utils.toArray(".stanza").forEach((stanza) => {
      gsap.from(stanza.children, {
        y: 16,
        autoAlpha: 0,
        filter: "blur(6px)",
        duration: 1,
        ease: "power2.out",
        stagger: 0.16,
        clearProps: "filter",
        scrollTrigger: { trigger: stanza, start: "top 85%" },
      });
    });

    // Game: the cards are dealt onto the table
    gsap.from(".card", {
      y: -70,
      rotation: () => gsap.utils.random(-35, 35),
      scale: 0.5,
      autoAlpha: 0,
      duration: 0.7,
      ease: "back.out(1.5)",
      stagger: { each: 0.05, from: "random" },
      scrollTrigger: { trigger: ".game__grid", start: "top 80%" },
    });

    // Web fonts change text heights, so re-measure once they're in.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  // ---------- [4] Game feedback ----------
  function match(cards) {
    if (!on) return;
    gsap.fromTo(cards, { scale: 1 }, { scale: 1.12, duration: 0.16, yoyo: true, repeat: 1, ease: "power1.out" });
  }

  function reason(li) {
    if (!on) return;
    gsap.from(li, { autoAlpha: 0, y: -12, scale: 0.96, duration: 0.55, ease: "back.out(1.6)" });
  }

  function bump(el) {
    if (!on) return;
    gsap.fromTo(el, { scale: 1.3 }, { scale: 1, duration: 0.5, ease: "back.out(2)" });
  }

  // ---------- [5] Finale ----------
  function finale() {
    if (!on) return;
    ScrollTrigger.refresh();
    const q = SplitText.create(".finale__question", { type: "words" });
    gsap
      .timeline({ defaults: { ease: "power3.out" }, delay: 0.5 })
      .add(write(".finale__name", { duration: 1.4 }))
      .from(q.words, { y: 22, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
      .from(".finale__sub", { autoAlpha: 0, duration: 0.6 }, "-=0.2")
      .from(".finale__buttons .btn", { scale: 0, autoAlpha: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.15 }, "-=0.2");
  }

  function grow(el, scale) {
    if (!on) {
      el.style.setProperty("--grow", String(scale));
      return;
    }
    gsap.to(el, { scale, duration: 0.4, ease: "back.out(2.2)" });
  }

  function place(el, x, y) {
    if (!on) {
      el.style.left = x + "px";
      el.style.top = y + "px";
      return;
    }
    gsap.to(el, { left: x, top: y, rotation: gsap.utils.random(-10, 10), duration: 0.35, ease: "back.out(1.8)" });
  }

  function vanish(el) {
    if (!on) {
      el.classList.add("is-gone");
      return;
    }
    gsap.to(el, {
      scale: 0,
      rotation: 120,
      autoAlpha: 0,
      duration: 0.45,
      ease: "back.in(2)",
      onComplete: () => el.classList.add("is-gone"),
    });
  }

  // "It's official": the heading writes in, the certificate lands, the seal is stamped on.
  function official() {
    if (!on) return;
    ScrollTrigger.refresh();
    const line = SplitText.create(".finale__line", { type: "words" });
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .add(write(".finale__heading", { duration: 1.3 }))
      .from(line.words, { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.07 }, "-=0.6")
      .from(".certificate", { y: 70, rotation: -4, autoAlpha: 0, duration: 1 }, "-=0.3")
      .from(".certificate__seal", { scale: 3.2, rotation: -70, autoAlpha: 0, duration: 0.5, ease: "power4.in" }, "+=0.15")
      .to(".certificate", { keyframes: { x: [-7, 6, -3, 0] }, duration: 0.35, ease: "none" });

    gsap.from(".phone", {
      y: 120,
      rotation: 8,
      autoAlpha: 0,
      duration: 1.1,
      ease: "back.out(1.2)",
      scrollTrigger: { trigger: ".phone", start: "top 88%" },
    });
    write(".phone__caption", { scrollTrigger: { trigger: ".phone__caption", start: "top 92%" } });
    gsap.from([".finale__last", ".finale__sign"], {
      y: 20,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.2,
      scrollTrigger: { trigger: ".finale__last", start: "top 92%" },
    });
  }

  return {
    enabled: on,
    intro,
    playCinema,
    appear,
    fly,
    tuck,
    scrollReveals,
    match,
    reason,
    bump,
    finale,
    grow,
    place,
    vanish,
    official,
  };
})();
