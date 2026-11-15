/*
 * Parallax layer — no libraries, transform-only, ~120 lines.
 *
 * HOW IT WORKS
 *  1. Anything with a `data-parallax="<speed>"` attribute is a parallax item (add the attribute in HTML, or
 *     push a selector into the ITEMS list below).
 *  2. On scroll we measure how far the item's *layout* centre is from the viewport centre ("delta") and set
 *     translateY = delta × speed.
 *        speed > 0  → item lags behind the page  (feels far away: backgrounds, glow orbs)
 *        speed < 0  → item moves faster than page (feels close: badges, floating labels)
 *  3. We use the individual CSS `translate` property, so it never fights the `transform` used by anime.js,
 *     hover tilts or keyframe animations on the same element.
 *  4. Off-screen items are skipped (IntersectionObserver); reads and writes are batched in one rAF per frame.
 *  5. Optional pointer depth on desktop: `data-depth-x` / `data-depth-y` shift an item as the mouse moves.
 *  6. Disabled automatically for prefers-reduced-motion; softened (60 %) on touch screens.
 *
 * Tweak the numbers in ITEMS / ORBS below and refresh — that's the whole workflow.
 */
(function () {
  "use strict";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const coarse = matchMedia("(pointer: coarse)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const STRENGTH = coarse ? 0.6 : 1;

  // [selector, speed, {max px clamp, pointer depthX, depthY}]
  const ITEMS = [
    [".avatar-wrap", -0.05, { max: 60, dx: 10, dy: 8 }],
    [".avatar-badge", -0.14, { max: 90, dx: 26, dy: 18 }],
    [".fx-dots", 0.22, { max: 160, dx: -14, dy: -10 }],
    [".hero-text", 0.04, { max: 40 }],
    [".project-thumb img", 0.08, { max: "thumb" }], // clamp = overscan of the frame, see CSS
  ];
  // Soft background glows placed behind sections: [section selector, side, top %, size, speed, colour var]
  const ORBS = [
    ["#skills", "left", 8, 1, 0.26, "--accent"],
    ["#projects", "right", 4, 1.1, 0.2, "--accent-2"],
    ["#experience", "left", 30, 0.9, 0.24, "--accent"],
    ["#contact", "right", 10, 1, 0.22, "--accent-2"],
  ];

  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.classList.add("has-parallax");

    ORBS.forEach(([sel, side, top, size, speed, colour]) => {
      const sec = document.querySelector(sel);
      if (!sec) return;
      sec.classList.add("orb-host");
      const o = document.createElement("div");
      o.className = "orb";
      o.setAttribute("aria-hidden", "true");
      o.style.cssText = `${side}:-8%;top:${top}%;--s:${size};--c:var(${colour})`;
      o.dataset.parallax = speed;
      sec.prepend(o);
    });

    const items = [];
    const add = (el, speed, o = {}) => items.push({ el, speed, o, y: 0, x: 0, visible: false });
    ITEMS.forEach(([sel, speed, o]) => document.querySelectorAll(sel).forEach((el) => add(el, speed, o)));
    document.querySelectorAll("[data-parallax]:not(.orb)").forEach((el) => {
      if (!items.some((i) => i.el === el)) add(el, parseFloat(el.dataset.parallax) || 0);
    });
    document.querySelectorAll(".orb").forEach((el) => add(el, parseFloat(el.dataset.parallax), { max: 220 }));

    const io = new IntersectionObserver(
      (es) => { es.forEach((e) => { const it = items.find((i) => i.el === e.target); if (it) it.visible = e.isIntersecting; }); request(); },
      { rootMargin: "25% 0px" }
    );
    items.forEach((i) => io.observe(i.el));

    // pointer depth (desktop only)
    const p = { tx: 0, ty: 0, x: 0, y: 0 };
    if (fine) {
      addEventListener("pointermove", (e) => {
        p.tx = e.clientX / innerWidth - 0.5;
        p.ty = e.clientY / innerHeight - 0.5;
        request();
      }, { passive: true });
    }

    let queued = false;
    function request() { if (!queued) { queued = true; requestAnimationFrame(frame); } }

    function frame() {
      queued = false;
      p.x += (p.tx - p.x) * 0.1;
      p.y += (p.ty - p.y) * 0.1;
      const vh = innerHeight, mid = vh / 2;
      // read…
      const live = items.filter((i) => i.visible);
      const rects = live.map((i) => i.el.getBoundingClientRect());
      // …then write
      live.forEach((it, n) => {
        const r = rects[n];
        const delta = r.top + r.height / 2 - it.y - mid; // layout centre vs viewport centre
        let max = it.o.max || 120;
        if (max === "thumb") max = Math.max(0, r.height * 0.08);
        it.y = Math.max(-max, Math.min(max, delta * it.speed * STRENGTH));
        it.x = (it.o.dx || 0) * p.x * 2;
        const dy = (it.o.dy || 0) * p.y * 2;
        it.el.style.translate = `${it.x.toFixed(1)}px ${(it.y + dy).toFixed(1)}px`;
      });
      if (Math.abs(p.tx - p.x) > 0.001 || Math.abs(p.ty - p.y) > 0.001) request(); // keep easing the pointer
    }

    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", request);
    request();
  });
})();
