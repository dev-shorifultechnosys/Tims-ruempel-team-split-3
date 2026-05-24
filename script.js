/* =====================================================================
   Tims Rümpel-Team – Vanilla JS
   Handles: lucide icons, sticky navbar, mobile menu, FAQ accordion,
            star rating widget, live chat panel, footer year.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ---- Lucide icons ---- */
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  /* ---- Footer year ---- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Sticky navbar shadow on scroll ---- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Show desktop nav CTA buttons (CSS hides until JS confirms widths) ---- */
  document.querySelectorAll('.nav-cta .btn-phone, .nav-cta .btn-request').forEach(b => {
    if (window.matchMedia('(min-width: 640px)').matches) b.style.display = 'inline-flex';
  });

  /* ---- Mobile menu toggle ---- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav  = document.getElementById('mobileNav');
  menuToggle?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('is-open');
    menuToggle.innerHTML = '';
    const ic = document.createElement('i');
    ic.setAttribute('data-lucide', open ? 'x' : 'menu');
    menuToggle.appendChild(ic);
    window.lucide?.createIcons();
  });
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('is-open')));

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('#faqList .faq-item').forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const icon    = item.querySelector('.faq-icon');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      icon.textContent = isOpen ? '−' : '+';
    });
  });

  /* ---- Star rating ---- */
  const rating = document.getElementById('starRating');
  if (rating) {
    const stars = rating.querySelectorAll('.star');
    const paint = (n) => stars.forEach(s => s.classList.toggle('is-active', Number(s.dataset.v) <= n));
    stars.forEach(s => {
      s.addEventListener('mouseenter', () => paint(Number(s.dataset.v)));
      s.addEventListener('click', () => { rating.dataset.value = s.dataset.v; paint(Number(s.dataset.v)); });
    });
    rating.addEventListener('mouseleave', () => paint(Number(rating.dataset.value || 0)));
  }

  /* ---- Live chat panel ---- */
  const chat   = document.getElementById('liveChat');
  const toggle = document.getElementById('liveChatToggle');
  const close  = chat?.querySelector('[data-chat-close]');
  toggle?.addEventListener('click', () => chat.classList.toggle('is-open'));
  close?.addEventListener('click', (e) => { e.stopPropagation(); chat.classList.remove('is-open'); });
});
