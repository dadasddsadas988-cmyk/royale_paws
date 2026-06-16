/* ============================================================
   ROYAL PAWS — INDEX.JS
   Скрипты только для главной страницы (index.html)
   ============================================================ */

/* ===== MODAL (старый модал на главной) ===== */
(function () {
    const modal = document.getElementById('modal');
    if (!modal) return;
    window.openModal  = () => modal.classList.add('show');
    window.closeModal = () => modal.classList.remove('show');
    window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
})();
