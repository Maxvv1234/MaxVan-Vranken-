document.body.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  menuButton.hidden = false;
  const closeMenu = (focusButton = false) => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    if (focusButton) menuButton.focus();
  };
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) closeMenu(true);
  });
  window.matchMedia('(max-width: 700px)').addEventListener('change', () => closeMenu());
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
const photo = document.querySelector('#profile-photo');
const fallback = document.querySelector('.photo-fallback');
if (photo && fallback) {
  const showFallback = () => { photo.hidden = true; fallback.hidden = false; };
  photo.addEventListener('error', showFallback);
  photo.addEventListener('load', () => { photo.hidden = false; fallback.hidden = true; });
  if (photo.complete && photo.naturalWidth === 0) showFallback();
}
const replay = document.querySelector('.replay');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (replay) {
  const updateReplay = () => { replay.hidden = reducedMotion.matches; };
  updateReplay();
  reducedMotion.addEventListener('change', updateReplay);
  replay.addEventListener('click', () => {
    if (reducedMotion.matches) return;
    document.querySelectorAll('.intro-motion').forEach(element => {
      element.classList.remove('intro-motion');
      requestAnimationFrame(() => requestAnimationFrame(() => element.classList.add('intro-motion')));
    });
  });
}
