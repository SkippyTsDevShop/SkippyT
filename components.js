/* ── SG Studios · Shared Components ── */

function renderNav(activePage = '') {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'louisiana-real-estate.html', label: 'Louisiana Real Estate' },
    { href: 'atlanta-real-estate.html', label: 'Atlanta Real Estate' },
    
    { href: 'corporate.html', label: 'Corporate' },
    { href: 'personal.html', label: 'Weddings & Personal' },
    { href: 'pricing.html', label: 'Pricing' },
  ];

  const links = pages.map(p => `
    <li><a href="${p.href}" class="${activePage === p.href ? 'active' : ''}">${p.label}</a></li>
  `).join('');

  document.getElementById('nav-placeholder').innerHTML = `
    <nav id="main-nav">
      <a href="index.html" class="nav-logo">SG Studios</a>
      <ul class="nav-links">${links}</ul>
      <a href="https://media.sgeestudios.com/Super-Shopper" target="_blank" class="nav-book">Book now</a>
    </nav>
  `;

  // Scroll behavior: darken nav on scroll for pages with dark heroes
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('dark', window.scrollY > 60);
    });
  }
  // Init mobile hamburger
  initMobileNav();
}

function renderFooter() {
  document.getElementById('footer-placeholder').innerHTML = `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>SG Studios</h3>
          <p>Professional photography for real estate, weddings, portraits, corporate, and events. Serving Louisiana and Atlanta.</p>
          <p style="margin-top:1rem;font-size:0.72rem;color:rgba(248,246,242,0.2);">media.sgeestudios.com</p>
        </div>
        <div class="footer-col">
          <h4>Portfolio</h4>
          <ul>
            <li><a href="louisiana-real-estate.html">Louisiana Real Estate</a></li>
            <li><a href="atlanta-real-estate.html">Atlanta Real Estate</a></li>
            <li><a href="weddings.html">Weddings</a></li>
            <li><a href="corporate.html">Corporate</a></li>
            <li><a href="personal.html">Personal</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Studio</h4>
          <ul>
            <li><a href="index.html#about">About</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="index.html#contact">Contact</a></li>
            <li><a href="https://media.sgeestudios.com/Super-Shopper" target="_blank">Book a session</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://www.instagram.com/sgeestudios" target="_blank">Instagram</a></li>
            <li><a href="https://www.facebook.com/people/Sgeestudios/61558964259345/" target="_blank">Facebook</a></li>
            <li><a href="mailto:info@sgeestudios.com">info@sgeestudios.com</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">© 2026 SG Studios LLC. All rights reserved.</span>
        <div class="footer-social">
          <a href="https://www.instagram.com/sgeestudios" target="_blank">Instagram</a>
          <a href="https://www.facebook.com/people/Sgeestudios/61558964259345/" target="_blank">Facebook</a>
        </div>
      </div>
    </footer>
  `;
}

/* ── Image injection — replaces src="images/X.png" with base64 data ── */
function injectImages() {
  if (typeof IMGS === 'undefined') return;
  document.querySelectorAll('img[src^="images/"]').forEach(img => {
    const key = img.getAttribute('src')
      .replace('images/', '')
      .replace('.png', '');
    if (IMGS[key]) img.src = IMGS[key];
  });
}
// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectImages);
} else {
  injectImages();
}

/* ── Mobile nav toggle ── */
function initMobileNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  // Create hamburger button
  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-label', 'Toggle menu');
  toggle.innerHTML = '<span></span><span></span><span></span>';

  // Insert before the nav-book link
  const book = nav.querySelector('.nav-book');
  nav.insertBefore(toggle, book);

  const links = nav.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}
