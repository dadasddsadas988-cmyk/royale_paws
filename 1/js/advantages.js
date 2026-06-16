/* ============================================================
   ROYAL PAWS — ADVANTAGES.JS
   Скрипты только для страницы «Преимущества» (advantages.html)
   ============================================================ */

/* ===== FEATURE BLOCKS — появление при скролле ===== */
(function () {
    const blocks = document.querySelectorAll('.feature-block');
    if (!blocks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('show');
        });
    }, { threshold: 0.15 });

    blocks.forEach(el => observer.observe(el));
})();

/* ===== COMPARISON TABLE — появление при скролле ===== */
(function () {
    const table = document.getElementById('compTable');
    if (!table) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('show');
        });
    }, { threshold: 0.2 });

    observer.observe(table);
})();

/* ===== GUARANTEE CARDS — staggered появление ===== */
(function () {
    const cards = document.querySelectorAll('.guarantee-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('show'), i * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(el => observer.observe(el));
})();
