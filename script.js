const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
function closeMenu(returnFocus = false) {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  if (returnFocus) menuButton.focus();
}
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
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
  if (photo.complete && photo.naturalWidth === 0) showFallback();
}
