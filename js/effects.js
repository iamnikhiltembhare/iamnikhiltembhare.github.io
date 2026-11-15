// Motion layer powered by anime.js v4 (https://animejs.com).
// Loaded before main.js; runs once main.js has rendered the page (DOMContentLoaded).
// Disabled automatically when anime.js is missing or the user prefers reduced motion,
// in which case main.js falls back to the plain CSS scroll reveal.
(function () {
  "use strict";
  const A = window.anime;
  const enabled =
    !!A && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.FX = { enabled };
  if (!enabled) return;

  const { animate, createTimeline, stagger, utils } = A;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  document.documentElement.classList.add("fx");

  // ---------- Helpers ----------
  // Split text nodes into word spans (and optionally char spans). Returns the animatable spans.
  function split(el, chars) {
    const out = [];
    [...el.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(part);
          const w = document.createElement("span");
          w.className = "fx-word";
          if (chars) {
            [...part].forEach((c) => {
              const s = document.createElement("span");
              s.className = "fx-ch";
              s.textContent = c;
              w.append(s);
              out.push(s);
            });
          } else {
            w.textContent = part;
            out.push(w);
          }
          frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== "BR") {
        out.push(...split(n, chars));
      }
    });
    return out;
  }

  // Hand an element back to CSS once anime.js is done with it.
  function settle(els) {
    (Array.isArray(els) ? els : [els]).forEach((el) => {
      el.classList.add("in");
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
      el.style.removeProperty("transition");
      revealIO.unobserve(el);
    });
  }

  // ---------- Scroll progress bar ----------
  const bar = document.createElement("div");
  bar.className = "fx-progress";
  document.body.append(bar);
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  // ---------- Scroll reveal (staggered) ----------
  const revealIO = new IntersectionObserver(
    (entries) => {
      const els = entries.filter((e) => e.isIntersecting).map((e) => e.target);
      els.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      els.forEach((el, i) => {
        revealIO.unobserve(el);
        reveal(el, i * 110);
      });
    },
    { threshold: 0.12 }
  );

  function reveal(el, delay) {
    const inTimeline = !!el.closest(".timeline");
    el.style.transition = "none";
    const params = {
      opacity: { from: 0, to: 1 },
      duration: 1000,
      delay,
      ease: "outExpo",
      onComplete: () => settle(el),
    };
    if (inTimeline) params.translateX = { from: -40, to: 0 };
    else params.translateY = { from: 48, to: 0 };
    animate(el, params);

    // Extra choreography per block
    const words = $$(".fx-word", el);
    if (words.length && el.classList.contains("section-head")) {
      animate(words, {
        opacity: { from: 0, to: 1 },
        translateY: { from: "0.8em", to: "0em" },
        rotate: { from: 6, to: 0 },
        delay: stagger(70, { start: delay + 120 }),
        duration: 900,
        ease: "outExpo",
      });
    }
    if (el.classList.contains("skill-card")) {
      animate($$(".chip", el), {
        opacity: { from: 0, to: 1 },
        scale: { from: 0.5, to: 1 },
        delay: stagger(40, { start: delay + 250 }),
        duration: 600,
        ease: "outBack(2)",
      });
    }
    if (inTimeline) {
      animate($$("ul li", el), {
        opacity: { from: 0, to: 1 },
        translateX: { from: 24, to: 0 },
        delay: stagger(90, { start: delay + 250 }),
        duration: 800,
        ease: "outExpo",
      });
    }
    if (el.id === "stats") countUp(el, delay);
    if (el.classList.contains("contact-card")) {
      const t = $(".contact-title", el);
      if (t) {
        animate($$(".fx-word", t), {
          opacity: { from: 0, to: 1 },
          translateY: { from: "0.8em", to: "0em" },
          delay: stagger(60, { start: delay + 150 }),
          duration: 900,
          ease: "outExpo",
        });
      }
    }
  }

  // ---------- Stats count-up ----------
  function countUp(root, delay) {
    $$("strong", root).forEach((s, i) => {
      const m = s.textContent.trim().match(/^(\d+)(.*)$/);
      if (!m) {
        // Non-numeric value (e.g. ∞): spin it in instead
        animate(s, {
          rotate: { from: -360, to: 0 },
          scale: { from: 0.3, to: 1 },
          delay: delay + i * 150,
          duration: 1600,
          ease: "outElastic(1, .6)",
        });
        return;
      }
      const end = Number(m[1]);
      const suffix = m[2];
      const counter = { v: 0 };
      s.textContent = `0${suffix}`;
      animate(counter, {
        v: end,
        delay: delay + i * 150,
        duration: 1800,
        ease: "outExpo",
        onUpdate: () => (s.textContent = `${Math.round(counter.v)}${suffix}`),
      });
    });
  }

  // ---------- Hero dot grid (click / tap ripple) ----------
  const hero = $(".hero");
  const dots = document.createElement("div");
  dots.className = "fx-dots";
  dots.setAttribute("aria-hidden", "true");
  hero.prepend(dots);
  let cols = 0, rows = 0;

  function buildDots() {
    const r = hero.getBoundingClientRect();
    const gap = innerWidth < 600 ? 26 : 34;
    let c = Math.max(4, Math.floor(r.width / gap));
    let rw = Math.max(4, Math.floor(r.height / gap));
    while (c * rw > 900) { c = Math.floor(c * 0.9); rw = Math.floor(rw * 0.9); }
    if (c === cols && rw === rows) return;
    cols = c; rows = rw;
    dots.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    dots.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    dots.innerHTML = "<span></span>".repeat(cols * rows);
  }

  function ripple(from) {
    animate(dots.children, {
      scale: [
        { to: 2.6, duration: 260, ease: "outSine" },
        { to: 1, duration: 1100, ease: "outElastic(1, .5)" },
      ],
      opacity: [
        { to: 0.95, duration: 260 },
        { to: 0.22, duration: 1100 },
      ],
      delay: stagger(38, { grid: [cols, rows], from }),
    });
  }

  buildDots();
  let resizeT;
  addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(buildDots, 200);
  });

  hero.addEventListener("pointerdown", (e) => {
    const r = hero.getBoundingClientRect();
    const c = Math.min(cols - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * cols)));
    const rw = Math.min(rows - 1, Math.max(0, Math.floor(((e.clientY - r.top) / r.height) * rows)));
    ripple(rw * cols + c);
  });

  // Gentle ambient ripple while the hero is on screen
  setInterval(() => {
    if (!document.hidden && scrollY < hero.offsetHeight * 0.6) ripple(utils.random(0, cols * rows - 1));
  }, 7000);

  // ---------- Hero intro timeline ----------
  function intro() {
    const heroText = $(".hero-text");
    const heroVisual = $(".hero-visual");
    [heroText, heroVisual].forEach((el) => { el.style.transition = "none"; el.classList.add("in"); });

    const title = $("#hero-title");
    title.setAttribute("aria-label", title.textContent.replace(/\s+/g, " ").trim());
    const chars = split(title, true);
    chars.forEach((c) => c.setAttribute("aria-hidden", "true"));
    // Re-create the gradient on the role line one character at a time
    const accentChars = $$(".accent .fx-ch", title);
    accentChars.forEach((c, i) => {
      const p = accentChars.length > 1 ? Math.round((i / (accentChars.length - 1)) * 100) : 0;
      c.style.color = `color-mix(in srgb, var(--accent-2) ${p}%, var(--accent))`;
    });

    const eyebrow = $(".eyebrow");
    const sub = $("#hero-sub");
    const ctas = $$(".hero-cta .btn");
    const socials = $$("#hero-socials li");
    const avatar = $(".avatar-wrap");
    const badge = $("#avatar-badge");
    const navItems = matchMedia("(min-width: 901px)").matches ? $$(".brand, .nav-links li, .nav-actions > *") : [$(".brand")];

    utils.set([eyebrow, sub, ...ctas, ...socials, avatar, badge, ...chars, ...navItems], { opacity: 0 });

    createTimeline({ defaults: { ease: "outExpo", duration: 1000 } })
      .add(navItems, { opacity: { from: 0, to: 1 }, translateY: { from: -16, to: 0 }, delay: stagger(60) }, 0)
      .add(avatar, {
        opacity: { from: 0, to: 1 },
        scale: { from: 0.6, to: 1 },
        rotate: { from: -10, to: 0 },
        duration: 1600,
        ease: "outElastic(1, .7)",
      }, 150)
      .add(eyebrow, { opacity: { from: 0, to: 1 }, translateY: { from: -20, to: 0 } }, 200)
      .add(chars, {
        opacity: { from: 0, to: 1 },
        translateY: { from: "0.8em", to: "0em" },
        rotate: { from: 14, to: 0 },
        delay: stagger(26),
        duration: 1100,
      }, 300)
      .add(sub, { opacity: { from: 0, to: 1 }, translateY: { from: 24, to: 0 } }, "-=800")
      .add(ctas, { opacity: { from: 0, to: 1 }, translateY: { from: 24, to: 0 }, delay: stagger(90) }, "-=850")
      .add(socials, {
        opacity: { from: 0, to: 1 },
        scale: { from: 0, to: 1 },
        delay: stagger(70),
        duration: 700,
        ease: "outBack(2)",
      }, "-=850")
      .add(badge, { opacity: { from: 0, to: 1 }, duration: 800 }, "-=700")
      .call(() => ripple("center"), 500)
      .then(() => {
        // Give buttons / nav back to CSS so their hover transitions work again
        [...ctas, ...navItems, heroText, heroVisual].forEach((el) => {
          el.style.removeProperty("transform");
          el.style.removeProperty("opacity");
          el.style.removeProperty("transition");
        });
      });
  }

  // ---------- Project filter shuffle ----------
  function bindFilters() {
    $("#filters").addEventListener("click", (e) => {
      if (!e.target.closest(".filter-btn")) return;
      const shown = $$(".project-card:not(.hidden)");
      shown.forEach((c) => (c.style.transition = "none"));
      animate(shown, {
        opacity: { from: 0, to: 1 },
        scale: { from: 0.88, to: 1 },
        translateY: { from: 30, to: 0 },
        delay: stagger(80),
        duration: 800,
        ease: "outExpo",
        onComplete: () => settle(shown),
      });
    });
  }

  // ---------- Pointer niceties (desktop only) ----------
  function bindPointer() {
    if (!finePointer) return;

    // Magnetic buttons
    $$(".btn").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.classList.add("magnet-active");
        b.style.setProperty("--mx", `${(e.clientX - r.left - r.width / 2) * 0.25}px`);
        b.style.setProperty("--my", `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
      });
      b.addEventListener("pointerleave", () => {
        b.classList.remove("magnet-active");
        b.style.setProperty("--mx", "0px");
        b.style.setProperty("--my", "0px");
      });
    });

    // 3D tilt on project cards
    $$(".project-card").forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.setProperty("--ry", `${x * 10}deg`);
        c.style.setProperty("--rx", `${-y * 10}deg`);
      });
      c.addEventListener("pointerleave", () => {
        c.style.setProperty("--ry", "0deg");
        c.style.setProperty("--rx", "0deg");
      });
    });
  }

  // ---------- Small interactions ----------
  function bindMisc() {
    $("#theme-toggle").addEventListener("click", () => {
      animate($$("#theme-toggle svg"), {
        rotate: { from: -180, to: 0 },
        scale: { from: 0.3, to: 1 },
        duration: 900,
        ease: "outElastic(1, .6)",
      });
    });
  }

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    $$(".section-head h2, .contact-title").forEach((h) => split(h, false));
    intro();
    $$(".reveal").forEach((el) => {
      if (!el.closest(".hero")) revealIO.observe(el);
    });
    bindFilters();
    bindPointer();
    bindMisc();
    onScroll();
  });
})();
