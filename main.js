(() => {
  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = mqReduced.matches; // boot-time snapshot (counters only)
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  const revealObs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      revealObs.unobserve(e.target);
    }),
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

  /* ---------- Animated counters ---------- */
  const countObs = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    const dur = reduced ? 0 : 1600, start = performance.now();
    el.dataset.state = "running";
    const tick = (now) => {
      const p = dur ? Math.min((now - start) / dur, 1) : 1;
      // read the suffix every frame so a language switch mid-animation is picked up
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (el.dataset.suffix || "");
      if (p < 1) requestAnimationFrame(tick);
      else el.dataset.state = "done";
    };
    requestAnimationFrame(tick);
    countObs.unobserve(el);
  }), { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach((el) => {
    if (reduced) {
      el.textContent = el.dataset.count + (el.dataset.suffix || "");
      el.dataset.state = "done";
      return;
    }
    el.textContent = "0" + (el.dataset.suffix || "");
    el.dataset.state = "idle";
    countObs.observe(el);
  });

  /* Re-render counter suffixes (e.g. " yrs" / " anos") when i18n.js switches language */
  addEventListener("langchange", () => {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const suffix = el.dataset.suffix || "";
      if (el.dataset.state === "running") return; // next frame picks up the new suffix
      el.textContent = (el.dataset.state === "idle" ? "0" : el.dataset.count) + suffix;
    });
  });

  /* ---------- Scroll-driven: progress bar, nav, timeline fill, parallax ---------- */
  const progress = document.querySelector(".progress");
  const nav = document.getElementById("nav");
  const timeline = document.querySelector(".timeline");
  const fill = document.querySelector(".tl-fill");
  const blobs = document.querySelectorAll(".blob");
  const photo = document.querySelector(".hero-photo");
  let lastY = 0, ticking = false;

  const onScroll = () => {
    const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    nav.classList.toggle("scrolled", y > 30);
    // hysteresis: ignore tiny scroll jitters so the bar doesn't flicker
    if (y <= 500 || document.querySelector(".nav-links.open")) nav.classList.remove("hidden");
    else if (y - lastY > 10) nav.classList.add("hidden");
    else if (lastY - y > 6) nav.classList.remove("hidden");
    lastY = y;

    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const p = (innerHeight * 0.6 - r.top) / r.height;
      fill.style.setProperty("--fill", Math.max(0, Math.min(1, p)));
    }
    if (!mqReduced.matches && y < innerHeight) {
      blobs.forEach((b, i) => (b.style.translate = `0 ${y * (0.15 + i * 0.1)}px`));
      if (photo) photo.style.translate = `0 ${y * -0.08}px`;
    }
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* ---------- Active nav link ---------- */
  const links = [...document.querySelectorAll(".nav-links a")];
  const secObs = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => secObs.observe(s));

  /* ---------- Mobile menu ---------- */
  const btn = document.querySelector(".menu-btn"), menu = document.querySelector(".nav-links");
  const toggle = (open) => {
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  btn.addEventListener("click", () => toggle(!menu.classList.contains("open")));
  links.forEach((a) => a.addEventListener("click", () => toggle(false)));
  // Escape closes the drawer and hands focus back to the burger
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) { toggle(false); btn.focus(); }
  });
  // Leaving the mobile layout with the drawer open must never strand body overflow
  const mqDesktop = window.matchMedia("(min-width: 1121px)");
  const onDesktop = () => { if (mqDesktop.matches && menu.classList.contains("open")) toggle(false); };
  if (mqDesktop.addEventListener) mqDesktop.addEventListener("change", onDesktop);
  else if (mqDesktop.addListener) mqDesktop.addListener(onDesktop);

  if (!finePointer) return;

  /* ---------- Card spotlight (soft glow follows the pointer; lift is pure CSS) ---------- */
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      if (mqReduced.matches) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });

  /* ---------- Magnetic buttons (subtle) ---------- */
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      if (mqReduced.matches) return;
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.12}px, ${(e.clientY - r.top - r.height / 2) * 0.18}px)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });

  /* ---------- Hero photo follows cursor slightly (rAF-throttled) ---------- */
  const hero = document.querySelector(".hero");
  const img = photo && photo.querySelector("img");
  const chips = photo ? [...photo.querySelectorAll(".float-card")] : [];
  if (hero && img) {
    let px = 0, py = 0, queued = false;
    const paint = () => {
      queued = false;
      img.style.transform = `translate(${px * 6}px, ${py * 6}px)`;
      chips.forEach((c, i) => (c.style.translate = `${px * -(10 + i * 2)}px ${py * -(10 + i * 2)}px`));
    };
    hero.addEventListener("pointermove", (e) => {
      if (mqReduced.matches) return;
      px = e.clientX / innerWidth - 0.5; py = e.clientY / innerHeight - 0.5;
      if (!queued) { queued = true; requestAnimationFrame(paint); }
    });
    hero.addEventListener("pointerleave", () => { px = 0; py = 0; if (!queued) { queued = true; requestAnimationFrame(paint); } });
  }
})();
