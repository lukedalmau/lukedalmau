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
      title: { en: "YOLO-3D — Real-time 3D Object Detection", es: "YOLO-3D — Detección de objetos 3D en tiempo real" },
      desc: {
        en: "Real-time 3D object detection combining YOLOv11 with Depth Anything v2 for pseudo-3D bounding boxes and bird's eye view visualization. Supports video files and webcam input with adjustable model sizes.",
        es: "Detección de objetos 3D en tiempo real que combina YOLOv11 con Depth Anything v2 para bounding boxes pseudo-3D y visualización cenital. Soporta archivos de video y webcam con modelos ajustables."
      },
      tags: ["YOLOv11", "Depth Anything v2", "PyTorch", "OpenCV"],
      links: []
    },
    {
      icon: "ai",
      title: { en: "Image Analyzer — Multimodal AI (BLIP)", es: "Image Analyzer — IA Multimodal (BLIP)" },
      desc: {
        en: "Python package for image analysis using BLIP (Bootstrapped Language-Image Pre-training). Generates image descriptions, extracts keywords, and suggests related terms. CPU and GPU support.",
        es: "Paquete Python para análisis de imágenes usando BLIP. Genera descripciones de imágenes, extrae palabras clave y sugiere términos relacionados. Soporte CPU y GPU."
      },
      tags: ["BLIP", "Python", "Multimodal AI", "Hugging Face"],
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

  /* ---------------- Neural network background ---------------- */
  function initNetBackground() {
    const canvas = document.getElementById("netBg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let nodes = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.max(50, Math.min(130, Math.floor((canvas.width * canvas.height) / 12000)));
      const prev = nodes.length;
      nodes = Array.from({ length: count }, (_, i) => {
        if (i < prev) return nodes[i];
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.6
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const linkDist = 130;
      const cursorDist = 220;

      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < cursorDist && d > 0.001) {
          const f = (1 - d / cursorDist) * 0.08;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }
        n.vx += (Math.random() - 0.5) * 0.04;
        n.vy += (Math.random() - 0.5) * 0.04;
        n.vx *= 0.94;
        n.vy *= 0.94;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            ctx.strokeStyle = "rgba(34,211,238," + (0.13 * (1 - d / linkDist)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const mdx = mouse.x - a.x, mdy = mouse.y - a.y;
        const md = Math.hypot(mdx, mdy);
        if (md < cursorDist) {
          ctx.strokeStyle = "rgba(129,140,248," + (0.4 * (1 - md / cursorDist)).toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(a.x, a.y); ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = "rgba(129,140,248,0.75)";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    function loop() { draw(); raf = requestAnimationFrame(loop); }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener("mouseout", () => { mouse.x = -9999; mouse.y = -9999; });
    window.addEventListener("touchmove", (e) => { if (e.touches[0]) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; } }, { passive: true });
    if (reduce) { draw(); } else { raf = requestAnimationFrame(loop); }
  }

  /* ---------------- Terminal typing effect ---------------- */
  function initTerminal() {
    const body = document.querySelector(".terminal__body");
    const el = document.getElementById("termText");
    if (!el || !body) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINES = [
      "$ whoami",
      "luis-dalmau · Full-Stack AI Engineer (Computer Vision)",
      "$ ls ~/projects",
      "logistics-system   door-defect-yolov9   licit-ai   protectora-rrss",
      "$ python train.py --model yolov9-c --epochs 100 --img 640",
      "Epoch 100/100 · mAP@0.5 0.964 · loss 0.032",
      "$ python deploy.py --platform sorba.ai",
      "✓ model live · IIoT predictive maintenance",
      "$ git log --oneline -3",
      "9b68805 bbox detection sequence",
      "22803f3 neural-net background",
      "d0ac264 terminal + yolo box",
      "$ docker ps --format '{{.Names}}'",
      "vision-restlib   fastapi-api   nextjs-web   postgres",
      "$ curl -s api.sorba.ai/health",
      "status: ok · models: 12 · gpu: A100"
    ];

    if (reduce) { el.textContent = LINES.join("\n"); return; }

    let li = 0, ci = 0, output = "";

    function type() {
      const line = LINES[li];
      ci++;
      el.textContent = output + line.slice(0, ci);
      body.scrollTop = body.scrollHeight;
      if (ci < line.length) {
        setTimeout(type, 16);
      } else {
        output += line + "\n";
        li++;
        ci = 0;
        if (li < LINES.length) {
          setTimeout(type, 200);
        } else {
          setTimeout(() => { output = ""; li = 0; ci = 0; el.textContent = ""; type(); }, 4000);
        }
      }
    }

    type();
  }

  /* ---------------- Detection box sequence ---------------- */
  function initDetectionBox() {
    const box = document.querySelector(".det-box");
    if (!box) return;
    const label = box.querySelector(".det-box__label");
    const scan = box.querySelector(".det-box__scan");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SMALL = "calc(50% - 1px)";
    const FULL = "26px 26px 32px 26px";
    const TEXT = "person · 0.98";

    function setSize(inset, radius, animate) {
      box.style.transition = animate ? "" : "none";
      box.style.inset = inset;
      box.style.borderRadius = radius;
      box.style.opacity = inset === FULL ? "1" : "0";
      box.classList.toggle("is-full", inset === FULL);
    }

    function typeLabel() {
      label.style.opacity = "1";
      label.textContent = "";
      let i = 0;
      (function type() {
        label.textContent = TEXT.slice(0, i);
        i++;
        if (i <= TEXT.length) setTimeout(type, 60);
      })();
    }

    function run() {
      if (reduce) {
        setSize(FULL, "8px", true);
        label.textContent = TEXT;
        label.style.opacity = "1";
        return;
      }
      setSize(SMALL, "2px", false);
      label.textContent = "";
      label.style.opacity = "0";
      scan.classList.remove("is-scanning");

      setTimeout(() => setSize(FULL, "8px", true), 900);
      setTimeout(() => scan.classList.add("is-scanning"), 1800);
      setTimeout(typeLabel, 4100);
      setTimeout(run, 5600);
    }

    run();
  }

  /* ---------------- Init ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(detectTheme());
    applyLang(detectLang());
    observeReveals($$(".reveal"));
    initCounters();
    initMenu();
    initScrollSpy();
    initNetBackground();
    initTerminal();
    initDetectionBox();
  });
})();
