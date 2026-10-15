# lukeportfolio

Personal GitHub Pages Portfolio for Luis Enrique Dalmau Coopat

## Description

Bilingual (English/Spanish) personal portfolio website built with HTML/CSS/JS. Features:

- ✅ Modern, clean design with smooth animations
- ✅ Fully responsive (mobile-first)
- ✅ Language toggle (ES/EN) with localStorage persistence
- ✅ Dark/light theme toggle with localStorage persistence
- ✅ Downloadable CV (Luis_Dalmau_CV.txt - convert to PDF optional)
- ✅ About section with timeline experience
- ✅ Skills section with progress bars
- ✅ Projects grid (populate with your projects)
- ✅ Contact section with social links
- ✅ Accessible (keyboard nav, ARIA labels, focus states)
- ✅ Intersection Observer for scroll animations
- ✅ Reduced motion support

## Files Structure

```
/ (root)
├── index.html          ← Main HTML file
├── assets/
│   ├── css/
│   │   ├── main.css           ← Core styles
│   │   ├── animations.css     ← Animation keyframes
│   │   └── themes.css         ← Light/dark theme vars
│   ├── js/
│   │   └── main.js            ← Interactivity & toggles
│   └── cv/
│       └── Luis_Dalmau_CV.txt ← Your enhanced CV (TXT format)
├── CNAME               ← Optional: custom domain
└── README.md           ← This file
```

## GitHub Pages Deployment

### Option A: User/Organization Site (username.github.io)

1. Create a new repo: `lukedalmau.github.io`
2. Push these files to main branch
3. Go to Settings → Pages → Source: `main` branch `/ (root)`
4. Site goes live at `https://lukedalmau.github.io`

### Option B: Project Site (github.com/username/repo)

1. Create any repo, e.g., `portfolio`
2. Push these files to main branch
3. Go to Settings → Pages → Source: `main` branch `/ (root)`
4. Site goes live at `https://lukedalmau/portfolio`

## Customization

### Add Your Projects

Edit `index.html` and find the `.projects-grid` section. Add project cards:

```html
<div class="project-card">
  <h3>Your Project Name</h3>
  <p>Project description with technologies used.</p>
</div>
```

### Update CV

Replace `assets/cv/Luis_Dalmau_CV.txt` with your updated CV. For PDF, convert the TXT or add `Luis_Dalmau_CV.pdf` alongside.

### Change Colors/Themes

Edit `assets/css/themes.css` to modify color variables. The site uses CSS custom properties for easy theming.

### Add More Skills

Edit `assets/css/main.css` and `assets/js/main.js` to add skill progress bars or categories.

## Credits

- Font: [Inter](https://fonts.google.com/inter) (via Google Fonts)
- Icons: [Font Awesome](https://fontawesome.com/)
- Inspired by modern portfolio designs with smooth animations

## License

MIT - Free to use and modify for personal projects.