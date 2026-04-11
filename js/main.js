/* ============================================================
   Kyiv PTS Centre — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- Header scroll state ---- */
  const header = document.getElementById('header');
  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ---- Mobile burger menu ---- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  function closeMenu() {
    burger.classList.remove('open');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    burger.classList.add('open');
    nav.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  burger.addEventListener('click', function () {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close menu when clicking nav links */
  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close menu on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      burger.focus();
    }
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
          10
        ) || 70;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* ---- Back to top button ---- */
  const backToTop = document.getElementById('backToTop');
  function updateBackToTop() {
    const shouldShow = window.scrollY > 400;
    backToTop.hidden = !shouldShow;
  }
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Animated counters ---- */
  function animateCounter(el, target, duration) {
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* ease-out-quart */
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }

  /* ---- Intersection Observer for fade-in + counters ---- */
  const observerOptions = { threshold: 0.15 };
  let countersAnimated = false;

  const countersSection = document.querySelector('.projects__counters');

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      /* Fade-in elements */
      if (entry.target.classList.contains('fade-in')) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }

      /* Counter elements */
      if (entry.target === countersSection && !countersAnimated) {
        countersAnimated = true;
        countersSection.querySelectorAll('[data-target]').forEach(function (numEl) {
          const target = parseInt(numEl.getAttribute('data-target'), 10);
          animateCounter(numEl, target, 1800);
        });
        io.unobserve(countersSection);
      }
    });
  }, observerOptions);

  /* Observe fade-in elements */
  document.querySelectorAll('.fade-in').forEach(function (el) {
    io.observe(el);
  });

  /* Observe counters section */
  if (countersSection) {
    io.observe(countersSection);
  }

  /* ---- Add fade-in class dynamically to key sections ---- */
  [
    '.about__text',
    '.about__cards',
    '.product-card',
    '.service-item',
    '.projects__clients',
    '.contact__info',
    '.contact__form',
  ].forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.classList.add('fade-in');
      el.style.transitionDelay = (i * 0.08) + 's';
      io.observe(el);
    });
  });

  /* ---- Contact form client-side validation ---- */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  const btnText = submitBtn ? submitBtn.querySelector('.btn__text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn__spinner') : null;

  function getField(id) { return document.getElementById(id); }
  function getError(id) { return document.getElementById(id + 'Error'); }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(fieldId, message) {
    const field = getField(fieldId);
    const error = getError(fieldId);
    if (field) field.classList.add('error');
    if (error) error.textContent = message;
  }

  function clearError(fieldId) {
    const field = getField(fieldId);
    const error = getError(fieldId);
    if (field) field.classList.remove('error');
    if (error) error.textContent = '';
  }

  function validateForm() {
    let valid = true;

    const name = getField('name');
    const email = getField('email');
    const message = getField('message');

    if (!name || !name.value.trim()) {
      showError('name', 'Будь ласка, введіть ваше ім\'я.');
      valid = false;
    } else {
      clearError('name');
    }

    if (!email || !email.value.trim()) {
      showError('email', 'Будь ласка, введіть електронну пошту.');
      valid = false;
    } else if (!validateEmail(email.value.trim())) {
      showError('email', 'Введіть коректну адресу електронної пошти.');
      valid = false;
    } else {
      clearError('email');
    }

    if (!message || !message.value.trim()) {
      showError('message', 'Будь ласка, введіть текст повідомлення.');
      valid = false;
    } else {
      clearError('message');
    }

    return valid;
  }

  /* Live validation on blur */
  ['name', 'email', 'message'].forEach(function (fieldId) {
    const field = getField(fieldId);
    if (field) {
      field.addEventListener('blur', function () {
        validateForm();
      });
      field.addEventListener('input', function () {
        if (field.classList.contains('error')) {
          clearError(fieldId);
        }
      });
    }
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) return;

      /* Simulate form submission (no backend in static hosting) */
      if (btnText) btnText.hidden = true;
      if (btnSpinner) btnSpinner.hidden = false;
      submitBtn.disabled = true;

      setTimeout(function () {
        if (btnText) btnText.hidden = false;
        if (btnSpinner) btnSpinner.hidden = true;
        submitBtn.disabled = false;
        formSuccess.hidden = false;
        form.reset();
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1200);
    });
  }

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  function updateActiveLink() {
    const scrollY = window.scrollY;
    const headerOffset = 80;

    sections.forEach(function (section) {
      const top = section.offsetTop - headerOffset;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

})();
