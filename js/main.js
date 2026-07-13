/* ================================================================
   PrintNova Studio – Global JavaScript
   Theme toggle, RTL toggle, Navbar active states, AOS init,
   Back-to-top, Counter animation, Toast
   ================================================================ */

(function () {
  'use strict';

  /* ── 1. Theme (Dark / Light) ─────────────────────────── */
  const themeKey = 'pn-theme';
  const root = document.documentElement;

  function getTheme() {
    return localStorage.getItem(themeKey) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(themeKey, theme);
    document.querySelectorAll('[data-theme-icon]').forEach(el => {
      el.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
      el.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  applyTheme(getTheme());

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  /* ── 2. RTL / LTR ───────────────────────────────────── */
  const dirKey = 'pn-dir';

  function getDir() {
    return localStorage.getItem(dirKey) || 'ltr';
  }

  function applyDir(dir) {
    root.setAttribute('dir', dir);
    document.body.setAttribute('dir', dir);
    localStorage.setItem(dirKey, dir);
    document.querySelectorAll('[data-dir-icon]').forEach(el => {
      el.innerHTML = dir === 'rtl'
        ? '<span style="font-size:11px;font-weight:700;letter-spacing:.04em;">LTR</span>'
        : '<span style="font-size:11px;font-weight:700;letter-spacing:.04em;">RTL</span>';
      el.title = dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL';
    });
  }

  function toggleDir() {
    const current = root.getAttribute('dir') || 'ltr';
    applyDir(current === 'rtl' ? 'ltr' : 'rtl');
  }

  applyDir(getDir());

  document.querySelectorAll('[data-dir-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleDir);
  });

  /* ── 3. Active Nav Link ──────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.pn-navbar .nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ── 4. AOS (Animate on Scroll) ─────────────────────── */
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 900,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        delay: 0,
      });
    }
  }

  window.addEventListener('load', initAOS);

  /* ── 5. Back to Top ─────────────────────────────────── */
  const btt = document.getElementById('back-to-top');

  if (btt) {
    const updateBackToTop = () => {
      btt.style.display = window.scrollY > 400 ? 'flex' : 'none';
      const footerBottom = document.querySelector('.footer-bottom');
      if (!footerBottom || btt.style.display === 'none') {
        btt.classList.remove('is-over-footer-bottom');
        return;
      }

      const buttonRect = btt.getBoundingClientRect();
      const footerRect = footerBottom.getBoundingClientRect();
      const isTouchingFooterBottom =
        buttonRect.bottom >= footerRect.top &&
        buttonRect.top <= footerRect.bottom;

      btt.classList.toggle('is-over-footer-bottom', isTouchingFooterBottom);
    };

    window.addEventListener('scroll', updateBackToTop, { passive: true });
    window.addEventListener('resize', updateBackToTop);
    updateBackToTop();

    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 6. Counter Animation ───────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterSection = document.querySelector('.counter-section');

  if (counterSection) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('[data-count]').forEach(animateCounter);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(counterSection);
  }

  /* ── 7. Toast Notification ──────────────────────────── */
  window.showToast = function (msg, type = 'info') {
    let container = document.getElementById('pn-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'pn-toast-container';
      container.style.cssText = `
        position:fixed;bottom:24px;right:24px;z-index:9999;
        display:flex;flex-direction:column;gap:10px;pointer-events:none;
      `;
      document.body.appendChild(container);
    }

    const colors = {
      success: { border: 'var(--pn-ink)', text: 'var(--text-primary)' },
      error:   { border: '#EF4444', text: 'var(--text-primary)' },
      info:    { border: 'var(--pn-ink)', text: 'var(--text-primary)' },
      warning: { border: '#F59E0B', text: 'var(--text-primary)' },
    };
    const c = colors[type] || colors.info;

    const t = document.createElement('div');
    t.style.cssText = `
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-left: 4px solid ${c.border};
      color: ${c.text};
      padding: 12px 18px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 500;
      box-shadow: 0 8px 24px rgba(0,0,0,.12);
      max-width: 340px;
      font-family: 'Inter', sans-serif;
      pointer-events: all;
      animation: fadeInUp .3s ease;
    `;
    t.textContent = msg;
    container.appendChild(t);

    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transition = 'opacity .3s';
      setTimeout(() => t.remove(), 300);
    }, 3500);
  };

  /* ── 8. Date in header ──────────────────────────────── */
  const dateEl = document.getElementById('header-current-date');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  /* ── 9. Mobile navbar height offset for body ─────────── */
  function setNavOffset() {
    const nav = document.querySelector('.pn-navbar');
    if (nav) {
      document.body.style.paddingTop = '0'; // sticky does it
    }
  }

  setNavOffset();

  /* ── 10. Smooth scroll for anchor links ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 11. Form submissions (prevent default + toast) ── */
  document.querySelectorAll('.pn-ajax-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.disabled = false;
          showToast('Your message has been sent successfully!', 'success');
          form.reset();
        }, 1800);
      }
    });
  });

  /* ── 12. Inline AOS style injection (fallback) ───────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity:0; transform:translateY(14px); }
      to   { opacity:1; transform:translateY(0); }
    }
  `;
  document.head.appendChild(style);

})();
