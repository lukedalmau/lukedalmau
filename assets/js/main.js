// Language Toggle
document.addEventListener('DOMContentLoaded', () => {
  // Check saved language
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

// Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('siteTheme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('siteTheme', newTheme);
    });
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

// Counter Animation
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        counter.innerText = target + '+';
        observer.unobserve(counter);
      }
    });
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