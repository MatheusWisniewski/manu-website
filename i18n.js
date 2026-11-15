/* Simple i18n: English lives in the HTML (source of truth), Portuguese (pt-BR) below.
 * - data-i18n="key"                 -> innerHTML is swapped
 * - data-i18n-attr="attr:key;a2:k2" -> attributes are swapped (alt, aria-label, content…)
 * Language priority: ?lang=pt|en  >  localStorage('lang')  >  auto (pt browser language or
 * Brazilian timezone)  >  en
 * Loaded synchronously at the end of <body>, before main.js, so text is swapped before the
 * reveal animations run and (in practice) before first paint.
 * Fires window "langchange" (detail: { lang }) after every switch.
 */
(() => {
  const PT = {
    "meta.title": "Emanuelle Wisniewski | Enfermeira · Prevenção e Controle de Infecção",
    "meta.description": "Emanuelle Wisniewski – Enfermeira formada no Brasil, morando em Londres, com experiência em pediatria e prevenção e controle de infecção. Mestranda em Controle de Doenças Infecciosas na LSHTM.",
    "meta.ogTitle": "Emanuelle Wisniewski – Enfermeira, Londres",
    "meta.ogDescription": "Pediatria · Prevenção e controle de infecção · Saúde pública",

    "nav.menu": "Menu de navegação",
    "nav.about": "Sobre",
    "nav.expertise": "Competências",
    "nav.experience": "Experiência",
    "nav.education": "Formação",
    "nav.contact": "Contato",

    "hero.pill": '<span class="dot"></span> Enfermeira · Morando em Londres',
    "hero.title": 'Cuidado humanizado, <br /><span class="grad">baseado em ciência.</span>',
    "hero.lead": "Sou a Emanuelle, enfermeira formada no Brasil e hoje em Londres, com experiência em <strong>pediatria</strong> e <strong>prevenção e controle de infecção</strong>.",
    "hero.cta": 'Conheça minha trajetória <span class="arrow">→</span>',
    "hero.photoAlt": "Emanuelle Wisniewski de pijama cirúrgico azul-marinho, sorrindo",
    "hero.fc1.title": "Pediatria",
    "hero.fc1.sub": "Do neonato aos 12 anos",
    "hero.fc2.title": "CCIH",
    "hero.fc2.sub": "Vigilância de IRAS",
    "hero.fc3.sub": "Doenças infecciosas",
    "hero.scroll": "Rolar para baixo",

    "marquee.safety": "Segurança do paciente",
    "marquee.paeds": "Enfermagem pediátrica",
    "marquee.ipc": "Prevenção de infecções",
    "marquee.ams": "Gerenciamento de antimicrobianos",
    "marquee.surv": "Vigilância em saúde",
    "marquee.lead": "Liderança de equipes",

    "about.kicker": "01 — Sobre mim",
    "about.title": "Da pediatria ao controle de infecção.",
    "about.p1": "Sou formada em Enfermagem pelas <strong>Faculdades Pequeno Príncipe</strong>, em Curitiba, e cuidei de crianças de todas as idades no <strong>Hospital Pequeno Príncipe</strong>, o maior complexo hospitalar pediátrico da América Latina.",
    "about.p2": "Na área de controle de infecção, liderei a vigilância ativa de infecções relacionadas à assistência à saúde (IRAS), apoiei a implantação de protocolos de prevenção e conduzi capacitações baseadas em evidências para equipes multiprofissionais.",
    "about.p3": "Depois que me mudei para Londres, trabalhei por dois anos em uma organização internacional, o que aprimorou minha comunicação, capacidade de adaptação e inglês profissional. Atualmente, estou concluindo o <strong>mestrado (MSc) em Controle de Doenças Infecciosas</strong> na London School of Hygiene &amp; Tropical Medicine (previsão de conclusão: março de 2027).",
    "about.stat.yrs": " anos",
    "about.stat1": "Leitos pediátricos gerenciados",
    "about.stat2": "Estágio em Pronto-Socorro Pediátrico",
    "about.stat3": "Hospitais em que atuei em Curitiba",
    "about.stat4": "Idiomas: português e inglês",

    "expertise.kicker": "02 — Competências",
    "expertise.title": "O que levo para a beira do leito.",
    "expertise.c1.title": "Assistência direta ao paciente",
    "expertise.c1.text": "Cuidado integral do neonato ao adolescente, incluindo assistência pré e pós-operatória, aferição de sinais vitais, balanço hídrico e identificação precoce de deterioração clínica.",
    "expertise.c2.title": "Prevenção de infecções",
    "expertise.c2.text": "Vigilância de IRAS, auditorias de adesão às práticas de controle, gerenciamento de antimicrobianos e microbiologia clínica aplicada para proteger pacientes e equipes.",
    "expertise.c3.title": "Saúde pública e dados",
    "expertise.c3.text": "Vigilância epidemiológica, rastreamento de contatos de COVID-19 e gestão de dados em saúde (Stata, SINAN, e-SUS).",
    "expertise.c4.title": "Trabalho em equipe e educação",
    "expertise.c4.text": "Supervisão e capacitação de técnicos de enfermagem, educação permanente de equipes e comunicação clara com pessoas de diferentes perfis e culturas.",

    "experience.kicker": "03 — Experiência",
    "experience.title": "Minha trajetória na saúde.",

    "exp.j1.date": "ago 2023 – jul 2025",
    "exp.j1.role": "Coordenadora de Serviços ao Estudante",
    "exp.j1.org": "EC English Language Centres · Londres",
    "exp.j1.text": "Planejei e conduzi eventos sociais e culturais para estudantes internacionais a partir de 16 anos, ajudando a construir uma comunidade acolhedora e multicultural.",

    "exp.j2.date": "set 2022 – fev 2023",
    "exp.j2.role": "Enfermeira de Prevenção e Controle de Infecção (CCIH)",
    "exp.j2.org": "Grupo Marista: Hospital Cajuru e Hospital Marcelino Champagnat · Curitiba",
    "exp.j2.b1": "Liderei programas de vigilância ativa de infecções relacionadas à assistência à saúde (IRAS)",
    "exp.j2.b2": "Realizei auditorias por observação direta da adesão às medidas de controle de infecção",
    "exp.j2.b3": "Apoiei o gerenciamento de antimicrobianos e participei das visitas multiprofissionais na UTI",
    "exp.j2.b4": "Elaborei e ministrei treinamentos para as equipes sobre boas práticas de prevenção e controle de infecção",

    "exp.j3.date": "mai 2022 – jul 2022",
    "exp.j3.role": "Enfermeira Assistencial, Pediatria",
    "exp.j3.b1": "Gerenciei uma unidade pediátrica de 20 leitos, supervisionando e capacitando técnicos de enfermagem",
    "exp.j3.b2": "Liderei a implantação do processo de enfermagem com base na NANDA-I",
    "exp.j3.b3": "Administrei terapias intravenosas complexas e realizei punção venosa e coleta de amostras",
    "exp.j3.b4": "Prestei suporte à Maternidade e ao Centro Obstétrico nos plantões de fim de semana",

    "exp.j4.date": "abr 2021 – nov 2021",
    "exp.j4.role": "Acadêmica Voluntária, Vigilância em Saúde (COVID-19)",
    "exp.j4.text": "Realizei rastreamento remoto de contatos e monitoramento clínico, coleta de dados epidemiológicos e orientações de saúde pública para a comunidade universitária.",

    "exp.j5.date": "out 2018 – out 2020",
    "exp.j5.role": "Estagiária de Enfermagem, Pronto-Socorro Pediátrico e CCIH",
    "exp.j5.b1": "Auxiliei no atendimento ao trauma, na estabilização e no preparo para reanimação",
    "exp.j5.b2": "Monitorei e registrei sinais vitais e balanço hídrico",
    "exp.j5.b3": "Atuei na vigilância de IRAS e de doenças de notificação compulsória (SINAN, e-SUS)",
    "exp.j5.b4": "Apoiei a vacinação de rotina de pacientes pediátricos internados",

    "exp.j6.date": "out 2014 – out 2016",
    "exp.j6.role": "Jovem Aprendiz – Área Administrativa",
    "exp.j6.text": "Comecei aos 15 anos, durante o ensino médio, atuando na hotelaria hospitalar e na logística de suprimentos. Foi ali que nasceu meu interesse pela área da saúde.",

    "education.kicker": "04 — Formação",
    "education.title": "Sempre aprendendo.",
    "edu.e1.tag": "Previsão: mar 2027",
    "edu.e1.title": "Mestrado (MSc) em Controle de Doenças Infecciosas",
    "edu.e2.title": "Curso de curta duração: Prevenção e Controle de Infecção em Saúde Global",
    "edu.e3.title": "Pós-graduação em Enfermagem em Infectologia",
    "edu.e4.title": "Bacharelado em Enfermagem",
    "edu.e5.title": "Curso profissionalizante em Atendimento Pré-Hospitalar (APH)",
    "edu.e6.title": "Curso de Língua Inglesa",
    "edu.e6.org": "EC English Language Centres, Londres",

    "logo.ec-english-language-centres": "Logotipo da EC English Language Centres",
    "logo.faculdades-pequeno-pr-ncipe": "Logotipo das Faculdades Pequeno Príncipe",
    "logo.grupo-marista": "Logotipo do Grupo Marista",
    "logo.hospital-angelina-caron": "Logotipo do Hospital Angelina Caron",
    "logo.hospital-cajuru": "Logotipo do Hospital Cajuru",
    "logo.hospital-ipo": "Logotipo do Hospital IPO",
    "logo.hospital-marcelino-champagnat": "Logotipo do Hospital Marcelino Champagnat",
    "logo.hospital-pequeno-pr-ncipe": "Logotipo do Hospital Pequeno Príncipe",
    "logo.lshtm": "Logotipo da LSHTM",
    "logo.pickler-team-rescue": "Logotipo da Pickler Team Rescue",
    "logo.ufpr": "Logotipo da UFPR",
    "logo.uniopet": "Logotipo da UniOpet",

    "contact.kicker": "05 — Contato",
    "contact.title": "Vamos conversar.",
    "contact.text": "Será sempre um prazer receber mensagens de colegas e outros profissionais da saúde. Fique à vontade para me enviar um e-mail.",

    "footer.location": "Londres, Reino Unido",
    "footer.top": "Voltar ao topo ↑",
  };

  const LANGS = { en: "en-GB", pt: "pt-BR" };
  const TOGGLE_LABEL = { en: "Ver em português", pt: "View in English" };

  /* ---- Capture English originals from the DOM ---- */
  const textEls = [...document.querySelectorAll("[data-i18n]")].map((el) => ({
    el, key: el.dataset.i18n, en: el.tagName === "TITLE" ? el.textContent : el.innerHTML,
  }));
  const attrEls = [];
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(";").forEach((pair) => {
      const i = pair.indexOf(":");
      if (i < 1) return;
      const attr = pair.slice(0, i).trim(), key = pair.slice(i + 1).trim();
      attrEls.push({ el, attr, key, en: el.getAttribute(attr) });
    });
  });

  const toggle = document.querySelector(".lang-toggle");
  let current = null;

  const apply = (lang) => {
    if (!LANGS[lang]) lang = "en";
    const pt = lang === "pt";
    textEls.forEach(({ el, key, en }) => {
      const v = pt && key in PT ? PT[key] : en;
      if (el.tagName === "TITLE") document.title = v;
      else if (el.innerHTML !== v) el.innerHTML = v;
    });
    attrEls.forEach(({ el, attr, key, en }) => {
      const v = pt && key in PT ? PT[key] : en;
      if (v == null) el.removeAttribute(attr); else el.setAttribute(attr, v);
    });
    document.documentElement.lang = LANGS[lang];

    if (toggle) {
      toggle.setAttribute("aria-label", TOGGLE_LABEL[lang]);
      toggle.title = TOGGLE_LABEL[lang];
      toggle.dataset.active = lang;
      toggle.querySelectorAll("[data-lang]").forEach((s) =>
        s.classList.toggle("active", s.dataset.lang === lang));
    }

    current = lang;
    window.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  };

  const store = (lang) => { try { localStorage.setItem("lang", lang); } catch (_) {} };
  const stored = () => { try { return localStorage.getItem("lang"); } catch (_) { return null; } };

  const detect = () => {
    if (window.__LANG__ === "pt" || window.__LANG__ === "en") return window.__LANG__;
    let fromUrl = null;
    try { fromUrl = (new URLSearchParams(location.search).get("lang") || "").toLowerCase().slice(0, 2); } catch (_) {}
    if (LANGS[fromUrl]) return fromUrl;
    const s = stored();
    if (LANGS[s]) return s;
    return autoDetect();
  };

  /* Auto-detect (no network): primary browser language is Portuguese OR timezone is in Brazil */
  const BR_TIMEZONES = ["America/Sao_Paulo", "America/Bahia", "America/Fortaleza", "America/Recife",
    "America/Maceio", "America/Belem", "America/Araguaina", "America/Santarem", "America/Manaus",
    "America/Cuiaba", "America/Campo_Grande", "America/Porto_Velho", "America/Boa_Vista",
    "America/Rio_Branco", "America/Eirunepe", "America/Noronha"];
  function autoDetect() {
    try {
      const primary = (navigator.languages && navigator.languages[0]) || navigator.language || "";
      if (/^pt/i.test(primary)) return "pt";
    } catch (_) {}
    try {
      if (BR_TIMEZONES.includes(Intl.DateTimeFormat().resolvedOptions().timeZone)) return "pt";
    } catch (_) {}
    return "en";
  }

  apply(detect());
  document.documentElement.classList.remove("i18n-pending");

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = current === "pt" ? "en" : "pt";
      store(next);
      apply(next);
      // keep the URL shareable without reloading
      try {
        const url = new URL(location.href);
        if (url.searchParams.has("lang")) {
          url.searchParams.set("lang", next);
          history.replaceState(null, "", url);
        }
      } catch (_) {}
    });
  }

  window.i18n = { get lang() { return current; }, set: (l) => { store(l); apply(l); } };
})();
