/* =========================================================
   BROM — Portfolio interactions
   Vanilla JS + GSAP/ScrollTrigger (loaded via CDN in index.html)
   ========================================================= */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;

  /* ---------------- Hard safeguard: command palette starts closed ---------------- */
  const cmdkEl = document.getElementById('cmdk');
  if (cmdkEl) { cmdkEl.hidden = true; cmdkEl.classList.remove('is-open'); }

  /* ---------------- Year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Loader ---------------- */
  const loader = document.getElementById('loader');
  const loaderBarSpan = loader?.querySelector('.loader-bar span');
  const loaderPct = loader?.querySelector('.loader-pct');

  function runLoader() {
    if (reduceMotion || !loader) { loader?.classList.add('is-hidden'); startPageAnimations(); return; }
    let progress = 0;
    const timer = setInterval(() => {
      progress += Math.random() * 18 + 6;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        if (loaderBarSpan) loaderBarSpan.style.width = '100%';
        if (loaderPct) loaderPct.textContent = '100%';
        setTimeout(() => {
          loader.classList.add('is-hidden');
          startPageAnimations();
        }, 350);
        return;
      }
      if (loaderBarSpan) loaderBarSpan.style.width = progress + '%';
      if (loaderPct) loaderPct.textContent = Math.floor(progress) + '%';
    }, 140);
  }
  window.addEventListener('load', runLoader);
  // Safety net in case load already fired
  setTimeout(() => { if (loader && !loader.classList.contains('is-hidden') && document.readyState === 'complete') runLoader(); }, 4000);

  /* ---------------- Custom cursor ---------------- */
  if (!isTouch) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
    });
    function animateRing() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
      requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a, button, .project-card, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => ring?.classList.add('is-active'));
      el.addEventListener('mouseleave', () => ring?.classList.remove('is-active'));
    });
  }

  /* ---------------- Magnetic buttons ---------------- */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
    });
  }

  /* ---------------- Tilt on project cards ---------------- */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------------- Navbar scroll state ---------------- */
  const navbar = document.getElementById('navbar');
  const scrollBar = document.getElementById('scroll-progress-bar');
  function onScroll() {
    const y = window.scrollY;
    navbar?.classList.toggle('is-scrolled', y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollBar) scrollBar.style.width = h > 0 ? `${(y / h) * 100}%` : '0%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav ---------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  navToggle?.addEventListener('click', () => {
    const open = navMobile.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navMobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navMobile.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  /* ---------------- Back to top ---------------- */
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------------- Typing effect ---------------- */
  const typeTarget = document.getElementById('type-target');
  const words = ['premium.', 'futuristic.', 'unforgettable.', 'alive.'];
  let wi = 0, ci = 0, deleting = false;
  function typeLoop() {
    if (!typeTarget) return;
    const word = words[wi];
    if (!deleting) {
      ci++;
      typeTarget.textContent = word.slice(0, ci);
      if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
    } else {
      ci--;
      typeTarget.textContent = word.slice(0, ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(typeLoop, deleting ? 45 : 90);
  }
  if (reduceMotion && typeTarget) {
    typeTarget.textContent = words[0];
  } else {
    typeLoop();
  }

  /* ---------------- Scroll reveals (IntersectionObserver, GSAP-friendly fallback) ---------------- */
  const revealEls = document.querySelectorAll('.reveal-up');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ---------------- Animated stat counters ---------------- */
  const statEls = document.querySelectorAll('.stat-num');
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      statIO.unobserve(el);
      if (reduceMotion) { el.textContent = target; return; }
      let start = 0;
      const dur = 1400;
      const t0 = performance.now();
      function step(t) {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  statEls.forEach(el => statIO.observe(el));

  /* ---------------- Skill bars fill on view ---------------- */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const fill = bar.querySelector('.skill-fill');
      const level = bar.dataset.level || 0;
      if (fill) fill.style.width = level + '%';
      skillIO.unobserve(bar);
    });
  }, { threshold: 0.4 });
  skillBars.forEach(el => skillIO.observe(el));

  /* ---------------- Project filtering ---------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------------- Contact form (demo only — no backend) ---------------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Please fill in every field before sending lil bro.';
      status.style.color = '#FF4D9D';
      return;
    }
    status.style.color = '#00FF88';
    status.textContent = 'Message ready — but this is a concept so no backend connected';
    form.reset();
  });

  /* ---------------- Command palette (Ctrl+K / Cmd+K) ---------------- */
  const cmdk = document.getElementById('cmdk');
  const cmdkInput = document.getElementById('cmdk-input');
  const cmdkList = document.getElementById('cmdk-list');
  const cmdkTrigger = document.getElementById('cmdk-trigger');
  const commands = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#experience' },
    { label: 'Services', href: '#services' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '254745477064' },
    { label: 'Back to top', href: '#hero' },
  ];
  function renderCmdk(filter = '') {
    cmdkList.innerHTML = '';
    commands
      .filter(c => c.label.toLowerCase().includes(filter.toLowerCase()))
      .forEach((c, i) => {
        const li = document.createElement('li');
        li.textContent = c.label;
        li.className = i === 0 ? 'is-active' : '';
        li.addEventListener('click', () => { navigateTo(c.href); });
        cmdkList.appendChild(li);
      });
  }
  function navigateTo(href) {
    closeCmdk();
    document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  function openCmdk() {
    cmdk.hidden = false;
    cmdk.classList.add('is-open');
    renderCmdk();
    setTimeout(() => cmdkInput?.focus(), 30);
  }
  function closeCmdk() {
    cmdk.classList.remove('is-open');
    cmdk.hidden = true;
    cmdkInput.value = '';
  }
  cmdkTrigger?.addEventListener('click', openCmdk);
  cmdk?.addEventListener('click', (e) => { if (e.target === cmdk) closeCmdk(); });
  cmdkInput?.addEventListener('input', () => renderCmdk(cmdkInput.value));
  cmdkInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { cmdkList.querySelector('li')?.click(); }
  });
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdk.hidden ? openCmdk() : closeCmdk();
    }
    if (e.key === 'Escape' && !cmdk.hidden) closeCmdk();
  });

  /* ---------------- Smooth anchor scrolling ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        document.querySelector(id).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* ---------------- Aurora / particle background ---------------- */
  const canvas = document.getElementById('bg-canvas');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let w, h, particles;
    const COLORS = ['#6C63FF', '#00E5FF', '#FF4D9D'];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    function initParticles() {
      const count = Math.min(70, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        a: Math.random() * 0.5 + 0.15,
      }));
    }
    let mouseX = -9999, mouseY = -9999;
    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    function tick() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

        const dx = p.x - mouseX, dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let r = p.r;
        if (dist < 140) r += (1 - dist / 140) * 2.2;

        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    }
    resize(); initParticles(); tick();
    window.addEventListener('resize', () => { resize(); initParticles(); });
  }

  /* ---------------- GSAP ScrollTrigger enhancement (progressive) ---------------- */
  function startPageAnimations() {
    if (reduceMotion || typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero name letters cascade in
    gsap.from('.reveal-char', {
      y: 60, opacity: 0, stagger: 0.06, duration: 0.9, ease: 'power4.out', delay: 0.15,
    });

    // Subtle parallax on hero glow
    gsap.to('.hero-glow', {
      y: 120,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
    });

    // Floating cards drift with scroll for depth
    gsap.utils.toArray('.float-card').forEach((el, i) => {
      gsap.to(el, {
        y: (i + 1) * -40,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      });
    });
  }

  // In case GSAP finished loading after DOM ready but loader already resolved
  if (document.readyState === 'complete') { /* handled by load listener */ }
})();
/* ==========================================================================
   Ambient Music System (added) — self-contained, fails gracefully
   ========================================================================== */
