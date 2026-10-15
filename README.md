# lukeportfolio

Personal GitHub Pages Portfolio for Luis Enrique Dalmau Coopat

## Description

Bilingual (English/Spanish) personal portfolio website built with HTML/CSS/JS. Features:

- ✅ Modern, clean design with smooth animations
- ✅ Fully responsive (mobile-first)
- ✅ Language toggle (ES/EN) with localStorage persistence
- ✅ Dark/light theme toggle with localStorage persistence and `prefers-color-scheme` support
- ✅ Downloadable CV (PDF + TXT formats)
- ✅ About section with timeline experience
- ✅ Skills section with progress bars and skill percentages
- ✅ Projects grid (populate with your projects)
- ✅ Contact section with social links
- ✅ Accessible (keyboard nav, ARIA labels, focus-visible states, skip link)
- ✅ Intersection Observer for scroll animations
- ✅ `prefers-reduced-motion` support - all animations gracefully disable
- ✅ `color-scheme: light dark` on `<html>`
- ✅ Ripple effect on CV download button
- ✅ Skip link for keyboard navigation

## Files Structure

```
/ (root)
├── index.html          ← Main HTML file (bilingual, accessible, responsive)
├── assets/
│   ├── css/
│   │   └── main.css    ← Core styles with themes, animations, reduced motion
│   ├── js/
│   │   └── main.js     ← Interactivity, toggles, Observers, CV handler
│   └── cv/
│       ├── Luis_Dalmau_CV.pdf   ← Generated CV (5 pages, formatted)
│       └── Luis_Dalmau_CV.txt   ← Original CV content (TXT format)
├── CNAME               ← Optional: custom domain
└── README.md           ← This file
```

## GitHub Pages Deployment

### Option A: User/Organization Site (recommended)

1. Create a new repo: `lukedalmau.github.io` (owned by your GitHub account)
2. Push these files to the `main` branch
3. Go to **Settings → Pages**
4. Source: `main` branch / ` / (root)`
5. Site goes live at `https://lukedalmau.github.io`

### Option B: Project Site

1. Create any repo, e.g., `portfolio`
2. Push these files to the `main` branch
3. Go to **Settings → Pages**
4. Source: `main` branch / ` / (root)`
5. Site goes live at `https://lukedalmau/portfolio`

### Option C: Existing repo (your current setup)

Your repo `git@github.com:lukedalmau/lukedalmau.git` is already set up. To enable Pages:

1. Go to: `https://github.com/LukeDalmau/lukedalmau`
2. Settings → Pages
3. Source: `main` branch / ` / (root)`
4. Your site will be at `https://lukedalmau.github.io` (GitHub treats `lukedalmau` as a profile repo)

## Customization

### 1. Add/Update Your Projects

Edit `index.html` and find the `.projects-grid` section. Add project cards:

```html
<div class="project-card">
  <h3>Your Project Name</h3>
  <p>Project description with technologies used.</p>
</div>
```

Control the stagger animation with these classes:
- `.card-enter-1` through `.card-enter-5` for delay

### 2. Replace/Update CV

- Replace `assets/cv/Luis_Dalmau_CV.txt` with your updated version (TXT format)
- The PDF `Luis_Dalmau_CV.pdf` is already generated from your enhanced CV
- Download button automatically detects file type and serves correct format
- To regenerate PDF: run the Python script in `assets/cv/`

### 3. Change Colors/Themes

Edit `assets/css/main.css` - the site uses CSS custom properties for easy theming:

```css
:root {
  --primary-dark: #your-dark-color;
  --primary-light: #your-light-color;
  --accent-cyan: #your-accent-color;
  --accent-teal: #your-teal-alt;
}

/* Light mode overrides */
[data-theme="light"] {
  --bg-color: #your-bg;
  --text-color: your-text;
}
```

### 4. Update Contact Info

Edit `index.html` - change the social links, email, phone in the `.contact-item` sections.

### 5. Add More Skills

Edit `assets/css/main.css` - add skill bar entries with `skill-percent` widths:

```html
<div class="skill-bar"><span>Your Skill <span class="skill-percent">90%</span></span></div>
```

### 6. Add Google Analytics (optional)

Add at the top of `index.html` inside `<head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome (latest) | ✅ Full support |
| Firefox (latest) | ✅ Full support |
| Safari (latest) | ✅ Full support |
| Edge (latest) | ✅ Full support |
| iOS Safari | ✅ Full support |
| Android Chrome | ✅ Full support |

## Lighthouse Scores (Expected)

- **Performance**: 92-98
- **Accessibility**: 100/100
- **Best Practices**: 100/100
- **SEO**: 95-100

## License

MIT - Free to use and modify for personal projects.

---

**Generated**: 2024 - Luis Enrique Dalmau Coopat
**Contact**: lukedalmau@gmail.com
**GitHub**: @LukeDalmau
**Portfolio**: https://lukedalmau.github.io (after deployment)
