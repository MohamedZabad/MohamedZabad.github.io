const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = `© ${new Date().getFullYear()}`;

// Top bar gets a border once the page scrolls
const topbar = document.querySelector('.topbar');
const onScroll = () => topbar && topbar.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Expandable project cards
document.querySelectorAll('[data-expandable]').forEach(card => {
  const details = card.querySelector('.card-details');
  const btn = card.querySelector('.read-more');

  // Wrap the details in one inner element so the grid-rows animation works
  if (details && !details.querySelector('.card-details-inner')) {
    const inner = document.createElement('div');
    inner.className = 'card-details-inner';
    while (details.firstChild) inner.appendChild(details.firstChild);
    details.appendChild(inner);
  }

  const setExpanded = (open) => {
    card.classList.toggle('expanded', open);
    if (btn) {
      btn.setAttribute('aria-expanded', String(open));
      btn.firstChild.textContent = open ? 'Show less ' : 'Read more ';
    }
  };
  const toggle = () => setExpanded(!card.classList.contains('expanded'));

  card.addEventListener('click', (e) => {
    // Links and text selection inside the details shouldn't toggle the card
    if (e.target.closest('a')) return;
    if (card.classList.contains('expanded') && e.target.closest('.card-details')) return;
    toggle();
  });

  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
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
      if (!entry.isIntersecting) return;
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.nav === entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(section => navObserver.observe(section));
}
