/* Luis Dalmau — Portfolio */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------------- i18n ---------------- */
  const I18N_KEY = "ld_lang";
  const THEME_KEY = "ld_theme";

  const translations = ["en", "es"];

  function detectLang() {
    const saved = localStorage.getItem(I18N_KEY);
    if (translations.includes(saved)) return saved;
    return (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    $$("[data-en]").forEach((el) => {
      const val = el.getAttribute("data-" + lang);
      if (val !== null) el.innerHTML = val;
    });
    $$("[data-setlang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.setlang === lang));
    });
    localStorage.setItem(I18N_KEY, lang);

    const cvBtn = $("#cvBtn");
    if (cvBtn) {
      const es = lang === "es";
      cvBtn.setAttribute("href", es ? "assets/cv/Luis_Dalmau_CV_ES.pdf" : "assets/cv/Luis_Dalmau_CV.pdf");
      cvBtn.setAttribute("download", es ? "Luis_Dalmau_CV_ES.pdf" : "Luis_Dalmau_CV.pdf");
    }

    renderProjects(lang);
  }

  $$("[data-setlang]").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.setlang));
  });

  /* ---------------- Theme ---------------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function detectTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  $("#themeBtn").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  /* ---------------- Projects ---------------- */
  const ICONS = {
    ai: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3v0a3 3 0 0 0 3-3v0a3 3 0 0 0-3-3z"/><circle cx="12" cy="14" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>',
    web: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12"/></svg>',
    data: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>'
  };

  const PROJECTS = [
    {
      icon: "ai",
      title: { en: "Computer Vision Library (proprietary)", es: "Librería de Visión por Computadora (propietaria)" },
      desc: {
        en: "Proprietary Python computer-vision library (author): YOLOv9 training & inference, dataset management (YOLO/COCO/VOC), auto-labeling with GroundingDINO & Florence-2, synthetic data with Stable Diffusion, and a GPU/VRAM scheduler.",
        es: "Librería propietaria de visión por computadora en Python (autor): entrenamiento e inferencia YOLOv9, gestión de datasets (YOLO/COCO/VOC), auto-etiquetado con GroundingDINO y Florence-2, datos sintéticos con Stable Diffusion y un planificador de GPU/VRAM."
      },
      tags: ["Python", "PyTorch", "YOLOv9", "Docker"],
      links: []
    },
    {
      icon: "web",
      title: { en: "Logistics Management System", es: "Sistema de Gestión Logística" },
      desc: {
        en: "Full-stack logistics platform: FastAPI + SQLAlchemy + PostgreSQL backend with JWT auth and RBAC (3 roles), commission/report/invoice generation, plus a Next.js 14 + React + TypeScript frontend.",
        es: "Plataforma logística full-stack: backend FastAPI + SQLAlchemy + PostgreSQL con autenticación JWT y RBAC (3 roles), generación de comisiones/reportes/facturas, y frontend Next.js 14 + React + TypeScript."
      },
      tags: ["FastAPI", "Next.js", "React", "PostgreSQL", "AWS S3"],
      links: []
    },
    {
      icon: "ai",
      title: { en: "Door Defect Detection · YOLOv9", es: "Detección de defectos en puertas · YOLOv9" },
      desc: {
        en: "Industrial defect detection on doors — 539 annotated images, 4 classes (dent/scratch major/minor), Roboflow preprocessing and augmentation, trained with a custom YOLOv9 pipeline.",
        es: "Detección industrial de defectos en puertas — 539 imágenes anotadas, 4 clases (abolladura/rayón mayor/menor), preprocesado y aumentación con Roboflow, entrenada con un pipeline YOLOv9 personalizado."
      },
      tags: ["YOLOv9", "Roboflow", "OpenCV"],
      links: []
    },
    {
      icon: "web",
      title: { en: "LicitAI", es: "LicitAI" },
      desc: {
        en: "Full-stack tender analysis platform: FastAPI + React + MongoDB, Google Gemini (LLM) document analysis, Stripe payments, and Selenium-based data extraction.",
        es: "Plataforma full-stack de análisis de licitaciones: FastAPI + React + MongoDB, análisis de documentos con Google Gemini (LLM), pagos con Stripe y extracción de datos con Selenium."
      },
      tags: ["FastAPI", "React", "MongoDB", "Gemini", "Stripe"],
      links: []
    },
    {
      icon: "web",
      title: { en: "Protectora RRSS", es: "Protectora RRSS" },
      desc: {
        en: "Pet-adoption diffusion system for Facebook/Twitter: FastAPI + PostgreSQL backend, React frontend, Telegram bot, SMTP delivery, and automatic Word/.docx data import.",
        es: "Sistema de difusión de adopción de mascotas para Facebook/Twitter: backend FastAPI + PostgreSQL, frontend React, bot de Telegram, envío SMTP e importación automática desde Word/.docx."
      },
      tags: ["FastAPI", "React", "PostgreSQL", "Telegram"],
      links: []
    },
    {
      icon: "data",
      title: { en: "Cuban Sign Language · Thesis", es: "Lengua de Señas Cubana · Tesis" },
      desc: {
        en: "Thesis project: graphic generation of Cuban Sign Language signs using Python and computer graphics.",
        es: "Proyecto de tesis: generación gráfica de señas de la Lengua de Señas Cubana usando Python y gráficos por computadora."
      },
      tags: ["Python", "Computer Graphics"],
      links: []
    },
    {
      icon: "data",
      title: { en: "Olympic Swimming Predictions", es: "Predicciones de Natación Olímpica" },
      desc: {
        en: "Data-science project predicting Olympic swimming outcomes from simulations, published alongside other Tokyo 2020 work on postdata.club.",
        es: "Proyecto de ciencia de datos que predice resultados de natación olímpica a partir de simulaciones, publicado junto a otros trabajos de Tokio 2020 en postdata.club."
      },
      tags: ["Python", "Pandas", "Data Science"],
      links: [{ label: "postdata.club", href: "https://www.postdata.club" }]
    }
  ];

  function renderProjects(lang) {
    const grid = $("#projectsGrid");
    if (!grid) return;
    grid.innerHTML = PROJECTS.map((p) => {
      const links = p.links.length
        ? p.links
            .map(
              (l) =>
                `<a class="project-card__link" href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`
            )
            .join("")
        : "";
      return `
        <article class="project-card reveal">
          <div class="project-card__icon">${ICONS[p.icon]}</div>
          <h3>${p.title[lang]}</h3>
          <p>${p.desc[lang]}</p>
          <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
          ${links ? `<div class="project-card__links">${links}</div>` : ""}
        </article>`;
    }).join("");
    observeReveals($$(".project-card"));
  }

  /* ---------------- Reveal on scroll ---------------- */
  let revealObserver;
  function observeReveals(els) {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              revealObserver.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }
    els.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------- Animated counters ---------------- */
  function initCounters() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nums = $$(".stat__num");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || "";
          if (reduce) {
            el.textContent = target.toLocaleString() + suffix;
          } else {
            const duration = 1400;
            const start = performance.now();
            const step = (now) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              el.textContent = Math.round(target * eased).toLocaleString() + suffix;
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    nums.forEach((n) => observer.observe(n));
  }

  /* ---------------- Mobile menu ---------------- */
  function initMenu() {
    const burger = $("#burger");
    const links = $(".nav__links");
    if (!burger || !links) return;
    const toggle = (open) => {
      links.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    burger.addEventListener("click", () => toggle(!links.classList.contains("open")));
    $$(".nav__link", links).forEach((a) => a.addEventListener("click", () => toggle(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") toggle(false);
    });
  }

  /* ---------------- Active nav link ---------------- */
  function initScrollSpy() {
    const sections = $$("main section[id]");
    const navLinks = $$(".nav__link");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }

  /* ---------------- Init ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(detectTheme());
    applyLang(detectLang());
    observeReveals($$(".reveal"));
    initCounters();
    initMenu();
    initScrollSpy();
  });
})();
