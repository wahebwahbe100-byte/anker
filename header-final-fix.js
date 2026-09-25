(function () {
  const header = document.querySelector('header.site-header');
  const nav = header && header.querySelector('.container.nav');
  const logo = header && header.querySelector('.logo');
  const menu = header && header.querySelector('.menu');
  const tools = header && header.querySelector('.header-tools');
  const toggle = header && header.querySelector('.mobile-toggle');
  if (!header || !nav || !logo || !menu || !tools || !toggle) return;

  function closeMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
    document.body.classList.remove('menu-open');
  }

  function measureMenuWidth() {
    const prev = menu.getAttribute('style') || '';
    menu.setAttribute('style', prev + ';display:flex !important;position:static !important;visibility:hidden !important;opacity:1 !important;pointer-events:none !important;max-height:none !important;overflow:visible !important;transform:none !important;');
    const width = Math.ceil(menu.scrollWidth || menu.getBoundingClientRect().width || 0);
    menu.setAttribute('style', prev);
    if (!prev) menu.removeAttribute('style');
    return width;
  }

  function updateHeader() {
    const isScrolled = window.scrollY > 24;
    header.classList.toggle('is-scrolled', isScrolled);

    const navWidth = Math.ceil(nav.clientWidth || nav.getBoundingClientRect().width || 0);
    const logoWidth = Math.ceil(logo.getBoundingClientRect().width || 0);
    const toolsWidth = Math.ceil(tools.getBoundingClientRect().width || 0);
    const menuWidth = measureMenuWidth();
    const reserve = (window.innerWidth <= 760) ? 26 : 46;
    const available = navWidth - logoWidth - toolsWidth - reserve;
    const forceToggle = window.innerWidth <= 1180 || menuWidth > available;

    header.classList.toggle('menu-mode-toggle', forceToggle);
    header.classList.toggle('menu-mode-inline', !forceToggle);

    if (!forceToggle) {
      closeMenu();
    }
  }

  let raf = 0;
  function scheduleUpdate() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateHeader);
  }

  scheduleUpdate();
  window.addEventListener('load', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('orientationchange', scheduleUpdate, { passive: true });
  document.fonts && document.fonts.ready && document.fonts.ready.then(scheduleUpdate);

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(nav);
    observer.observe(logo);
    observer.observe(tools);
    observer.observe(menu);
  }

  document.addEventListener('click', function (event) {
    if (!header.classList.contains('menu-mode-toggle')) return;
    if (!menu.classList.contains('open')) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });
})();
