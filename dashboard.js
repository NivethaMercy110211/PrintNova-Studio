/* ============================================================
   PrintNova Studio – Dashboard JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Sidebar Toggle ─────────────────────────────────────── */
  const sidebar = document.getElementById('pn-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const toggleBtn = document.getElementById('sidebar-toggle');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  /* Close sidebar on resize to desktop */
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) closeSidebar();
  });

  /* ── Active Nav Link ─────────────────────────────────────── */
  const navLinks = document.querySelectorAll('#pn-sidebar .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      if (window.innerWidth < 992) closeSidebar();
    });
  });

  /* ── Drag-and-Drop Upload Zone ──────────────────────────── */
  const zone = document.getElementById('upload-zone');
  const fileInput = document.getElementById('file-input');

  if (zone) {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));

    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      handleFiles(e.dataTransfer.files);
    });

    zone.addEventListener('click', () => fileInput && fileInput.click());
  }

  if (fileInput) {
    fileInput.addEventListener('change', () => handleFiles(fileInput.files));
  }

  function handleFiles(files) {
    if (!files || !files.length) return;
    const names = Array.from(files).map(f => f.name).join(', ');
    showToast(`📎 File(s) ready: ${names}`, 'success');
  }

  /* ── Toast Notification ─────────────────────────────────── */
  function showToast(msg, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position:fixed; bottom:24px; right:24px; z-index:9999;
        display:flex; flex-direction:column; gap:10px;
      `;
      document.body.appendChild(container);
    }

    const colors = {
      success: { border: 'var(--pn-ink)', text: 'var(--text-primary)' },
      error: { border: '#EF4444', text: 'var(--text-primary)' },
      info: { border: 'var(--pn-ink)', text: 'var(--text-primary)' },
    };
    const c = colors[type] || colors.info;

    const toast = document.createElement('div');
    toast.style.cssText = `
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-left: 4px solid ${c.border};
      color: ${c.text};
      padding: 12px 18px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 8px 24px rgba(15,23,42,.12);
      max-width: 340px;
      font-family: 'Inter', sans-serif;
      animation: fadeInUp .3s ease;
    `;
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOutDown .3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ── Charts (Chart.js) ──────────────────────────────────── */
  function initCharts() {
    /* Monthly Print Jobs – Bar Chart */
    const barCtx = document.getElementById('chart-bar');
    if (barCtx) {
      new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Print Jobs',
              data: [28, 35, 42, 38, 55, 49, 63],
              backgroundColor: 'rgba(79,70,229,.85)',
              borderRadius: 7,
              borderSkipped: false,
            },
            {
              label: 'Completed',
              data: [22, 30, 38, 34, 50, 43, 57],
              backgroundColor: 'rgba(6,182,212,.65)',
              borderRadius: 7,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                font: { family: 'Inter', size: 12 },
                boxWidth: 12,
                boxHeight: 12,
                borderRadius: 4,
                useBorderRadius: true,
              },
            },
            tooltip: {
              titleFont: { family: 'Inter', size: 13, weight: '600' },
              bodyFont: { family: 'Inter', size: 12 },
              cornerRadius: 8,
              padding: 10,
            },
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: { font: { family: 'Inter', size: 11.5 }, color: '#94A3B8' },
            },
            y: {
              grid: { color: '#F1F5F9' },
              border: { display: false, dash: [4, 4] },
              ticks: { font: { family: 'Inter', size: 11.5 }, color: '#94A3B8' },
            },
          },
        },
      });
    }

    /* Product Type Distribution – Doughnut */
    const donutCtx = document.getElementById('chart-donut');
    if (donutCtx) {
      new Chart(donutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Brochures', 'Business Cards', 'Banners', 'Flyers', 'Others'],
          datasets: [{
            data: [32, 24, 18, 16, 10],
            backgroundColor: ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'],
            borderWidth: 0,
            hoverOffset: 8,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '72%',
          plugins: {
            legend: {
              position: 'right',
              labels: {
                font: { family: 'Inter', size: 12 },
                boxWidth: 12,
                boxHeight: 12,
                borderRadius: 4,
                useBorderRadius: true,
                padding: 12,
              },
            },
            tooltip: {
              titleFont: { family: 'Inter', size: 13, weight: '600' },
              bodyFont: { family: 'Inter', size: 12 },
              cornerRadius: 8,
              padding: 10,
            },
          },
        },
      });
    }
  }

  /* Wait for Chart.js to load */
  if (window.Chart) {
    initCharts();
  } else {
    window.addEventListener('load', initCharts);
  }

  /* ── Profile Dropdown ───────────────────────────────────── */
  const profileBtn = document.getElementById('profile-btn');
  const profileMenu = document.getElementById('profile-menu');

  if (profileBtn && profileMenu) {
    profileBtn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = profileMenu.style.display === 'block';
      profileMenu.style.display = isOpen ? 'none' : 'block';
    });

    document.addEventListener('click', () => {
      if (profileMenu) profileMenu.style.display = 'none';
    });
  }

  /* ── Reorder buttons ────────────────────────────────────── */
  document.querySelectorAll('.btn-reorder').forEach(btn => {
    btn.addEventListener('click', function () {
      const name = this.closest('.reorder-item')?.querySelector('.reorder-name')?.textContent || 'item';
      showToast(`✅ Reorder placed for: ${name}`, 'success');
    });
  });

  /* ── Invoice Download buttons ───────────────────────────── */
  document.querySelectorAll('.btn-dl').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = this.closest('.invoice-row')?.querySelector('.invoice-id')?.textContent || 'Invoice';
      showToast(`📄 Downloading ${id}…`, 'info');
    });
  });

  /* ── Animate stat counters ──────────────────────────────── */
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (current >= target) clearInterval(timer);
      }, 30);
    });
  }

  /* Intersection Observer for counter animation */
  const statSection = document.getElementById('stat-cards');
  if (statSection) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(statSection);
  }

  /* ── Add fadeOutDown keyframe ───────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOutDown {
      to { opacity:0; transform:translateY(8px); }
    }
  `;
  document.head.appendChild(style);

  /* ── Current Date/Time in header ───────────────────────── */
  const dateBadge = document.getElementById('header-date');
  if (dateBadge) {
    const now = new Date();
    dateBadge.textContent = now.toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
  }

})();
