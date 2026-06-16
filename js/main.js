/* ============================================================
   ROYAL PAWS — MAIN.JS
   Общие скрипты для всех страниц
   ============================================================ */

/* ===== CUSTOM CURSOR ===== */
(function () {
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    function animRing() {
        rx += (mx - rx) * .12;
        ry += (my - ry) * .12;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animRing);
    }
    animRing();

    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();

/* ===== GOLD PARTICLES ===== */
(function () {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const GOLD_COLORS = ['rgba(212,175,55,', 'rgba(240,208,96,', 'rgba(168,136,42,', 'rgba(255,220,80,'];

    const particles = Array.from({ length: 60 }, () => ({
        x:     Math.random() * window.innerWidth,
        y:     Math.random() * window.innerHeight,
        r:     Math.random() * 2 + .5,
        dx:    (Math.random() - .5) * .4,
        dy:    -Math.random() * .6 - .2,
        o:     Math.random() * .6 + .2,
        do:    (Math.random() - .5) * .01,
        color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
    }));

    function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.dx; p.y += p.dy; p.o += p.do;
            if (p.o > .8 || p.o < .1) p.do *= -1;
            if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.o + ')';
            ctx.fill();
        });
        requestAnimationFrame(tick);
    }
    tick();
})();

/* ===== HEADER SCROLL ===== */
(function () {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
})();

/* ===== INTERSECTION OBSERVER — FADE ANIMATIONS ===== */
(function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                if (entry.target.classList.contains('stats')) {
                    startCountUp();
                }
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => observer.observe(el));
})();

/* ===== COUNT-UP ANIMATION ===== */
let countUpDone = false;
function startCountUp() {
    if (countUpDone) return;
    countUpDone = true;

    document.querySelectorAll('.count-up').forEach(el => {
        const target   = parseInt(el.dataset.target);
        const duration = 1800;
        const start    = performance.now();

        function update(now) {
            const t    = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 4);
            el.textContent = Math.round(ease * target) + (el.dataset.target === '100' ? '' : '+');
            if (t < 1) requestAnimationFrame(update);
            else el.textContent = target + (target === 100 ? '' : '+');
        }
        requestAnimationFrame(update);
    });
}

/* ===== RIPPLE EFFECT ===== */
(function () {
    function attachRipple(btn) {
        btn.addEventListener('click', function (e) {
            const rect = btn.getBoundingClientRect();
            const x    = e.clientX - rect.left;
            const y    = e.clientY - rect.top;
            const size = Math.max(rect.width, rect.height) * 2;
            const ripple = document.createElement('span');
            ripple.className  = 'ripple';
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${x - size / 2}px;top:${y - size / 2}px`;
            btn.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    }
    document.querySelectorAll('.ripple-btn').forEach(attachRipple);
    // Expose for dynamic buttons (e.g. puppies grid)
    window.attachRipple = attachRipple;
})();

/* ===== TILT EFFECT ON CARDS ===== */
(function () {
    const cards = document.querySelectorAll('.stat-card, .advantage-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - .5;
            const y = (e.clientY - rect.top)  / rect.height - .5;
            card.style.transform = `translateY(-12px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
})();

/* ===== CARD IN KEYFRAME (injected) ===== */
(function () {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cardIn {
            from { opacity: 0; transform: translateY(50px) scale(.96); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
        }
    `;
    document.head.appendChild(style);
})();
