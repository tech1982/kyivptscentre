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
  const observerOptions = { threshold: 0.05 };
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

  /* ---- Resend API form submission ---- */
  var RESEND_API_KEY = 're_ETQ98pcZ_5AFqScyFWPYYnWiZdmra6TUJ';
  var TO_EMAIL       = 'office@pts-centre.kiev.ua';

  var SUBJECT_LABELS = {
    pneumo:   'Система пневматичної пошти',
    queue:    'Система управління чергою',
    banking:  'Банківське обладнання',
    archive:  'Мобільні архіви',
    service:  'Технічне обслуговування',
    other:    'Інше',
    '':       'Загальне питання'
  };

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) return;

      var nameVal    = (getField('name')    || {}).value || '';
      var emailVal   = (getField('email')   || {}).value || '';
      var phoneVal   = (getField('phone')   || {}).value || '';
      var subjectVal = (getField('subject') || {}).value || '';
      var msgVal     = (getField('message') || {}).value || '';

      var subjectLabel = SUBJECT_LABELS[subjectVal] || subjectVal || 'Загальне питання';

      var htmlBody = [
        '<h2 style="color:#1a5fa8">Новий запит з сайту Київ-PTS-Центр</h2>',
        '<table style="border-collapse:collapse;width:100%;max-width:520px;font-family:sans-serif;font-size:15px">',
        '<tr><td style="padding:8px 12px;background:#f4f7fb;font-weight:600;width:140px">Ім'я</td><td style="padding:8px 12px;border-bottom:1px solid #dde4ee">' + nameVal + '</td></tr>',
        '<tr><td style="padding:8px 12px;background:#f4f7fb;font-weight:600">Email</td><td style="padding:8px 12px;border-bottom:1px solid #dde4ee"><a href="mailto:' + emailVal + '">' + emailVal + '</a></td></tr>',
        '<tr><td style="padding:8px 12px;background:#f4f7fb;font-weight:600">Телефон</td><td style="padding:8px 12px;border-bottom:1px solid #dde4ee">' + (phoneVal || '—') + '</td></tr>',
        '<tr><td style="padding:8px 12px;background:#f4f7fb;font-weight:600">Тема</td><td style="padding:8px 12px;border-bottom:1px solid #dde4ee">' + subjectLabel + '</td></tr>',
        '<tr><td style="padding:8px 12px;background:#f4f7fb;font-weight:600;vertical-align:top">Повідомлення</td><td style="padding:8px 12px">' + msgVal.replace(/
/g, '<br>') + '</td></tr>',
        '</table>',
        '<p style="margin-top:24px;color:#5a6a7a;font-size:13px">Надіслано з форми зворотного зв'язку на pts-centre.kiev.ua</p>'
      ].join('');

      if (btnText) btnText.hidden = true;
      if (btnSpinner) btnSpinner.hidden = false;
      submitBtn.disabled = true;

      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + RESEND_API_KEY
        },
        body: JSON.stringify({
          from: 'Київ-PTS-Центр <noreply@pts-centre.kiev.ua>',
          to: [TO_EMAIL],
          reply_to: emailVal,
          subject: 'Запит з сайту: ' + subjectLabel + ' від ' + nameVal,
          html: htmlBody
        })
      })
      .then(function (res) {
        if (btnText) btnText.hidden = false;
        if (btnSpinner) btnSpinner.hidden = true;
        submitBtn.disabled = false;

        if (res.ok) {
          formSuccess.hidden = false;
          form.reset();
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          return res.json().then(function (data) {
            alert('Помилка відправки: ' + (data.message || res.statusText) + '\nСпробуйте зателефонувати нам напряму.');
          });
        }
      })
      .catch(function (err) {
        if (btnText) btnText.hidden = false;
        if (btnSpinner) btnSpinner.hidden = true;
        submitBtn.disabled = false;
        alert('Не вдалося відправити повідомлення. Перевірте з'єднання або зателефонуйте нам напряму.');
        console.error('Resend error:', err);
      });
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
