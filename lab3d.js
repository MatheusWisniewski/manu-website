/* Interactive 3D Two-Bay Paediatric Ward IPC Simulator + Live UKHSA England Surveillance Feed */
import * as THREE from "./assets/vendor/three.module.min.js";

(() => {
  const wrap = document.getElementById("labCanvasWrap");
  let canvas = document.getElementById("labCanvas");
  const labSec = document.getElementById("lab");
  if (!canvas || !wrap || !labSec) return;

  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Verified 2026 UKHSA England Fallback Snapshot (W34–W46 2026) ---------- */
  const UKHSA_FALLBACK = {
    rsv: {
      under5: [
        ["2026-08-17", 1.3], ["2026-08-24", 0.46], ["2026-08-31", 0.49], ["2026-09-07", 3.15],
        ["2026-09-14", 3.35], ["2026-09-21", 1.56], ["2026-09-28", 3.39], ["2026-10-05", 6.84],
        ["2026-10-12", 5.87], ["2026-10-19", 8.92], ["2026-10-26", 16.83], ["2026-11-02", 17.48],
      ],
      all: [
        ["2026-08-17", 0.2], ["2026-08-24", 0.11], ["2026-08-31", 0.11], ["2026-09-07", 0.61],
        ["2026-09-14", 0.81], ["2026-09-21", 0.29], ["2026-09-28", 0.65], ["2026-10-05", 0.83],
        ["2026-10-12", 0.92], ["2026-10-19", 1.61], ["2026-10-26", 2.89], ["2026-11-02", 3.2],
      ],
    },
    flu: {
      under5: [
        ["2026-08-17", 2.61], ["2026-08-24", 0.46], ["2026-08-31", 2.44], ["2026-09-07", 1.74],
        ["2026-09-14", 2.74], ["2026-09-21", 2.34], ["2026-09-28", 3.15], ["2026-10-05", 5.83],
        ["2026-10-12", 5.84], ["2026-10-19", 6.97], ["2026-10-26", 5.36], ["2026-11-02", 6.31],
      ],
      all: [
        ["2026-08-17", 2.22], ["2026-08-24", 2.35], ["2026-08-31", 2.47], ["2026-09-07", 3.44],
        ["2026-09-14", 4.49], ["2026-09-21", 5.4], ["2026-09-28", 5.79], ["2026-10-05", 6.43],
        ["2026-10-12", 5.83], ["2026-10-19", 6.38], ["2026-10-26", 7.53], ["2026-11-02", 7.75],
      ],
    },
    covid: {
      under5: null,
      all: [
        ["2026-08-24", 2.95], ["2026-08-31", 3.72], ["2026-09-07", 5.02], ["2026-09-14", 6.37],
        ["2026-09-21", 7.51], ["2026-09-28", 8.82], ["2026-10-05", 9.36], ["2026-10-12", 9.35],
        ["2026-10-19", 9.1], ["2026-10-26", 8.2], ["2026-11-02", 7.58], ["2026-11-09", 7.6],
      ],
    },
  };

  const PROFILES = {
    rsv: { r0: 3.0, hygieneWeight: 0.56, vacWeight: 0.78, isoWeight: 0.58, defaults: { h: 85, v: 85, i: 80 }, subKey: "feedRsv" },
    flu: { r0: 1.8, hygieneWeight: 0.52, vacWeight: 0.72, isoWeight: 0.55, defaults: { h: 82, v: 78, i: 75 }, subKey: "feedFlu" },
    covid: { r0: 3.4, hygieneWeight: 0.45, vacWeight: 0.75, isoWeight: 0.65, defaults: { h: 82, v: 82, i: 84 }, subKey: "feedCovid" },
    hai: { r0: 2.1, hygieneWeight: 0.74, vacWeight: 0.52, isoWeight: 0.68, defaults: { h: 88, v: 75, i: 86 }, subKey: "feedHai" },
  };

  const SCENARIO_PRESETS = {
    bundle: { h: 85, v: 85, i: 80 },
    surge: { h: 55, v: 55, i: 50 },
    unmit: { h: 20, v: 25, i: 20 },
  };

  const MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  };

  const COPY = {
    en: {
      contained: "Contained · Rₑ < 1",
      atRisk: "Transmission risk · Rₑ ≥ 1",
      r0Prefix: "Baseline R₀ ≈",
      c2Resp: "Immunisation / prophylaxis coverage",
      c2Hai: "Cohorting & contact barrier coverage",
      legResp: "Immunised / protected",
      legHai: "Barrier-protected / cohorted",
      bayA: "Bay A · 01–10",
      bayB: "Bay B · 11–20",
      noteContained: (p, re, sec) =>
        `Illustrative IPC barrier model — chain interrupted for ${p}: effective Rₑ = ${re.toFixed(2)} limits spread (${sec} secondary ${sec === 1 ? "case" : "cases"}).`,
      noteRisk: (p, re, sec) =>
        `Illustrative IPC barrier model — elevated vulnerability for ${p}: Rₑ = ${re.toFixed(2)} leaves ~${sec} ${sec === 1 ? "bed" : "beds"} exposed. Raise hygiene, protection, or isolation speed.`,
      bedLabel: (num, st) => `Bed ${String(num).padStart(2, "0")} · ${st}`,
      states: { imm: "Protected", sus: "Susceptible", exp: "Exposed", idx: "Index case", iso: "Isolated" },
      live: "Live API",
      snapshot: "2026 Snapshot",
      loading: "Syncing…",
      feedRsv: "RSV PCR testing positivity by age group",
      feedFlu: "Influenza weekly testing positivity by age group",
      feedCovid: "COVID-19 7-day rolling PCR positivity",
      feedHai: "Winter respiratory surge (RSV proxy) driving paediatric bed-pressure context",
      u5Label: "Paediatric (00–04 yrs)",
      allLabel: "All ages",
      covLabel: "7-day rolling positivity (All ages)",
      haiRsvLabel: "Winter ward surge (RSV <5s)",
      haiIpcLabel: "IPC focus (MDRO / HAI)",
      haiIpcVal: "Hand hygiene & cohorting",
      calloutRatio: (ratio) => `Under-5 RSV positivity is currently ${ratio}× the all-age baseline across England.`,
      datePrefix: "Latest data:",
      chartLegendU5: "00–04 yrs",
      chartLegendAll: "All ages",
    },
    pt: {
      contained: "Controlado · Rₑ < 1",
      atRisk: "Risco de transmissão · Rₑ ≥ 1",
      r0Prefix: "R₀ basal ≈",
      c2Resp: "Cobertura vacinal / profilaxia",
      c2Hai: "Coorte de leitos e barreiras de contato",
      legResp: "Imunizado / protegido",
      legHai: "Protegido por barreira / coorte",
      bayA: "Ala A · 01–10",
      bayB: "Ala B · 11–20",
      noteContained: (p, re, sec) =>
        `Modelo ilustrativo de CCIH — cadeia interrompida para ${p}: Rₑ = ${re.toFixed(2)} contém a transmissão (${sec} ${sec === 1 ? "caso secundário" : "casos secundários"}).`,
      noteRisk: (p, re, sec) =>
        `Modelo ilustrativo de CCIH — vulnerabilidade para ${p}: Rₑ = ${re.toFixed(2)} expõe até ${sec} ${sec === 1 ? "leito" : "leitos"}. Reforce a higienização das mãos, a proteção ou o isolamento.`,
      bedLabel: (num, st) => `Leito ${String(num).padStart(2, "0")} · ${st}`,
      states: { imm: "Protegido", sus: "Suscetível", exp: "Exposto", idx: "Caso-índice", iso: "Em isolamento" },
      live: "API ao vivo",
      snapshot: "Resumo 2026",
      loading: "Sincronizando…",
      feedRsv: "Positividade semanal de VSR por faixa etária (Inglaterra)",
      feedFlu: "Positividade semanal de Influenza por faixa etária (Inglaterra)",
      feedCovid: "Positividade móvel de 7 dias para COVID-19 (Inglaterra)",
      feedHai: "Pressão sazonal respiratória (VSR) como contexto de lotação pediátrica",
      u5Label: "Pediátrico (00–04 anos)",
      allLabel: "Todas as idades",
      covLabel: "Positividade média 7 dias (Todas as idades)",
      haiRsvLabel: "Pressão sazonal (VSR <5 anos)",
      haiIpcLabel: "Foco de CCIH (IRAS / MDR)",
      haiIpcVal: "Higiene das mãos e coorte",
      calloutRatio: (ratio) => `Positividade de VSR em menores de 5 anos está ${ratio}× acima da média geral na Inglaterra.`,
      datePrefix: "Dado mais recente:",
      chartLegendU5: "00–04 anos",
      chartLegendAll: "Todas as idades",
    },
  };

  const getLang = () => (window.i18n && window.i18n.lang === "pt" ? "pt" : "en");
  const getProfileName = (id) => {
    const btn = labSec.querySelector(`.lab-tab[data-profile="${id}"]`);
    return btn ? btn.textContent.trim() : id.toUpperCase();
  };

  const fmtAxisDate = (iso) => {
    const [, m, d] = iso.split("-").map(Number);
    const mon = MONTHS[getLang()][(m || 1) - 1] || "";
    return getLang() === "pt" ? `${d} ${mon}` : `${d} ${mon}`;
  };

  /* ---------- DOM References ---------- */
  const elTabs = [...labSec.querySelectorAll(".lab-tab")];
  const elPresets = [...labSec.querySelectorAll(".lab-preset")];
  const elStatus = document.getElementById("labStatusPill");
  const elTip = document.getElementById("labNodeTip");
  const elBayA = document.getElementById("labBayATag");
  const elBayB = document.getElementById("labBayBTag");
  const elLegProt = document.getElementById("labLegProt");
  const elRe = document.getElementById("labRe");
  const elProt = document.getElementById("labProtected");
  const elSec = document.getElementById("labSecondary");
  const elSimBtn = document.getElementById("labSimulate");
  const elR0 = document.getElementById("labR0Tag");
  const elNote = document.getElementById("labNote");
  const elC2Label = labSec.querySelector('[data-i18n="lab.c2"]');

  const sHygiene = document.getElementById("ipcHygiene");
  const sVaccine = document.getElementById("ipcVaccine");
  const sIsolation = document.getElementById("ipcIsolation");
  const oHygiene = document.getElementById("ipcHygieneOut");
  const oVaccine = document.getElementById("ipcVaccineOut");
  const oIsolation = document.getElementById("ipcIsolationOut");

  const elFeedSub = document.getElementById("ukhsaSubtitle");
  const elFeedBadge = document.getElementById("ukhsaStatus");
  const elFeedRefresh = document.getElementById("ukhsaRefresh");
  const elFeedMetrics = document.getElementById("ukhsaMetrics");
  const elFeedCallout = document.getElementById("ukhsaCallout");
  const elFeedLegend = document.getElementById("ukhsaLegend");
  const elFeedHover = document.getElementById("ukhsaHoverReadout");
  const elFeedChart = document.getElementById("ukhsaChart");
  const elFeedDate = document.getElementById("ukhsaDate");

  /* ---------- Two-Bay Architectural 20-Bed Ward Topology ---------- */
  let activeProfile = "rsv";
  let indexBed = 2; // Bay A Bed 03
  let activeTipBed = -1;
  let hoveredBed = -1;
  let focusedBed = 2;
  let waveProgress = 1;
  let waveStart = 0;

  // Bay A (0–9): North arc z < -0.75; Bay B (10–19): South arc z > +0.75; calm horizontal ward plane
  const beds = Array.from({ length: 20 }, (_, i) => {
    const bay = i < 10 ? 0 : 1;
    const idx = i % 10;
    const t = idx / 9 - 0.5; // -0.5 .. +0.5
    const x = t * 5.6;
    const arcPull = Math.cos(t * Math.PI) * 0.65;
    const z = bay === 0 ? -(0.88 + arcPull * 0.9) : 0.88 + arcPull * 0.9;
    const y = (idx % 2 === 0 ? 0.04 : -0.04);
    return {
      id: i,
      bay,
      pos: { x, y, z },
      state: "imm",
      isolated: false,
      hop: 99,
      priority: (i * 7 + 3) % 20,
    };
  });

  // Adjacent intra-bay links + central cross-corridor bridge links
  const edges = [];
  const edgeSet = new Set();
  const addEdge = (u, v) => {
    const a = Math.min(u, v), b = Math.max(u, v);
    const key = `${a}-${b}`;
    if (!edgeSet.has(key) && a !== b) {
      edgeSet.add(key);
      edges.push({ a, b, active: false, deflected: false, hopOrder: 99 });
    }
  };
  for (let bay = 0; bay < 2; bay++) {
    const off = bay * 10;
    for (let k = 0; k < 9; k++) addEdge(off + k, off + k + 1);
    for (let k = 0; k < 8; k += 2) addEdge(off + k, off + k + 2);
  }
  [1, 3, 5, 7, 8].forEach((k) => addEdge(k, k + 10));

  let simMetrics = { re: 0.28, protectedCount: 17, secondaryCount: 0 };

  function paintSliderTrack(input) {
    const pct = ((+input.value - +input.min) / (+input.max - +input.min)) * 100;
    input.style.setProperty("--fill-pct", `${pct.toFixed(1)}%`);
    input.setAttribute("aria-valuetext", `${input.value}%`);
  }

  function syncPresetHighlight() {
    const h = +sHygiene.value, v = +sVaccine.value, iso = +sIsolation.value;
    elPresets.forEach((btn) => {
      const p = SCENARIO_PRESETS[btn.dataset.preset];
      btn.classList.toggle("active", p && p.h === h && p.v === v && p.i === iso);
    });
  }

  function recomputeSimulation(pulse = false) {
    const cfg = PROFILES[activeProfile];
    paintSliderTrack(sHygiene);
    paintSliderTrack(sVaccine);
    paintSliderTrack(sIsolation);

    const h = +sHygiene.value / 100;
    const v = +sVaccine.value / 100;
    const iso = +sIsolation.value / 100;

    oHygiene.textContent = `${Math.round(h * 100)}%`;
    oVaccine.textContent = `${Math.round(v * 100)}%`;
    oIsolation.textContent = `${Math.round(iso * 100)}%`;

    const hygFactor = Math.max(0.14, 1 - cfg.hygieneWeight * h);
    const vacFactor = Math.max(0.08, 1 - cfg.vacWeight * v);
    const isoFactor = Math.max(0.18, 1 - cfg.isoWeight * iso);
    const re = Math.max(0.08, cfg.r0 * hygFactor * vacFactor * isoFactor);

    const protectedTarget = Math.round(20 * v);
    beds.forEach((b) => {
      b.isolated = false;
      b.hop = 99;
      if (b.id === indexBed) {
        b.state = "idx";
        b.isolated = iso >= 0.55;
        b.hop = 0;
      } else if (b.priority < protectedTarget) {
        b.state = "imm";
      } else {
        b.state = "sus";
      }
    });

    const susPool = beds.filter((b) => b.state === "sus");
    const isoTruncate = 1 - iso * 0.58;
    const rawTarget =
      re >= 0.85
        ? Math.round(Math.min(susPool.length, re * 2.4 * isoTruncate))
        : re > 0.68 && susPool.length > 0 && iso < 0.72
          ? 1
          : 0;

    const queue = [indexBed];
    const visited = new Set([indexBed]);
    const exposedOrder = [];
    while (queue.length && exposedOrder.length < rawTarget) {
      const cur = queue.shift();
      for (const e of edges) {
        const nb = e.a === cur ? e.b : e.b === cur ? e.a : -1;
        if (nb === -1 || visited.has(nb)) continue;
        visited.add(nb);
        if (beds[nb].state === "sus") {
          beds[nb].hop = beds[cur].hop + 1;
          exposedOrder.push(beds[nb]);
          queue.push(nb);
          if (exposedOrder.length >= rawTarget) break;
        }
      }
    }
    exposedOrder.forEach((b) => {
      b.state = "exp";
      b.isolated = iso >= 0.78 && b.hop === 1;
    });

    edges.forEach((e) => {
      const ba = beds[e.a], bb = beds[e.b];
      e.active =
        (ba.state === "idx" || ba.state === "exp") &&
        (bb.state === "idx" || bb.state === "exp") &&
        !(ba.isolated && bb.isolated);
      e.deflected =
        ((ba.state === "idx" && bb.state === "imm") || (bb.state === "idx" && ba.state === "imm")) && !e.active;
      e.hopOrder = Math.min(ba.hop, bb.hop);
    });

    const actualProtected = beds.filter((b) => b.state === "imm").length;
    simMetrics = { re, protectedCount: actualProtected, secondaryCount: exposedOrder.length };

    if (pulse) {
      waveProgress = mqReduced.matches ? 1 : 0;
      waveStart = performance.now();
    }

    syncPresetHighlight();
    updateUIReadouts();
    syncVisuals();
  }

  function updateUIReadouts() {
    const c = COPY[getLang()];
    const pName = getProfileName(activeProfile);
    const { re, protectedCount, secondaryCount } = simMetrics;
    const contained = re < 1.0;

    elRe.textContent = re.toFixed(2);
    elProt.textContent = `${protectedCount} / 20`;
    elSec.textContent = `${secondaryCount}`;

    elStatus.textContent = contained ? c.contained : c.atRisk;
    elStatus.classList.toggle("is-risk", !contained);
    elR0.textContent = `${c.r0Prefix} ${PROFILES[activeProfile].r0.toFixed(1)}`;
    elNote.textContent = contained ? c.noteContained(pName, re, secondaryCount) : c.noteRisk(pName, re, secondaryCount);
    if (elC2Label) elC2Label.textContent = activeProfile === "hai" ? c.c2Hai : c.c2Resp;
    if (elLegProt) elLegProt.textContent = activeProfile === "hai" ? c.legHai : c.legResp;
    if (elBayA) elBayA.textContent = c.bayA;
    if (elBayB) elBayB.textContent = c.bayB;
    if (activeTipBed >= 0) showBedTip(activeTipBed);
  }

  /* ---------- 3D WebGL Renderer + Architectural Two-Bay Plane + 2D Fallback ---------- */
  const COLOR = { imm: 0x2dd4bf, sus: 0xe6f4f3, exp: 0xf59e0b, idx: 0xef6b56, iso: 0x38bdf8 };
  const CSS_COLOR = { imm: "#2dd4bf", sus: "#e6f4f3", exp: "#f59e0b", idx: "#ef6b56", iso: "#38bdf8" };

  let isWebGL = false;
  let contextLost = false;
  let renderer, scene, camera, wardGroup, raycaster;
  let nodeMeshes = [], isoRings = [];
  let calmLineSegs, activeLineSegs, waveRingMesh, pulseGroup;
  let pulseMeshes = [];
  let ctx2d = null;
  let rotY = 0.14, rotX = 0.56, targetRotY = 0.14, targetRotX = 0.56;
  let isVisible = false;
  let rafId = 0;

  function buildWardArcPoints(zSign) {
    const pts = [];
    for (let s = 0; s <= 28; s++) {
      const t = s / 28 - 0.5;
      const x = t * 6.0;
      const z = zSign * (0.88 + Math.cos(t * Math.PI) * 0.9);
      pts.push(new THREE.Vector3(x, -0.24, z));
    }
    return pts;
  }

  function rebuildEdgeGeometries() {
    if (!isWebGL || !calmLineSegs || !activeLineSegs) return;
    const calmPos = [];
    const activePos = [];
    edges.forEach((e) => {
      const a = beds[e.a].pos, b = beds[e.b].pos;
      const target = e.active ? activePos : calmPos;
      target.push(a.x, a.y, a.z, b.x, b.y, b.z);
    });
    calmLineSegs.geometry.setAttribute("position", new THREE.Float32BufferAttribute(calmPos, 3));
    activeLineSegs.geometry.setAttribute("position", new THREE.Float32BufferAttribute(activePos, 3));
  }

  function initThree() {
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
      raycaster = new THREE.Raycaster();

      wardGroup = new THREE.Group();
      wardGroup.position.y = 0.08;
      scene.add(wardGroup);

      scene.add(new THREE.AmbientLight(0xdff6f2, 1.35));
      const key = new THREE.DirectionalLight(0xffffff, 1.15);
      key.position.set(4, 8, 6);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x2dd4bf, 0.7);
      rim.position.set(-5, -3, -4);
      scene.add(rim);

      // Architectural Bay A & Bay B floor arcs + quiet central IPC nursing hub ring (1 shared material)
      const archMat = new THREE.LineBasicMaterial({ color: 0x7fd1c7, transparent: true, opacity: 0.28 });
      [-1, 1].forEach((zSign) => {
        const g = new THREE.BufferGeometry().setFromPoints(buildWardArcPoints(zSign));
        wardGroup.add(new THREE.Line(g, archMat));
      });
      const hubGeo = new THREE.RingGeometry(0.42, 0.46, 36);
      const hubMat = new THREE.MeshBasicMaterial({ color: 0x7fd1c7, transparent: true, opacity: 0.22, side: THREE.DoubleSide });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.rotation.x = Math.PI / 2;
      hub.position.y = -0.24;
      wardGroup.add(hub);

      const sphereGeo = new THREE.SphereGeometry(0.24, 24, 20);
      const isoGeo = new THREE.TorusGeometry(0.37, 0.026, 10, 32);
      const isoMat = new THREE.MeshBasicMaterial({ color: COLOR.iso, transparent: true, opacity: 0.92 });

      beds.forEach((b, idx) => {
        const mat = new THREE.MeshStandardMaterial({
          color: COLOR[b.state],
          emissive: COLOR[b.state],
          emissiveIntensity: 0.25,
          roughness: 0.34,
          metalness: 0.08,
        });
        const mesh = new THREE.Mesh(sphereGeo, mat);
        mesh.position.set(b.pos.x, b.pos.y, b.pos.z);
        mesh.userData.bedId = idx;
        wardGroup.add(mesh);
        nodeMeshes.push(mesh);

        const iso = new THREE.Mesh(isoGeo, isoMat);
        iso.position.copy(mesh.position);
        iso.rotation.x = Math.PI * 0.42;
        wardGroup.add(iso);
        isoRings.push(iso);
      });

      const calmMat = new THREE.LineBasicMaterial({ color: 0x7fd1c7, transparent: true, opacity: 0.22 });
      const activeMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.88 });
      calmLineSegs = new THREE.LineSegments(new THREE.BufferGeometry(), calmMat);
      activeLineSegs = new THREE.LineSegments(new THREE.BufferGeometry(), activeMat);
      wardGroup.add(calmLineSegs);
      wardGroup.add(activeLineSegs);

      // Expanding wave shockwave ring from indexBed
      const waveGeo = new THREE.RingGeometry(0.32, 0.4, 40);
      const waveMat = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0, side: THREE.DoubleSide });
      waveRingMesh = new THREE.Mesh(waveGeo, waveMat);
      waveRingMesh.rotation.x = Math.PI / 2;
      wardGroup.add(waveRingMesh);

      // Reusable pulse spheres (max active edges) sharing 1 material & 1 geometry
      const pulseGeo = new THREE.SphereGeometry(0.085, 10, 10);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.92 });
      pulseGroup = new THREE.Group();
      wardGroup.add(pulseGroup);
      for (let k = 0; k < edges.length; k++) {
        const pm = new THREE.Mesh(pulseGeo, pulseMat);
        pm.visible = false;
        pulseGroup.add(pm);
        pulseMeshes.push(pm);
      }

      canvas.addEventListener("webglcontextlost", (e) => {
        e.preventDefault();
        contextLost = true;
        stopLoop();
      });
      canvas.addEventListener("webglcontextrestored", () => {
        contextLost = false;
        syncVisuals();
        startLoop();
      });

      isWebGL = true;
      return true;
    } catch (_) {
      isWebGL = false;
      // Replace canvas so getContext("2d") is never blocked by a partially-bound WebGL context
      const fresh = canvas.cloneNode(false);
      canvas.replaceWith(fresh);
      canvas = fresh;
      return false;
    }
  }

  function initFallback2D() {
    ctx2d = canvas.getContext("2d");
  }

  function resizeCanvas() {
    const rect = wrap.getBoundingClientRect();
    const w = Math.max(180, Math.round(rect.width));
    const h = Math.max(180, Math.round(rect.height));
    if (isWebGL && renderer) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;
      const dist = aspect < 1.1 ? 9.8 / Math.max(0.74, aspect) : 8.8;
      camera.position.set(0, 0.35, dist);
      camera.lookAt(0, -0.05, 0);
      camera.updateProjectionMatrix();
    } else if (ctx2d) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    drawOnce();
  }

  function syncVisuals() {
    if (isWebGL) {
      beds.forEach((b, i) => {
        const m = nodeMeshes[i];
        if (!m) return;
        const cHex = COLOR[b.state];
        m.material.color.setHex(cHex);
        m.material.emissive.setHex(cHex);
        m.material.emissiveIntensity = b.state === "idx" || b.state === "exp" ? 0.52 : b.state === "imm" ? 0.28 : 0.14;
        const sc = b.state === "idx" ? 1.24 : b.id === hoveredBed ? 1.18 : 1.0;
        m.scale.setScalar(sc);
        isoRings[i].visible = b.isolated;
      });
      rebuildEdgeGeometries();
    }
    drawOnce();
  }

  function projectPoint(pos, w, h) {
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const x1 = pos.x * cosY - pos.z * sinY;
    const z1 = pos.x * sinY + pos.z * cosY;
    const y2 = (pos.y + 0.08) * cosX - z1 * sinX;
    const z2 = (pos.y + 0.08) * sinX + z1 * cosX;
    const scale = 6.2 / (9.2 - z2);
    const span = Math.min(w, h) * 0.125;
    return { x: w * 0.5 + x1 * scale * span, y: h * 0.5 - y2 * scale * span, z: z2, scale };
  }

  function updateBayOverlayPositions(w, h) {
    if (!elBayA || !elBayB) return;
    if (w < 260) {
      elBayA.style.opacity = "0";
      elBayB.style.opacity = "0";
      return;
    }
    elBayA.style.opacity = "";
    elBayB.style.opacity = "";
    if (isWebGL && camera) {
      const pA = new THREE.Vector3(0, 0.25, -2.05).applyEuler(wardGroup.rotation).add(wardGroup.position).project(camera);
      const pB = new THREE.Vector3(0, -0.25, 2.05).applyEuler(wardGroup.rotation).add(wardGroup.position).project(camera);
      elBayA.style.left = `${((pA.x * 0.5 + 0.5) * w).toFixed(1)}px`;
      elBayA.style.top = `${Math.max(16, Math.min(h - 18, (-pA.y * 0.5 + 0.5) * h)).toFixed(1)}px`;
      elBayB.style.left = `${((pB.x * 0.5 + 0.5) * w).toFixed(1)}px`;
      elBayB.style.top = `${Math.max(16, Math.min(h - 18, (-pB.y * 0.5 + 0.5) * h)).toFixed(1)}px`;
    } else {
      const pA = projectPoint({ x: 0, y: 0.25, z: -2.05 }, w, h);
      const pB = projectPoint({ x: 0, y: -0.25, z: 2.05 }, w, h);
      elBayA.style.left = `${pA.x.toFixed(1)}px`;
      elBayA.style.top = `${Math.max(16, Math.min(h - 18, pA.y)).toFixed(1)}px`;
      elBayB.style.left = `${pB.x.toFixed(1)}px`;
      elBayB.style.top = `${Math.max(16, Math.min(h - 18, pB.y)).toFixed(1)}px`;
    }
  }

  let projected2D = [];

  function renderFrame(now) {
    if (contextLost) return;
    if (waveProgress < 1 && !mqReduced.matches) {
      waveProgress = Math.min(1, (now - waveStart) / 950);
    } else {
      waveProgress = 1;
    }

    if (!dragging && !mqReduced.matches) targetRotY += 0.0018;
    if (mqReduced.matches) {
      rotY = targetRotY;
      rotX = targetRotX;
    } else {
      rotY += (targetRotY - rotY) * 0.14;
      rotX += (targetRotX - rotX) * 0.14;
    }

    const rect = wrap.getBoundingClientRect();
    const w = Math.max(180, rect.width);
    const h = Math.max(180, rect.height);
    const contained = simMetrics.re < 1.0;

    if (isWebGL && renderer) {
      wardGroup.rotation.y = rotY;
      wardGroup.rotation.x = rotX;

      // Wire waveProgress to shockwave ring + shield deflection shimmer + exposed bloom
      const wp = waveProgress;
      const inWave = wp < 1 && !mqReduced.matches;
      waveRingMesh.visible = inWave;
      if (inWave) {
        const idxPos = beds[indexBed].pos;
        waveRingMesh.position.set(idxPos.x, idxPos.y - 0.1, idxPos.z);
        waveRingMesh.scale.setScalar(1 + wp * 5.2);
        waveRingMesh.material.color.setHex(contained ? 0x2dd4bf : 0xf59e0b);
        waveRingMesh.material.opacity = (1 - wp) * 0.72;
      }

      beds.forEach((b, i) => {
        const m = nodeMeshes[i];
        if (!m) return;
        let sc = b.state === "idx" ? 1.24 : b.id === hoveredBed ? 1.18 : 1.0;
        let emi = b.state === "idx" || b.state === "exp" ? 0.52 : b.state === "imm" ? 0.28 : 0.14;
        if (b.state === "idx" && !mqReduced.matches) {
          sc = 1.2 + Math.sin(now * 0.005) * 0.07;
        } else if (inWave && b.state === "imm" && contained) {
          const boost = Math.sin(Math.min(1, wp * 1.4) * Math.PI);
          emi = 0.28 + boost * 0.55;
        } else if (inWave && b.state === "exp") {
          const threshold = Math.min(0.65, (b.hop - 1) * 0.25);
          const local = Math.max(0, Math.min(1, (wp - threshold) / 0.35));
          sc = 0.72 + local * 0.32;
        }
        m.scale.setScalar(sc);
        m.material.emissiveIntensity = emi;
      });

      const tPhase = mqReduced.matches ? 0.5 : (now * 0.0014) % 1;
      let activeIdx = 0;
      edges.forEach((e, i) => {
        const pm = pulseMeshes[activeIdx++];
        if (!pm) return;
        const showPulse = e.active && !mqReduced.matches && waveProgress >= Math.min(0.5, e.hopOrder * 0.22);
        pm.visible = showPulse;
        if (showPulse) {
          const fromIdx = beds[e.a].hop <= beds[e.b].hop ? e.a : e.b;
          const toIdx = fromIdx === e.a ? e.b : e.a;
          const A = beds[fromIdx].pos, B = beds[toIdx].pos;
          const u = (tPhase + i * 0.17) % 1;
          pm.position.set(A.x + (B.x - A.x) * u, A.y + (B.y - A.y) * u, A.z + (B.z - A.z) * u);
        }
      });
      renderer.render(scene, camera);
    } else if (ctx2d) {
      ctx2d.clearRect(0, 0, w, h);

      // Architectural Bay A & B arcs
      [-1, 1].forEach((zSign) => {
        ctx2d.beginPath();
        for (let s = 0; s <= 24; s++) {
          const t = s / 24 - 0.5;
          const pt = projectPoint({ x: t * 6.0, y: -0.24, z: zSign * (0.88 + Math.cos(t * Math.PI) * 0.9) }, w, h);
          if (s === 0) ctx2d.moveTo(pt.x, pt.y);
          else ctx2d.lineTo(pt.x, pt.y);
        }
        ctx2d.strokeStyle = "rgba(127, 209, 199, 0.26)";
        ctx2d.lineWidth = 1.2;
        ctx2d.stroke();
      });

      projected2D = beds.map((b) => ({ bed: b, ...projectPoint(b.pos, w, h) }));
      const tPhase = mqReduced.matches ? 0.5 : (now * 0.0014) % 1;

      edges.forEach((e, i) => {
        const pA = projected2D[e.a], pB = projected2D[e.b];
        ctx2d.beginPath();
        ctx2d.moveTo(pA.x, pA.y);
        ctx2d.lineTo(pB.x, pB.y);
        ctx2d.strokeStyle = e.active ? "rgba(245, 158, 11, 0.85)" : "rgba(127, 209, 199, 0.2)";
        ctx2d.lineWidth = e.active ? 2 : 1.1;
        ctx2d.stroke();

        if (e.active && !mqReduced.matches) {
          const fromP = beds[e.a].hop <= beds[e.b].hop ? pA : pB;
          const toP = fromP === pA ? pB : pA;
          const u = (tPhase + i * 0.17) % 1;
          ctx2d.beginPath();
          ctx2d.arc(fromP.x + (toP.x - fromP.x) * u, fromP.y + (toP.y - fromP.y) * u, 3.2, 0, Math.PI * 2);
          ctx2d.fillStyle = "#f59e0b";
          ctx2d.fill();
        }
      });

      if (waveProgress < 1 && !mqReduced.matches) {
        const ip = projected2D[indexBed];
        ctx2d.beginPath();
        ctx2d.arc(ip.x, ip.y, 12 + waveProgress * 56, 0, Math.PI * 2);
        ctx2d.strokeStyle = contained ? `rgba(45, 212, 191, ${(1 - waveProgress) * 0.75})` : `rgba(245, 158, 11, ${(1 - waveProgress) * 0.75})`;
        ctx2d.lineWidth = 2;
        ctx2d.stroke();
      }

      [...projected2D].sort((a, b) => a.z - b.z).forEach(({ bed, x, y, scale }) => {
        const pulseBonus = bed.state === "idx" && !mqReduced.matches ? Math.sin(now * 0.005) * 0.9 : 0;
        const r = (bed.state === "idx" ? 11 : bed.id === hoveredBed ? 10.5 : 8.8) * scale + pulseBonus;
        ctx2d.beginPath();
        ctx2d.arc(x, y, r, 0, Math.PI * 2);
        ctx2d.fillStyle = CSS_COLOR[bed.state];
        ctx2d.fill();
        if (bed.isolated) {
          ctx2d.beginPath();
          ctx2d.arc(x, y, r + 4.5, 0, Math.PI * 2);
          ctx2d.strokeStyle = CSS_COLOR.iso;
          ctx2d.lineWidth = 2;
          ctx2d.stroke();
        }
      });
    }
    updateBayOverlayPositions(w, h);
  }

  function drawOnce() {
    renderFrame(performance.now());
  }

  function startLoop() {
    if (rafId || mqReduced.matches || !isVisible || document.hidden || contextLost) return;
    const loop = (now) => {
      if (!isVisible || document.hidden || mqReduced.matches || contextLost) {
        rafId = 0;
        return;
      }
      renderFrame(now);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
  }

  function stopLoop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  /* ---------- Pointer & Keyboard Ward Navigation ---------- */
  let dragging = false, downX = 0, downY = 0, lastX = 0, lastY = 0;

  function pickBed(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    if (isWebGL && raycaster) {
      const ndc = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(nodeMeshes, false);
      return hits.length ? hits[0].object.userData.bedId : -1;
    }
    const px = clientX - rect.left, py = clientY - rect.top;
    let best = -1;
    // Iterate front-to-back in z so occluding front beds win cleanly
    const frontToBack = [...projected2D].sort((a, b) => b.z - a.z);
    for (const p of frontToBack) {
      if (Math.hypot(p.x - px, p.y - py) < 18) {
        best = p.bed.id;
        break;
      }
    }
    return best;
  }

  function showBedTip(bedId) {
    activeTipBed = bedId;
    if (bedId < 0) {
      elTip.classList.remove("visible");
      return;
    }
    const c = COPY[getLang()];
    const b = beds[bedId];
    const st = b.isolated ? `${c.states[b.state]} · ${c.states.iso}` : c.states[b.state];
    elTip.textContent = c.bedLabel(bedId + 1, st);
    elTip.classList.add("visible");
  }

  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    downX = lastX = e.clientX;
    downY = lastY = e.clientY;
    canvas.classList.add("dragging");
  });

  window.addEventListener("pointermove", (e) => {
    if (dragging) {
      targetRotY += (e.clientX - lastX) * 0.008;
      targetRotX = Math.max(0.15, Math.min(1.05, targetRotX + (e.clientY - lastY) * 0.006));
      lastX = e.clientX;
      lastY = e.clientY;
      if (mqReduced.matches || !rafId) drawOnce();
      return;
    }
    if (e.target === canvas) {
      const hit = pickBed(e.clientX, e.clientY);
      if (hit !== hoveredBed) {
        hoveredBed = hit;
        canvas.style.cursor = hit >= 0 ? "pointer" : "grab";
        if (hit >= 0) showBedTip(hit);
        else if (activeTipBed === hoveredBed) showBedTip(-1);
        syncVisuals();
      }
    }
  });

  const endDrag = (e, allowClick) => {
    if (!dragging) return;
    dragging = false;
    canvas.classList.remove("dragging");
    canvas.style.cursor = hoveredBed >= 0 ? "pointer" : "grab";
    if (allowClick && e && Math.hypot(e.clientX - downX, e.clientY - downY) < 6 && e.target === canvas) {
      const hit = pickBed(e.clientX, e.clientY);
      if (hit >= 0) {
        indexBed = hit;
        focusedBed = hit;
        recomputeSimulation(true);
        showBedTip(hit);
      }
    }
  };
  window.addEventListener("pointerup", (e) => endDrag(e, true));
  window.addEventListener("pointercancel", () => endDrag(null, false));

  canvas.addEventListener("pointerleave", () => {
    canvas.style.cursor = "grab";
    if (hoveredBed !== -1) {
      hoveredBed = -1;
      syncVisuals();
    }
  });

  canvas.addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
      focusedBed = (focusedBed + delta + 20) % 20;
      hoveredBed = focusedBed;
      showBedTip(focusedBed);
      syncVisuals();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      indexBed = focusedBed;
      recomputeSimulation(true);
      showBedTip(indexBed);
    }
  });

  /* ---------- Controls, Roving Tablist & Quick Scenario Presets ---------- */
  function selectTab(btn) {
    activeProfile = btn.dataset.profile;
    elTabs.forEach((t) => {
      const on = t === btn;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
    });
    const def = PROFILES[activeProfile].defaults;
    sHygiene.value = def.h;
    sVaccine.value = def.v;
    sIsolation.value = def.i;
    activeChartIdx = -1;
    recomputeSimulation(true);
    renderFeed(isFetching);
  }

  elTabs.forEach((btn, idx) => {
    btn.addEventListener("click", () => selectTab(btn));
    btn.addEventListener("keydown", (e) => {
      let next = -1;
      if (e.key === "ArrowRight") next = (idx + 1) % elTabs.length;
      else if (e.key === "ArrowLeft") next = (idx - 1 + elTabs.length) % elTabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = elTabs.length - 1;
      if (next >= 0) {
        e.preventDefault();
        elTabs[next].focus();
        selectTab(elTabs[next]);
      }
    });
  });

  elPresets.forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = SCENARIO_PRESETS[btn.dataset.preset];
      if (!p) return;
      sHygiene.value = p.h;
      sVaccine.value = p.v;
      sIsolation.value = p.i;
      recomputeSimulation(true);
    });
  });

  [sHygiene, sVaccine, sIsolation].forEach((s) =>
    s.addEventListener("input", () => recomputeSimulation(false))
  );

  elSimBtn.addEventListener("click", () => {
    // Advance cleanly across all 20 beds even when coverage is >=95% (never no-ops)
    let nextId = (indexBed + 1) % 20;
    for (let step = 1; step <= 20; step++) {
      const candidate = (indexBed + step) % 20;
      if (beds[candidate].state !== "imm") {
        nextId = candidate;
        break;
      }
    }
    indexBed = nextId;
    focusedBed = nextId;
    recomputeSimulation(true);
    showBedTip(indexBed);
  });

  /* ---------- Live UKHSA Surveillance Feed (England, Pagination & XSS-Safe SVG) ---------- */
  const feedCache = {
    rsv: { live: false, ...UKHSA_FALLBACK.rsv },
    flu: { live: false, ...UKHSA_FALLBACK.flu },
    covid: { live: false, ...UKHSA_FALLBACK.covid },
  };
  let isFetching = false;
  let activeChartIdx = -1;
  let chartPointsMeta = [];

  function extractSeries(rows, targetAge) {
    const map = new Map();
    for (const r of rows) {
      if (
        r.stratum === "default" &&
        r.sex === "all" &&
        r.age === targetAge &&
        typeof r.date === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(r.date) &&
        Number.isFinite(r.metric_value)
      ) {
        map.set(r.date, r.metric_value);
      }
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }

  async function fetchPaginatedYear(url, signal) {
    const allRows = [];
    let nextUrl = url;
    for (let page = 0; nextUrl && page < 4; page++) {
      const parsed = new URL(nextUrl);
      if (parsed.origin !== "https://api.ukhsa-dashboard.data.gov.uk") break;
      const res = await fetch(parsed.toString(), { signal, cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data.results)) allRows.push(...data.results);
      nextUrl = typeof data.next === "string" ? data.next : null;
    }
    return allRows;
  }

  async function fetchUKHSATopic(topic, metric) {
    const year = new Date().getFullYear();
    const buildUrl = (y) =>
      `https://api.ukhsa-dashboard.data.gov.uk/themes/infectious_disease/sub_themes/respiratory/topics/${encodeURIComponent(topic)}/geography_types/Nation/geographies/England/metrics/${encodeURIComponent(metric)}?year=${y}&page_size=365`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    try {
      let rows = await fetchPaginatedYear(buildUrl(year), controller.signal);
      // Inspect filtered series count (unfiltered Jan rows would bypass year-1 rollover!)
      if (extractSeries(rows, "all").length < 12) {
        try {
          const prevRows = await fetchPaginatedYear(buildUrl(year - 1), controller.signal);
          rows = [...prevRows, ...rows];
        } catch (_) {}
      }
      return rows;
    } finally {
      clearTimeout(timer);
    }
  }

  async function refreshUKHSA() {
    if (isFetching) return;
    isFetching = true;
    elFeedRefresh.classList.add("spinning");
    renderFeed(true);
    try {
      const [rsvRows, fluRows, covRows] = await Promise.all([
        fetchUKHSATopic("RSV", "RSV_testing_positivityByWeek"),
        fetchUKHSATopic("Influenza", "influenza_testing_positivityByWeek"),
        fetchUKHSATopic("COVID-19", "COVID-19_testing_positivity7DayRolling"),
      ]);
      const rsvU5 = extractSeries(rsvRows, "00-04").slice(-12);
      const rsvAll = extractSeries(rsvRows, "all").slice(-12);
      if (rsvU5.length >= 4 && rsvAll.length >= 4) {
        feedCache.rsv = { live: true, under5: rsvU5, all: rsvAll };
      }
      const fluU5 = extractSeries(fluRows, "00-04").slice(-12);
      const fluAll = extractSeries(fluRows, "all").slice(-12);
      if (fluU5.length >= 4 && fluAll.length >= 4) {
        feedCache.flu = { live: true, under5: fluU5, all: fluAll };
      }
      const covAll = extractSeries(covRows, "all");
      if (covAll.length >= 28) {
        const weekly = [];
        for (let i = covAll.length - 1; i >= 0 && weekly.length < 12; i -= 7) weekly.push(covAll[i]);
        weekly.reverse();
        if (weekly.length >= 4) {
          feedCache.covid = { live: true, under5: null, all: weekly };
        }
      }
    } catch (_) {
      // Quietly preserve verified 2026 UKHSA snapshot when offline/sandboxed
    } finally {
      isFetching = false;
      elFeedRefresh.classList.remove("spinning");
      renderFeed(false);
    }
  }

  function svgEl(tag, attrs = {}) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
    return el;
  }

  function updateChartHoverReadout(u5Series, allSeries, c) {
    if (!elFeedHover) return;
    const idx = activeChartIdx >= 0 && activeChartIdx < allSeries.length ? activeChartIdx : -1;
    if (idx < 0) {
      elFeedHover.textContent = "";
      return;
    }
    const dateStr = fmtAxisDate(allSeries[idx][0]);
    const allVal = `${allSeries[idx][1].toFixed(1)}%`;
    if (u5Series && u5Series[idx]) {
      elFeedHover.textContent = `${dateStr} · ${u5Series[idx][1].toFixed(1)}% / ${allVal}`;
    } else {
      elFeedHover.textContent = `${dateStr} · ${allVal}`;
    }
    elFeedChart.querySelectorAll("[data-hover-marker]").forEach((m) => m.remove());
    const meta = chartPointsMeta[idx];
    if (meta) {
      elFeedChart.appendChild(
        svgEl("line", {
          "data-hover-marker": "1",
          x1: meta.x.toFixed(1),
          y1: 10,
          x2: meta.x.toFixed(1),
          y2: 92,
          stroke: "rgba(11,95,107,0.35)",
          "stroke-width": 1.2,
          "stroke-dasharray": "2 2",
        })
      );
      if (meta.u5Y != null) {
        elFeedChart.appendChild(
          svgEl("circle", {
            "data-hover-marker": "1",
            cx: meta.x.toFixed(1),
            cy: meta.u5Y.toFixed(1),
            r: 4.2,
            fill: "#0b5f6b",
            stroke: "#fff",
            "stroke-width": 1.6,
          })
        );
      }
      elFeedChart.appendChild(
        svgEl("circle", {
          "data-hover-marker": "1",
          cx: meta.x.toFixed(1),
          cy: meta.allY.toFixed(1),
          r: 3.6,
          fill: meta.u5Y != null ? "#475569" : "#0b5f6b",
          stroke: "#fff",
          "stroke-width": 1.5,
        })
      );
    }
  }

  function renderSVGChart(u5Series, allSeries, c) {
    const W = 360, H = 116, padL = 36, padR = 12, padT = 10, padB = 24;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const vals = [...(u5Series || []).map((p) => p[1]), ...allSeries.map((p) => p[1])];
    const peak = Math.max(5, ...vals);
    const step = peak > 16 ? 10 : peak > 8 ? 5 : 2;
    const maxV = Math.ceil(peak / step) * step;
    const midV = maxV / 2;

    const toX = (idx, len) => padL + (len > 1 ? (idx / (len - 1)) * plotW : plotW * 0.5);
    const toY = (val) => padT + plotH - (val / maxV) * plotH;

    const polyStr = (pts) => pts.map(([x, y], idx) => `${idx === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const allPts = allSeries.map((p, idx) => [toX(idx, allSeries.length), toY(p[1])]);
    const u5Pts = u5Series ? u5Series.map((p, idx) => [toX(idx, u5Series.length), toY(p[1])]) : null;

    chartPointsMeta = allSeries.map((_, idx) => ({
      x: allPts[idx][0],
      allY: allPts[idx][1],
      u5Y: u5Pts && u5Pts[idx] ? u5Pts[idx][1] : null,
    }));

    elFeedChart.replaceChildren();

    const defs = svgEl("defs");
    const grad = svgEl("linearGradient", { id: "u5Area", x1: 0, y1: 0, x2: 0, y2: 1 });
    grad.appendChild(svgEl("stop", { offset: "0%", "stop-color": "#0b5f6b", "stop-opacity": "0.22" }));
    grad.appendChild(svgEl("stop", { offset: "100%", "stop-color": "#0b5f6b", "stop-opacity": "0.01" }));
    defs.appendChild(grad);
    elFeedChart.appendChild(defs);

    elFeedChart.appendChild(svgEl("line", { x1: padL, y1: padT, x2: W - padR, y2: padT, stroke: "rgba(11,95,107,0.1)", "stroke-dasharray": "3 3" }));
    elFeedChart.appendChild(svgEl("line", { x1: padL, y1: padT + plotH / 2, x2: W - padR, y2: padT + plotH / 2, stroke: "rgba(11,95,107,0.1)", "stroke-dasharray": "3 3" }));
    elFeedChart.appendChild(svgEl("line", { x1: padL, y1: padT + plotH, x2: W - padR, y2: padT + plotH, stroke: "rgba(11,95,107,0.16)" }));

    const addText = (x, y, txt, anchor = "end") => {
      const t = svgEl("text", { x, y, "text-anchor": anchor, "font-size": "10.5", fill: "#485966" });
      t.textContent = txt;
      elFeedChart.appendChild(t);
    };
    addText(padL - 5, padT + 4, `${maxV}%`, "end");
    addText(padL - 5, padT + plotH / 2 + 4, `${midV}%`, "end");
    addText(padL - 5, padT + plotH + 4, "0%", "end");
    addText(padL, H - 4, fmtAxisDate(allSeries[0][0]), "start");
    addText(W - padR, H - 4, fmtAxisDate(allSeries[allSeries.length - 1][0]), "end");

    const topPts = u5Pts || allPts;
    const areaD = `${polyStr(topPts)} L${topPts[topPts.length - 1][0].toFixed(1)},${padT + plotH} L${topPts[0][0].toFixed(1)},${padT + plotH} Z`;
    elFeedChart.appendChild(svgEl("path", { d: areaD, fill: "url(#u5Area)" }));

    if (u5Pts) {
      elFeedChart.appendChild(
        svgEl("path", {
          d: polyStr(allPts),
          fill: "none",
          stroke: "#475569",
          "stroke-width": 1.8,
          "stroke-dasharray": "4 3",
          "stroke-linecap": "round",
        })
      );
      elFeedChart.appendChild(
        svgEl("path", {
          d: polyStr(u5Pts),
          fill: "none",
          stroke: "#0b5f6b",
          "stroke-width": 2.4,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        })
      );
    } else {
      elFeedChart.appendChild(
        svgEl("path", {
          d: polyStr(allPts),
          fill: "none",
          stroke: "#0b5f6b",
          "stroke-width": 2.4,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        })
      );
    }

    const [lx, ly] = topPts[topPts.length - 1];
    elFeedChart.appendChild(svgEl("circle", { cx: lx.toFixed(1), cy: ly.toFixed(1), r: 3.6, fill: "#0b5f6b", stroke: "#fff", "stroke-width": 1.5 }));

    if (elFeedLegend) {
      elFeedLegend.replaceChildren();
      const mkItem = (text, dashed) => {
        const sp = document.createElement("span");
        sp.className = "feed-leg-item";
        const line = document.createElement("i");
        line.className = dashed ? "feed-leg-line dashed" : "feed-leg-line";
        line.setAttribute("aria-hidden", "true");
        sp.append(line, document.createTextNode(text));
        return sp;
      };
      if (u5Pts) elFeedLegend.append(mkItem(c.chartLegendU5, false), mkItem(c.chartLegendAll, true));
      else elFeedLegend.append(mkItem(c.chartLegendAll, false));
    }
    updateChartHoverReadout(u5Series, allSeries, c);
  }

  function getActiveSeriesPair() {
    const feedKey = activeProfile === "hai" ? "rsv" : activeProfile;
    return feedCache[feedKey];
  }

  elFeedChart.addEventListener("pointermove", (e) => {
    const dataset = getActiveSeriesPair();
    if (!dataset.all.length) return;
    const rect = elFeedChart.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 360;
    const norm = Math.max(0, Math.min(1, (relX - 36) / (360 - 48)));
    activeChartIdx = Math.round(norm * (dataset.all.length - 1));
    updateChartHoverReadout(dataset.under5, dataset.all, COPY[getLang()]);
  });
  elFeedChart.addEventListener("pointerleave", () => {
    activeChartIdx = -1;
    const dataset = getActiveSeriesPair();
    updateChartHoverReadout(dataset.under5, dataset.all, COPY[getLang()]);
  });
  elFeedChart.addEventListener("keydown", (e) => {
    const dataset = getActiveSeriesPair();
    if (!dataset.all.length) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      if (activeChartIdx < 0) activeChartIdx = dataset.all.length - 1;
      else activeChartIdx = (activeChartIdx + (e.key === "ArrowRight" ? 1 : -1) + dataset.all.length) % dataset.all.length;
      updateChartHoverReadout(dataset.under5, dataset.all, COPY[getLang()]);
    }
  });

  function renderFeed(loading = false) {
    const c = COPY[getLang()];
    const cfg = PROFILES[activeProfile];
    const dataset = getActiveSeriesPair();

    elFeedSub.textContent = c[cfg.subKey];
    elFeedBadge.textContent = loading ? c.loading : dataset.live ? c.live : c.snapshot;
    elFeedBadge.classList.toggle("live", dataset.live && !loading);

    const lastAll = dataset.all[dataset.all.length - 1];
    elFeedMetrics.replaceChildren();
    const mkStat = (label, val, isAlt = false, full = false, smallVal = false) => {
      const box = document.createElement("div");
      box.className = full ? "feed-stat full" : "feed-stat";
      const lbl = document.createElement("span");
      lbl.className = "feed-stat-label";
      lbl.textContent = label;
      const v = document.createElement("span");
      v.className = isAlt ? "feed-stat-val alt" : "feed-stat-val";
      if (smallVal) v.style.fontSize = "1.02rem";
      v.textContent = val;
      box.append(lbl, v);
      return box;
    };

    if (activeProfile === "hai") {
      const lastU5 = dataset.under5[dataset.under5.length - 1];
      elFeedMetrics.append(
        mkStat(c.haiRsvLabel, `${lastU5[1].toFixed(1)}%`),
        mkStat(c.haiIpcLabel, c.haiIpcVal, true, false, true)
      );
      if (elFeedCallout) elFeedCallout.textContent = "";
    } else if (dataset.under5) {
      const lastU5 = dataset.under5[dataset.under5.length - 1];
      elFeedMetrics.append(
        mkStat(c.u5Label, `${lastU5[1].toFixed(1)}%`),
        mkStat(c.allLabel, `${lastAll[1].toFixed(1)}%`, true)
      );
      if (elFeedCallout) {
        if (lastAll[1] > 0 && lastU5[1] / lastAll[1] >= 1.5) {
          const ratio = (lastU5[1] / lastAll[1]).toFixed(1);
          elFeedCallout.textContent = c.calloutRatio(getLang() === "pt" ? ratio.replace(".", ",") : ratio);
        } else {
          elFeedCallout.textContent = "";
        }
      }
    } else {
      elFeedMetrics.append(mkStat(c.covLabel, `${lastAll[1].toFixed(1)}%`, false, true));
      if (elFeedCallout) elFeedCallout.textContent = "";
    }

    elFeedDate.textContent = `${c.datePrefix} ${lastAll[0]}`;
    renderSVGChart(dataset.under5, dataset.all, c);
  }

  elFeedRefresh.addEventListener("click", refreshUKHSA);

  /* ---------- Lifecycle, Observers & Bootstrap ---------- */
  if (!initThree()) initFallback2D();
  recomputeSimulation(false);
  renderFeed(false);
  resizeCanvas();

  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(wrap);
  } else {
    window.addEventListener("resize", resizeCanvas);
  }

  window.addEventListener("langchange", () => {
    updateUIReadouts();
    renderFeed(isFetching);
  });

  const labObs = new IntersectionObserver(
    (entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) {
        drawOnce();
        startLoop();
      } else {
        stopLoop();
      }
    },
    { threshold: 0.05 }
  );
  labObs.observe(labSec);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopLoop();
    else startLoop();
  });

  const onReducedChange = () => {
    if (mqReduced.matches) {
      stopLoop();
      syncVisuals();
    } else {
      startLoop();
    }
  };
  if (mqReduced.addEventListener) mqReduced.addEventListener("change", onReducedChange);
  else if (mqReduced.addListener) mqReduced.addListener(onReducedChange);

  // Kick off live UKHSA sync without blocking paint, and poll gently every 5 min while visible
  refreshUKHSA();
  const pollId = setInterval(() => {
    if (!document.hidden && isVisible) refreshUKHSA();
  }, 300000);
  window.addEventListener("pagehide", () => {
    stopLoop();
    clearInterval(pollId);
  });
})();