(function ambientMusicSystem() {
  const STORAGE_KEY = 'ambientMusicEnabled';
  const TARGET_VOLUME = 0.25;
  const FADE_MS = 1000;

  const audio = document.getElementById('ambient-audio');
  const btn = document.getElementById('music-toggle-btn');

  // Bail out silently if markup is missing — no errors thrown.
  if (!audio || !btn) return;

  audio.volume = 0; // start silent; we fade in on play
  let fadeTimer = null;
  let isPlaying = false;

  function clearFade() {
    if (fadeTimer) {
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
  }

  function fadeVolume(from, to, duration, onDone) {
    clearFade();
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    fadeTimer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      audio.volume = Math.min(Math.max(from + (to - from) * progress, 0), 1);

      if (currentStep >= steps) {
        clearFade();
        audio.volume = to;
        if (typeof onDone === 'function') onDone();
      }
    }, stepTime);
  }

  function setPlayingUI(playing) {
    btn.classList.toggle('is-playing', playing);
    btn.setAttribute('aria-pressed', String(playing));
  }

  function playMusic() {
    audio.volume = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          setPlayingUI(true);
          fadeVolume(0, TARGET_VOLUME, FADE_MS);
          localStorage.setItem(STORAGE_KEY, 'true');
        })
        .catch(() => {
          // Playback blocked or file missing — fail silently, no console errors surfaced to user.
          isPlaying = false;
          setPlayingUI(false);
        });
    }
  }

  function pauseMusic() {
    fadeVolume(audio.volume, 0, FADE_MS, () => {
      audio.pause();
    });
    isPlaying = false;
    setPlayingUI(false);
    localStorage.setItem(STORAGE_KEY, 'false');
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  btn.addEventListener('click', toggleMusic);

  // Handle missing/broken audio file gracefully.
  audio.addEventListener('error', () => {
    isPlaying = false;
    setPlayingUI(false);
    btn.setAttribute('disabled', 'true');
    btn.style.opacity = '0.4';
    btn.style.cursor = 'not-allowed';
  });

  // Resume previously-enabled music on the NEXT user interaction
  // (browsers block autoplay, so we wait for a real gesture).
  const wasEnabled = localStorage.getItem(STORAGE_KEY) === 'true';

  if (wasEnabled) {
    const resumeOnFirstInteraction = () => {
      playMusic();
      document.removeEventListener('click', resumeOnFirstInteraction);
      document.removeEventListener('keydown', resumeOnFirstInteraction);
      document.removeEventListener('touchstart', resumeOnFirstInteraction);
    };

    document.addEventListener('click', resumeOnFirstInteraction, { once: true });
    document.addEventListener('keydown', resumeOnFirstInteraction, { once: true });
    document.addEventListener('touchstart', resumeOnFirstInteraction, { once: true });
  }
})();
