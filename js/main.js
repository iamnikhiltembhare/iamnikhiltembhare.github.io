(function () {
  "use strict";
  const d = window.PORTFOLIO;
  const $ = (s) => document.querySelector(s);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONS = {
    github:
      '<svg viewBox="0 0 24 24"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M18.9 1.2h3.7l-8 9.2 9.4 12.4h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2L6.5 3.3H4.3l13.3 17.3z"/></svg>',
    dribbble:
      '<svg viewBox="0 0 24 24"><path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm7.9 5.5a10.2 10.2 0 0 1 2.3 6.4c-.3-.1-3.7-.8-7.1-.3l-.9-2c3.8-1.6 5.5-3.8 5.7-4.1zM12 1.8c2.6 0 5 1 6.8 2.6-.2.3-1.7 2.3-5.4 3.7A55 55 0 0 0 9.6 2a10 10 0 0 1 2.4-.2zM7.6 2.8a65 65 0 0 1 3.8 5.9 38 38 0 0 1-9.4 1.2 10.2 10.2 0 0 1 5.6-7.1zM1.8 12v-.3c.3 0 5.7.1 11.3-1.6l.9 1.8c-4.8 1.4-7.4 5.1-7.9 5.8A10.1 10.1 0 0 1 1.8 12zM12 22.2c-2.3 0-4.5-.8-6.2-2.1.2-.4 2.2-4.2 7.6-6.1a42 42 0 0 1 2.2 7.7 10 10 0 0 1-3.6.5zm5.4-1.6a44 44 0 0 0-2-7.3c3.1-.5 5.9.3 6.2.4a10.2 10.2 0 0 1-4.2 6.9z"/></svg>',
    web: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.9a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4zM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h2.9c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16zM8 8H5.1a8 8 0 0 1 4.3-3.6C8.8 5.5 8.3 6.7 8 8zm4 12c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.9a8 8 0 0 1-4.3 3.6zm1.7-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><path d="M2 4h20v16H2V4zm10 7.2L3.8 6H20.2L12 11.2zM4 8.3V18h16V8.3l-8 5.1-8-5.1z"/></svg>',
  };

  const socialsHTML = () =>
    d.socials
      .map(
        (s) =>
          `<li><a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" title="${esc(s.label)}">${ICONS[s.icon] || ICONS.mail}</a></li>`
      )
      .join("");

  // ---------- Render ----------
  document.title = `${d.name} — ${d.role}`;
  $("#brand").innerHTML = `${esc(d.initials)}<span class="dot">.</span>`;
  $("#hero-status").textContent = d.status;
  $("#hero-title").innerHTML = `Hi, I'm ${esc(d.name.split(" ")[0])}.<br /><span class="accent">${esc(d.role)}</span>`;
  $("#hero-sub").textContent = d.intro;
  $("#hero-socials").innerHTML = socialsHTML();
  $("#contact-socials").innerHTML = socialsHTML();

  const avatar = $("#avatar");
  avatar.src = d.avatar;
  avatar.alt = `Portrait of ${d.name}`;
  $("#avatar-badge").textContent = d.avatarBadge;

  const resume = $("#resume-link");
  if (d.resume) resume.href = d.resume;
  else resume.remove();

  $("#stats").innerHTML = d.stats.map((s) => `<li><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></li>`).join("");

  $("#about-body").innerHTML = d.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#about-facts").innerHTML = d.facts.map((f) => `<li><span>${esc(f.label)}</span><strong>${esc(f.value)}</strong></li>`).join("");

  // Skills: {name, level} → animated bar; plain string → chip
  const levelWord = (n) => (n >= 90 ? "Expert" : n >= 80 ? "Advanced" : n >= 70 ? "Proficient" : "Intermediate");
  $("#skills-grid").innerHTML = d.skills
    .map((g) => {
      const bars = g.items.filter((i) => typeof i === "object" && i.level != null);
      // chips: plain strings, or { name, url } for a link (e.g. a certificate you can verify)
      const chips = g.items.filter((i) => typeof i === "string" || (typeof i === "object" && i.level == null));
      const chipHTML = (i) =>
        typeof i === "string" || !i.url
          ? `<span class="chip">${esc(typeof i === "string" ? i : i.name)}</span>`
          : `<a class="chip chip-link" href="${esc(i.url)}" target="_blank" rel="noopener">${esc(i.name)} <span aria-hidden="true">↗</span></a>`;
      const lvl = (n) => Math.max(0, Math.min(100, Number(n) || 0));
      return `<div class="skill-card reveal"><h3>${esc(g.group)}</h3>
        ${
          bars.length
            ? `<ul class="bars">${bars
                .map(
                  (b) => `<li class="skill" title="${levelWord(lvl(b.level))}">
                    <div class="skill-top"><span>${esc(b.name)}</span><span class="pct" data-to="${lvl(b.level)}">${lvl(b.level)}%</span></div>
                    <div class="bar" role="img" aria-label="${esc(b.name)}: ${lvl(b.level)} percent, ${levelWord(lvl(b.level))}"><i style="--lvl:${lvl(b.level)}%"></i></div>
                  </li>`
                )
                .join("")}</ul>`
            : ""
        }
        ${chips.length ? `<div class="chips ${bars.length ? "chips-more" : ""}">${chips.map(chipHTML).join("")}</div>` : ""}
      </div>`;
    })
    .join("");

  // Animate the bars + count the percentages when each card scrolls into view
  (function animateSkills() {
    const cards = [...document.querySelectorAll(".skill-card")].filter((c) => c.querySelector(".bars"));
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window);
    if (still) return; // bars stay at their final width
    document.documentElement.classList.add("js-bars");
    const run = (card) => {
      card.classList.add("bars-on");
      card.querySelectorAll(".skill").forEach((sk, i) => {
        const pct = sk.querySelector(".pct");
        const to = Number(pct.dataset.to);
        const delay = 150 + i * 110, dur = 1300;
        sk.style.setProperty("--delay", `${delay}ms`);
        const t0 = performance.now() + delay;
        const tick = (now) => {
          const k = Math.min(1, Math.max(0, (now - t0) / dur));
          pct.textContent = `${Math.round(to * (1 - Math.pow(1 - k, 4)))}%`; // easeOutQuart, matches the bar
          if (k < 1) requestAnimationFrame(tick);
        };
        pct.textContent = "0%";
        requestAnimationFrame(tick);
      });
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }),
      { threshold: 0.25 }
    );
    cards.forEach((c) => io.observe(c));
  })();

  // Projects + filters
  const tags = ["All", ...new Set(d.projects.map((p) => p.tag))];
  $("#filters").innerHTML = tags
    .map((t, i) => `<button class="filter-btn" role="tab" aria-selected="${i === 0}" data-tag="${esc(t)}">${esc(t)}</button>`)
    .join("");

  $("#projects-grid").innerHTML = d.projects
    .map((p) => {
      const initials = p.title.replace(/^Sample — /, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
      const thumb = p.image
        ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy" />`
        : `<span class="ph" aria-hidden="true">${esc(initials)}</span>`;
      const bg = p.image ? "" : `style="background: linear-gradient(135deg, ${esc(p.color)}, color-mix(in srgb, ${esc(p.color)} 55%, #000))"`;
      // "#" is a placeholder — hide the link until a real URL is set in data.js
      const real = (u) => u && u !== "#";
      const links = [
        real(p.live) ? `<a href="${esc(p.live)}" target="_blank" rel="noopener">Live ↗</a>` : "",
        real(p.code) ? `<a href="${esc(p.code)}" target="_blank" rel="noopener">Code ↗</a>` : "",
      ].join("");
      return `<article class="project-card reveal" data-tag="${esc(p.tag)}">
        <div class="project-thumb" ${bg}>${thumb}<span class="tag">${esc(p.tag)}</span></div>
        <div class="project-body"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
          <div class="chips">${p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div></div>
        ${links ? `<div class="project-links">${links}</div>` : ""}
      </article>`;
    })
    .join("");

  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    const tag = btn.dataset.tag;
    document.querySelectorAll(".filter-btn").forEach((b) => b.setAttribute("aria-selected", b === btn));
    document.querySelectorAll(".project-card").forEach((c) => {
      c.classList.toggle("hidden", tag !== "All" && c.dataset.tag !== tag);
    });
  });

  $("#timeline").innerHTML = d.experience
    .map(
      (e) => `<li class="reveal"><div><p class="period">${esc(e.period)}</p></div>
        <div><h3>${esc(e.role)}</h3><p class="company">${esc(e.company)}</p>
        <ul>${e.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul></div></li>`
    )
    .join("");

  $("#contact-blurb").textContent = d.contactBlurb;
  const email = $("#contact-email");
  email.textContent = d.email;
  email.href = `mailto:${d.email}`;

  // ---------- Contact form ----------
  // Sends in the background via FormSubmit (https://formsubmit.co) so visitors don't need an email app.
  // Falls back to opening the visitor's email app if the service can't be reached.
  const form = $("#contact-form");
  const status = $("#form-status");
  const submitBtn = $("#form-submit");
  const setStatus = (msg, type) => {
    status.textContent = msg;
    status.className = `form-status ${type || ""}`;
  };
  const mailtoFallback = (name, from, message) => {
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message.slice(0, 1500)}\n\n— ${name} (${from})`);
    window.location.href = `mailto:${d.email}?subject=${subject}&body=${body}`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;

    // Validation with clear messages
    const fields = [...form.querySelectorAll("input[required], textarea[required]")];
    fields.forEach((el) => (el.value = el.value.trim()));
    const invalid = fields.find((el) => !el.checkValidity());
    fields.forEach((el) => el.setAttribute("aria-invalid", !el.checkValidity()));
    if (invalid) {
      const label = invalid.closest("label").firstChild.textContent.trim();
      setStatus(invalid.type === "email" && invalid.value ? "Please enter a valid email address." : `Please fill in your ${label.toLowerCase()}.`, "error");
      invalid.focus();
      return;
    }

    const f = new FormData(form);
    if (f.get("_honey")) return; // bot
    const name = f.get("name"), from = f.get("email"), message = f.get("message");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    setStatus("", "");

    try {
      if (!navigator.onLine) throw new Error("offline");
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15000);
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(d.email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email: from,
          message,
          _subject: `Portfolio contact from ${name}`,
          _replyto: from,
          _template: "table",
          _captcha: "false",
        }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message || `HTTP ${res.status}`);

      form.reset();
      fields.forEach((el) => el.removeAttribute("aria-invalid"));
      setStatus(`Thanks, ${name.split(" ")[0]}! Your message has been sent — I'll get back to you soon.`, "success");
    } catch (err) {
      console.warn("Contact form:", err);
      setStatus(
        err.message === "offline"
          ? "You're offline — opening your email app instead."
          : "Couldn't send right now — opening your email app instead.",
        "error"
      );
      mailtoFallback(name, from, message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
    }
  });

  // Optional privacy-friendly analytics (GoatCounter) — only loaded when a code is set in data.js
  if (d.analytics && /^[a-z0-9-]+$/i.test(d.analytics.goatcounter || "") && location.protocol !== "file:" && location.hostname.endsWith("github.io")) {
    const gc = document.createElement("script");
    gc.async = true;
    gc.src = "https://gc.zgo.at/count.js";
    gc.dataset.goatcounter = `https://${d.analytics.goatcounter}.goatcounter.com/count`;
    document.head.append(gc);
  }

  $("#year").textContent = new Date().getFullYear();
  $("#footer-name").textContent = d.name;

  // ---------- Theme toggle ----------
  const root = document.documentElement;
  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  $("#theme-toggle").addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ---------- Mobile menu ----------
  const menuBtn = $("#menu-btn");
  const links = $("#nav-links");
  const scrim = $("#nav-scrim");
  const html = document.documentElement;

  // Extras shown only inside the mobile drawer: CTA + socials
  const extra = document.createElement("li");
  extra.className = "nav-extra";
  extra.innerHTML = `<a class="btn btn-primary" href="#contact">Hire me</a><ul class="socials">${socialsHTML()}</ul>`;
  links.append(extra);

  const setMenu = (open, restoreFocus) => {
    links.classList.toggle("open", open);
    scrim.classList.toggle("open", open);
    html.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (!open && restoreFocus) menuBtn.focus();
  };
  const isOpen = () => links.classList.contains("open");
  menuBtn.addEventListener("click", () => setMenu(!isOpen()));
  scrim.addEventListener("click", () => setMenu(false));
  links.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && isOpen() && setMenu(false, true));
  matchMedia("(min-width: 901px)").addEventListener("change", (m) => m.matches && setMenu(false));

  // ---------- Back-to-top button ----------
  const fab = $("#to-top");
  fab.hidden = false;
  fab.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // ---------- Header shadow + active link ----------
  const header = $(".site-header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
    fab.classList.toggle("show", window.scrollY > 700);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const navMap = new Map([...links.querySelectorAll("a")].map((a) => [a.getAttribute("href").slice(1), a]));
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            navMap.forEach((a) => a.classList.remove("active"));
            navMap.get(en.target.id)?.classList.add("active");
          }
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

    // ---------- Scroll reveal ----------
    // When js/effects.js (anime.js) is active it handles reveals itself.
    if (window.FX && window.FX.enabled) return registerSW();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  }

  registerSW();

  // ---------- PWA (offline + installable → APK) ----------
  function registerSW() {
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
    }
  }
})();
