/* ============================================================
   ROYAL PAWS — MOBILE-NAV.JS
   Hamburger-меню для всех страниц
   ============================================================ */

(function () {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const overlay   = document.getElementById('mobileNavOverlay');
    const closeBtn  = document.getElementById('mobileNavClose');

    if (!hamburger || !mobileNav) return;

    function openNav() {
        hamburger.classList.add('open');
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        mobileNav.classList.contains('open') ? closeNav() : openNav();
    });

    if (overlay) overlay.addEventListener('click', closeNav);
    if (closeBtn) closeBtn.addEventListener('click', closeNav);

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeNav();
    });

    // Swipe right to close
    let touchStartX = 0;
    mobileNav.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    mobileNav.addEventListener('touchend', e => {
        if (e.changedTouches[0].clientX - touchStartX > 60) closeNav();
    }, { passive: true });
})();
