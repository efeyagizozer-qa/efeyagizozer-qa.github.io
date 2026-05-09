/* ============================================================
   PORTFOLIO — Efe Yagiz Ozer
   script.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- Elements ---- */
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const navLinks  = document.querySelectorAll('.nav-link');

  /* ============================================================
     MOBILE MENU — toggle sidebar open / closed
     ============================================================ */
  hamburger.addEventListener('click', function () {
    const isOpen = sidebar.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  /* Close sidebar when a nav link is clicked on mobile */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 720) {
        sidebar.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* Close sidebar when clicking outside of it on mobile */
  document.addEventListener('click', function (e) {
    if (
      window.innerWidth <= 720 &&
      sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      sidebar.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ============================================================
     ACTIVE SECTION HIGHLIGHTING — IntersectionObserver
     ============================================================ */
  const sections = document.querySelectorAll('.section[id]');

  const observerOptions = {
    root: null,
    // Fire when section is ~30% into viewport
    rootMargin: '-10% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });

  function setActiveLink(sectionId) {
    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('data-section') === sectionId;
      link.classList.toggle('active', isActive);
    });
  }

  /* ============================================================
     SMOOTH SCROLL — polite fallback for older browsers
     that may not support CSS scroll-behavior
     ============================================================ */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      // Let CSS scroll-behavior handle it; this just adds offset for
      // mobile fixed header (58px).
      if (window.innerWidth <= 720) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 66;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* Also handle the hero CTA "View Projects" button */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;

      if (window.innerWidth <= 720) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 66;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     SUBTLE ENTRANCE ANIMATION — fade in sections on scroll
     ============================================================ */
  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  /* Animate cards, timeline items, skill groups, contact items */
  const animatables = document.querySelectorAll(
    '.project-card, .timeline-item, .skills-group, .contact-item, .cert-card, .goals-body, .about-body'
  );

  animatables.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease ' + (i * 0.05) + 's, transform 0.5s ease ' + (i * 0.05) + 's';
    fadeObserver.observe(el);
  });

  /* CSS class that triggers the animation */
  const styleTag = document.createElement('style');
  styleTag.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(styleTag);

})();
