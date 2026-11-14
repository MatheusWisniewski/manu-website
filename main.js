(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    nav.classList.toggle("hidden", y > lastY && y > 500 && !document.querySelector(".nav-links.open"));
    lastY = y;

    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const p = (innerHeight * 0.6 - r.top) / r.height;
      fill.style.setProperty("--fill", Math.max(0, Math.min(1, p)));
    }
    if (!reduced && y < innerHeight) {
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

  if (reduced || !finePointer) return;

  /* ---------- Card tilt + spotlight ---------- */
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("pointerenter", () => {
      card.style.transition = "transform .2s ease-out, box-shadow .4s, border-color .4s";
    });
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => (card.style.transform = ""));
  });

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });

  /* ---------- Hero photo follows cursor slightly ---------- */
  const img = photo && photo.querySelector("img");
  document.querySelector(".hero").addEventListener("pointermove", (e) => {
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    img.style.transform = `translate(${x * 14}px, ${y * 14}px)`;
    photo.querySelectorAll(".float-card").forEach((c, i) => (c.style.translate = `${x * -(20 + i * 10)}px ${y * -(20 + i * 10)}px`));
  });
})();
