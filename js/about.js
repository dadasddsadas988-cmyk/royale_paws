/* ============================================================
   ROYAL PAWS — ABOUT.JS
   Скрипты только для страницы «О питомнике» (about.html)
   ============================================================ */

/* ===== TIMELINE — анимация появления ===== */
(function () {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('show'), i * 120);
            }
        });
    }, { threshold: 0.2 });

    items.forEach(el => observer.observe(el));
})();

/* ===== TEAM CARDS — staggered появление ===== */
(function () {
    const cards = document.querySelectorAll('.team-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('show'), i * 130);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(el => observer.observe(el));
})();

/* ===== AWARD TILES — staggered появление ===== */
(function () {
    const tiles = document.querySelectorAll('.award-tile');
    if (!tiles.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('show'), i * 100);
            }
        });
    }, { threshold: 0.1 });

    tiles.forEach(el => observer.observe(el));
})();
