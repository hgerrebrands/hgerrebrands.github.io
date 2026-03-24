/* PCBReview.io — V3 main.js */
document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV scroll state ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const tick = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ── Mobile menu ── */
  const ham     = document.getElementById('ham');
  const mobileNav = document.getElementById('mobileNav');
  if (ham && mobileNav) {
    ham.addEventListener('click', () => mobileNav.classList.toggle('open'));
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileNav.classList.remove('open'))
    );
  }

  /* ── Active nav link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mobileNav a').forEach(a => {
    if ((a.getAttribute('href') || '').split('/').pop() === page) a.classList.add('active');
  });

  /* ── Scroll reveal ── */
  const revEls = document.querySelectorAll('.reveal');
  if (revEls.length) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }});
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    revEls.forEach(el => ro.observe(el));
  }

  /* ── FAQ ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* ── Contact form ── */
  const form = document.getElementById('contactForm');
  const succ = document.getElementById('formSuccess');
  if (form && succ) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      ['name','email','message'].forEach(id => {
        const el = document.getElementById(id);
        if (!el?.value.trim()) { el.style.borderColor = '#DC2626'; ok = false; el.addEventListener('input', () => el.style.borderColor = '', { once: true }); }
      });
      const emailEl = document.getElementById('email');
      if (emailEl?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
        emailEl.style.borderColor = '#DC2626'; ok = false;
      }
      if (ok) { form.style.display = 'none'; succ.style.display = 'block'; }
    });
  }

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    });
  });

});
