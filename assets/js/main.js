// Language Toggle
document.addEventListener('DOMContentLoaded', () => {
  // Check saved language from localStorage
  const savedLang = localStorage.getItem('siteLang') || 'es';
  document.documentElement.setAttribute('data-lang', savedLang);
  
  // Update language badge
  const langBtns = document.querySelectorAll('.language-badge');
  langBtns.forEach(btn => btn.classList.remove('active'));
  if (savedLang === 'es') {
    document.getElementById('esBadge').classList.add('active');
  } else {
    document.getElementById('enBadge').classList.add('active');
  }
  
  // Language toggle
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-lang');
      const newLang = current === 'es' ? 'en' : 'es';
      document.documentElement.setAttribute('data-lang', newLang);
      localStorage.setItem('siteLang', newLang);
      
      langBtns.forEach(btn => btn.classList.remove('active'));
      document.getElementById(newLang + 'Badge').classList.add('active');
    });
  }
});

// Theme Toggle with prefers-color-scheme support
document.addEventListener('DOMContentLoaded', () => {
  // Check saved theme and prefers-color-scheme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('siteTheme');
  const theme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
  
  document.body.setAttribute('data-theme', theme);
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('siteTheme', newTheme);
    });
  }
  
  // Update sun/moon icons based on theme
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');
  
  if (moonIcon && sunIcon) {
    if (theme === 'dark') {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  }
});

// Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// Counter Animation with Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-number');
  
  // Check for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        
        if (!prefersReducedMotion) {
          // Animate counter
          counter.innerText = '0';
          let current = 0;
          const increment = target / 50;
          const duration = 2000;
          const stepTime = duration / 50;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.innerText = target + '+';
              clearInterval(timer);
            } else {
              counter.innerText = Math.floor(current) + '+';
            }
          }, stepTime);
        } else {
          counter.innerText = target + '+';
        }
        
        observer.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  });
  
  counters.forEach(el => observer.observe(el));
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-trigger');
  const mobileMenu = document.getElementById('mobileMenu');
  const body = document.body;
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.style.right = '0';
      body.style.overflow = 'hidden';
    });
    
    // Close on esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.style.right !== '-100%') {
        mobileMenu.style.right = '-100%';
        body.style.overflow = '';
      }
    });
    
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.right = '-100%';
        body.style.overflow = '';
      });
    });
  }
});

// CV Download Handler
document.addEventListener('DOMContentLoaded', () => {
  const cvLinks = document.querySelectorAll('.btn-download');
  
  cvLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const downloadName = this.getAttribute('download');
      
      // Check if it's a PDF or TXT
      const isPDF = href.endsWith('.pdf') || this.classList.contains('type-pdf');
      
      if (isPDF) {
        // For PDF, just let the browser handle it
        if (window.navigator.msSaveOrOpenBlob) {
          // IE/Edge fallback
          e.preventDefault();
          fetch(href).then(response => response.blob()).then(blob => {
            window.navigator.msSaveOrOpenBlob(blob, downloadName);
          });
        }
      } else {
        // For TXT, we could convert or just download
        // If PDF not available, fall back to TXT
        if (!href.endsWith('.pdf')) {
          // Show message or redirect to TXT version
          console.log('Downloading TXT version:', downloadName);
        }
      }
    });
  });
});

// Initialize tooltips or popovers if needed
document.addEventListener('DOMContentLoaded', () => {
  // Example: Add ARIA label to language buttons if missing
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    if (!btn.getAttribute('aria-label')) {
      btn.setAttribute('aria-label', 'Toggle language');
    }
  });
  
  // Add ARIA label to theme button if missing
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn && !themeBtn.getAttribute('aria-label')) {
    themeBtn.setAttribute('aria-label', 'Toggle theme');
  }
});
