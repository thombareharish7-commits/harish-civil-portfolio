// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll reveal: sections and cards animate into view as the visitor scrolls.
document.documentElement.classList.add('js-ready');

const revealTargets = document.querySelectorAll(
  '.about-section .two-column > div, .section-heading, .skill-card, .timeline-item, ' +
  '.knowledge-grid article, .projects-note, .contact-grid > div, .facts'
);

revealTargets.forEach((element, index) => {
  element.classList.add(index % 5 === 0 ? 'reveal-left' : (index % 5 === 1 ? 'reveal-right' : 'reveal'));
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -35px 0px' });

  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
}

// Thin gold progress line at the top follows page scrolling.
function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();
