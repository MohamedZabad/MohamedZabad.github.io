const year = new Date().getFullYear();

const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = `© ${year}`;

// Scroll-reveal animations
const revealEls = document.querySelectorAll('[data-reveal]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealEls.forEach(el => el.classList.add('in-view'));
} else if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// Expandable project cards
document.querySelectorAll('[data-expandable]').forEach(card => {
  const toggle = () => card.classList.toggle('expanded');

  card.addEventListener('click', (e) => {
    // Let the repo link navigate normally without toggling the card
    if (e.target.closest('.card-link')) return;
    toggle();
  });

  const btn = card.querySelector('.read-more');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
      btn.firstChild.textContent = card.classList.contains('expanded') ? 'Show less ' : 'Read more ';
    });
  }
});

// Active nav link highlighting on scroll
const navLinks = document.querySelectorAll('.topbar nav a[data-nav]');
const sections = Array.from(navLinks)
  .map(link => document.getElementById(link.dataset.nav))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.topbar nav a[data-nav="${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(section => navObserver.observe(section));
}