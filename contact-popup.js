// contact-popup.js — shared contact popup logic for all pages

(function () {
    // Trigger all buttons with class "contact-trigger-btn"
    const triggers = document.querySelectorAll('.contact-trigger-btn');
    const popup = document.getElementById('contactPopup');
    const overlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('closePopup');

    if (!popup) return;

    function openPopup() {
        popup.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        popup.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    triggers.forEach(btn => btn.addEventListener('click', openPopup));
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    if (overlay) overlay.addEventListener('click', closePopup);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closePopup();
    });
})();
