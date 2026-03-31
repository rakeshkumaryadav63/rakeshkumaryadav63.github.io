/* ═══════════════════════════════════════════
   RAKESH KUMAR YADAV — PORTFOLIO
   script.js | Interactions & Animations
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. Custom Cursor ─── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand ring on hoverable elements
  document.querySelectorAll('a, button, .project-card, .cert-card, .about-card, .skill-pill').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });


  /* ─── 2. Navbar scroll effect + active link ─── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scrolled style
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll(); // run once on load


  /* ─── 3. Hamburger menu ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });

  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });


  /* ─── 4. Theme toggle ─── */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const body = document.body;

  // Load saved preference
  const savedTheme = localStorage.getItem('rky-theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('rky-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
  }


  /* ─── 5. Scroll Reveal (IntersectionObserver) ─── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = entry.target.closest('.projects-grid, .certs-grid, .about-cards, .about-grid, .achievements-row, .skills-categories');
        let delay = 0;
        if (siblings) {
          const siblingArr = Array.from(siblings.children);
          const idx = siblingArr.indexOf(entry.target);
          delay = idx * 80;
        }
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ─── 6. Hero fade-up on load ─── */
  const fadeEls = document.querySelectorAll('.fade-up');
  fadeEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 120);
  });


  /* ─── 7. Typing animation ─── */
  const words = [
    'intelligent ML systems.',
    'data-driven insights.',
    'scalable web apps.',
    'real-world solutions.',
    'clean, efficient code.'
  ];
  const typedEl = document.getElementById('typed');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const current = words[wordIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      typeSpeed = 1500; // pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 300; // pause before next word
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1200); // start after hero load


  /* ─── 8. Skill bars animation ─── */
  const bars = document.querySelectorAll('.bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.getAttribute('data-width');
        setTimeout(() => {
          target.style.width = width + '%';
        }, 200);
        barObserver.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => barObserver.observe(bar));


  /* ─── 9. Contact form ─── */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formNote.style.color = '#ff6b6b';
        formNote.textContent = 'Please fill in all required fields.';
        return;
      }

      // Simulate send (replace with real backend / EmailJS / Formspree)
      const btn = form.querySelector('.btn-primary');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        formNote.style.color = 'var(--green)';
        formNote.textContent = '✓ Message sent! I\'ll get back to you soon.';
        form.reset();
        btn.innerHTML = 'Send Message <i class="bx bx-send"></i>';
        btn.disabled = false;
      }, 1500);
    });
  }


  /* ─── 10. Smooth scroll for all anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ─── 11. Counter animation for hero stats ─── */
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = start + suffix;
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNums = document.querySelectorAll('.stat-num');
        const values = [3, 6, 97.5];
        const suffixes = ['+', '+', '%'];
        statNums.forEach((el, i) => {
          if (i < values.length) {
            el.textContent = '0' + suffixes[i];
            animateCounter(el, values[i], suffixes[i]);
          }
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) statsObserver.observe(statsEl);

  /* ─── 12. Certificate Modal ─── */
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImg');
  const modalPdf = document.getElementById('modalPdf');
  const closeModal = document.getElementById('closeModal');
  const viewCertBtns = document.querySelectorAll('.view-cert-btn');

  if (modal && (modalImg || modalPdf) && closeModal) {
    viewCertBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const certSrc = btn.getAttribute('data-cert');
        if (certSrc) {
          if (certSrc.toLowerCase().endsWith('.pdf')) {
            modalImg.style.display = 'none';
            modalPdf.src = certSrc;
            modalPdf.style.display = 'block';
          } else {
            modalPdf.style.display = 'none';
            modalPdf.src = '';
            modalImg.src = certSrc;
            modalImg.style.display = 'block';
          }
          modal.classList.add('show');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeCertModal() {
      modal.classList.remove('show');
      document.body.style.overflow = '';
      setTimeout(() => { 
        if (modalImg) modalImg.src = ''; 
        if (modalPdf) modalPdf.src = ''; 
      }, 300);
    }

    closeModal.addEventListener('click', closeCertModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCertModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeCertModal();
      }
    });
  }

});
