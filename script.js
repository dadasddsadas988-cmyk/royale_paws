/* ============================================================
   ROYAL PAWS — ULTRA LUXURY JS
   ============================================================ */

/* ===== CUSTOM CURSOR ===== */
(function() {
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left  = mx + 'px';
        dot.style.top   = my + 'px';
    });

    function animRing() {
        rx += (mx - rx) * .12;
        ry += (my - ry) * .12;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animRing);
    }
    animRing();

    // Hide on leave / show on enter
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();

/* ===== GOLD PARTICLES ===== */
(function() {
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
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        r:  Math.random() * 2 + .5,
        dx: (Math.random() - .5) * .4,
        dy: -Math.random() * .6 - .2,
        o:  Math.random() * .6 + .2,
        do: (Math.random() - .5) * .01,
        color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
    }));

    function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x  += p.dx;
            p.y  += p.dy;
            p.o  += p.do;
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
(function() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
})();

/* ===== INTERSECTION OBSERVER — FADE ANIMATIONS ===== */
(function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Trigger count-up when stats section shows
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
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const start = performance.now();

        function update(now) {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 4);
            const val = Math.round(ease * target);
            el.textContent = val + (el.dataset.target === '100' ? '' : '+');
            if (t < 1) requestAnimationFrame(update);
            else el.textContent = target + (target === 100 ? '' : '+');
        }
        requestAnimationFrame(update);
    });
}

/* ===== RIPPLE EFFECT ===== */
document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x - size/2}px;top:${y - size/2}px`;
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
});

/* ===== TILT EFFECT ON CARDS ===== */
(function() {
    const cards = document.querySelectorAll('.stat-card, .advantage-card, .pride-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect  = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - .5;
            const y = (e.clientY - rect.top)  / rect.height - .5;
            card.style.transform = `translateY(-12px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();

/* ===== MODAL ===== */
const modal = document.getElementById('modal');
if (modal) {
    window.openModal  = () => modal.classList.add('show');
    window.closeModal = () => modal.classList.remove('show');
    window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

/* ===== PUPPIES PAGE ===== */
if (document.getElementById('dogsGrid')) {

    const puppies = {
        bobik: {
            name: 'Бобик', breed: 'Мопс', age: '3 месяца', gender: 'Мальчик',
            color: 'Палевый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '150 000 ₽',
            desc: 'Ласковый и спокойный щенок с премиальной родословной. Вырос в домашних условиях, приучен к людям и другим животным. Отличный характер, легко обучается. Идеален для семьи с детьми.',
            photos: [
                { type: 'img', src: 'sticker-pug-with-sticker-that-says-pug_961307-12288.avif' },
                { type: 'emoji', emoji: '🐶', bg: 'linear-gradient(135deg,#2a1f0a,#1a1408)' },
                { type: 'emoji', emoji: '🐾', bg: 'linear-gradient(135deg,#1a1208,#0e0a04)' },
            ]
        },
        richard: {
            name: 'Ричард', breed: 'Мопс', age: '4 месяца', gender: 'Мальчик',
            color: 'Чёрный', docs: 'РКФ / FCI', vax: 'Сделаны', price: '220 000 ₽',
            desc: 'Перспективный щенок для семьи и выставок. Правильный экстерьер, выставочный тип. Родители — многократные чемпионы. Подходит для разведения и участия в рингах.',
            photos: [
                { type: 'img', src: '1024x763_0xac120003_16160837191590122985.jpg' },
                { type: 'emoji', emoji: '🏆', bg: 'linear-gradient(135deg,#1a1408,#2b1c05)' },
                { type: 'emoji', emoji: '🐾', bg: 'linear-gradient(135deg,#111,#1e1408)' },
            ]
        },
        arkhip: {
            name: 'Архип', breed: 'Мопс-терьер', age: '2 месяца', gender: 'Мальчик',
            color: 'Тигровый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '185 000 ₽',
            desc: 'Энергичный и игривый малыш с уникальным характером терьера и добродушием мопса. Обожает активные игры и прогулки. Очень общительный, быстро привязывается к хозяину.',
            photos: [
                { type: 'emoji', emoji: '🐾', bg: 'linear-gradient(135deg,#1a1408,#2a1f0a)' },
                { type: 'emoji', emoji: '🦴', bg: 'linear-gradient(135deg,#2a1f0a,#3a2a10)' },
                { type: 'emoji', emoji: '⭐', bg: 'linear-gradient(135deg,#1a1408,#15100a)' },
            ]
        },
        gertsog: {
            name: 'Герцог', breed: 'Мопс-терьер', age: '3.5 месяца', gender: 'Мальчик',
            color: 'Чёрно-подпалый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '240 000 ₽',
            desc: 'Благородный щенок с безупречным экстерьером и выставочными данными. Сын интерчемпиона. Крепкое здоровье, правильный прикус, отличный костяк.',
            photos: [
                { type: 'emoji', emoji: '🐾', bg: 'linear-gradient(135deg,#0e1a14,#152b1e)' },
                { type: 'emoji', emoji: '🏅', bg: 'linear-gradient(135deg,#152b1e,#1d3828)' },
                { type: 'emoji', emoji: '👑', bg: 'linear-gradient(135deg,#0e1a14,#0a1510)' },
            ]
        },
        luna: {
            name: 'Луна', breed: 'Мопс-терьер', age: '2.5 месяца', gender: 'Девочка',
            color: 'Кремово-белый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '195 000 ₽',
            desc: 'Нежная и ласковая девочка с мягкой шелковистой шерстью и добрым нравом. Отлично уживается с детьми и другими питомцами. Идеальный компаньон для семьи.',
            photos: [
                { type: 'emoji', emoji: '🐾', bg: 'linear-gradient(135deg,#1a0e0e,#2e1515)' },
                { type: 'emoji', emoji: '🌸', bg: 'linear-gradient(135deg,#2e1515,#3e1e1e)' },
                { type: 'emoji', emoji: '💛', bg: 'linear-gradient(135deg,#1a0e0e,#150a0a)' },
            ]
        },
        baron: {
            name: 'Барон', breed: 'Мопс-терьер', age: '4 месяца', gender: 'Мальчик',
            color: 'Тёмно-серый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '210 000 ₽',
            desc: 'Харизматичный и смелый — настоящий маленький лидер. Унаследовал живой темперамент терьера и уравновешенность мопса. Уже знает базовые команды.',
            photos: [
                { type: 'emoji', emoji: '🐾', bg: 'linear-gradient(135deg,#0e0e1a,#16162e)' },
                { type: 'emoji', emoji: '⚡', bg: 'linear-gradient(135deg,#16162e,#1e1e3e)' },
                { type: 'emoji', emoji: '🎖️', bg: 'linear-gradient(135deg,#0e0e1a,#0a0a16)' },
            ]
        },
        snezhok: {
            name: 'Снежок', breed: 'Мопс-терьер', age: '2 месяца', gender: 'Мальчик',
            color: 'Белый с пятнами', docs: 'РКФ / FCI', vax: 'Сделаны', price: '175 000 ₽',
            desc: 'Редкий светлый окрас и мягкий сбалансированный темперамент. Очень дружелюбен, отлично ладит с детьми любого возраста. Легко поддаётся дрессировке.',
            photos: [
                { type: 'emoji', emoji: '🐾', bg: 'linear-gradient(135deg,#120e1a,#1e1530)' },
                { type: 'emoji', emoji: '❄️', bg: 'linear-gradient(135deg,#1e1530,#28204a)' },
                { type: 'emoji', emoji: '🤍', bg: 'linear-gradient(135deg,#120e1a,#0e0b14)' },
            ]
        },
        vikont: {
            name: 'Виконт', breed: 'Мопс-терьер', age: '3 месяца', gender: 'Мальчик',
            color: 'Соболиный', docs: 'РКФ / FCI', vax: 'Сделаны', price: '290 000 ₽',
            desc: 'Сын чемпиона России 2023 года. Перспективный кандидат для племенного разведения и выставочной карьеры. Идеальный экстерьер, выдающаяся родословная.',
            photos: [
                { type: 'emoji', emoji: '🐾', bg: 'linear-gradient(135deg,#1a1208,#2b2010)' },
                { type: 'emoji', emoji: '🏆', bg: 'linear-gradient(135deg,#2b2010,#3a2c14)' },
                { type: 'emoji', emoji: '👑', bg: 'linear-gradient(135deg,#1a1208,#120e06)' },
            ]
        },
        magnolia: {
            name: 'Магнолия', breed: 'Мопс-терьер', age: '2.5 месяца', gender: 'Девочка',
            color: 'Крем-соболиный', docs: 'РКФ / FCI', vax: 'Сделаны', price: '265 000 ₽',
            desc: 'Девочка с исключительно редким крем-соболиным окрасом. Изящная, грациозная, с выдающейся родословной с обеих сторон. Победительница в классе щенков.',
            photos: [
                { type: 'emoji', emoji: '🐾', bg: 'linear-gradient(135deg,#0e1a17,#142a24)' },
                { type: 'emoji', emoji: '🌿', bg: 'linear-gradient(135deg,#142a24,#1a3830)' },
                { type: 'emoji', emoji: '✨', bg: 'linear-gradient(135deg,#0e1a17,#0a1510)' },
            ]
        },
        zefir: {
            name: 'Зефир', breed: 'Мопс-терьер', age: '2 месяца', gender: 'Мальчик',
            color: 'Светло-палевый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '160 000 ₽',
            desc: 'Спокойный, ласковый и очень понятливый малыш. Начал осваивать команды ещё в питомнике. Мягкий характер. Подойдёт первичным владельцам.',
            photos: [
                { type: 'emoji', emoji: '🐾', bg: 'linear-gradient(135deg,#1a1010,#2c1a1a)' },
                { type: 'emoji', emoji: '🍂', bg: 'linear-gradient(135deg,#2c1a1a,#3c2222)' },
                { type: 'emoji', emoji: '💤', bg: 'linear-gradient(135deg,#1a1010,#140c0c)' },
            ]
        }
    };

    function renderCards() {
        const grid = document.getElementById('dogsGrid');
        grid.innerHTML = '';
        Object.entries(puppies).forEach(([id, p], index) => {
            const firstPhoto = p.photos[0];
            const thumbHtml = firstPhoto.type === 'img'
                ? `<img src="${firstPhoto.src}" alt="${p.name}">`
                : `<div style="background:${firstPhoto.bg};height:380px;display:flex;align-items:center;justify-content:center;font-size:80px;">${firstPhoto.emoji}</div>`;
            const photoCount = p.photos.length;
            const dotsHtml = photoCount > 1
                ? `<div class="card-dots">${p.photos.map((_,i) => `<span class="card-dot${i===0?' active':''}"></span>`).join('')}</div>`
                : '';
            const card = document.createElement('div');
            card.className = 'dog-card';
            card.style.cssText = `animation: cardIn .6s ${index * .08}s ease both; opacity: 0; animation-fill-mode: forwards;`;
            card.innerHTML = `
                <div class="card-gallery" data-id="${id}" data-index="0">
                    ${thumbHtml}
                    ${photoCount > 1 ? `
                    <button class="card-arrow card-arrow-l" onclick="cardShift(event,'${id}',-1)">&#8592;</button>
                    <button class="card-arrow card-arrow-r" onclick="cardShift(event,'${id}',1)">&#8594;</button>
                    ${dotsHtml}` : ''}
                </div>
                <div class="dog-info">
                    <span>${p.breed}</span>
                    <h3>${p.name}</h3>
                    <p>${p.desc.slice(0,70)}…</p>
                    <div class="dog-bottom">
                        <strong>${p.price}</strong>
                        <button class="ripple-btn" onclick="openPuppyModal('${id}')">Подробнее</button>
                    </div>
                </div>`;
            grid.appendChild(card);
        });

        // Re-attach ripple to new buttons
        document.querySelectorAll('.ripple-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const size = Math.max(rect.width, rect.height) * 2;
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.cssText = `width:${size}px;height:${size}px;left:${x-size/2}px;top:${y-size/2}px`;
                btn.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });

        // Tilt on dog cards
        document.querySelectorAll('.dog-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width  - .5;
                const y = (e.clientY - rect.top)  / rect.height - .5;
                card.style.transform = `translateY(-10px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) scale(1.01)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    window.cardShift = function(e, id, dir) {
        e.stopPropagation();
        const wrap = document.querySelector(`.card-gallery[data-id="${id}"]`);
        const p = puppies[id];
        let idx = parseInt(wrap.dataset.index) + dir;
        if (idx < 0) idx = p.photos.length - 1;
        if (idx >= p.photos.length) idx = 0;
        wrap.dataset.index = idx;
        const photo = p.photos[idx];
        const existing = wrap.querySelector('img, div:not(.card-dots):not(.card-arrow)');
        const newEl = photo.type === 'img'
            ? Object.assign(document.createElement('img'), { src: photo.src, alt: p.name })
            : Object.assign(document.createElement('div'), {
                innerHTML: photo.emoji,
                style: `background:${photo.bg};height:380px;display:flex;align-items:center;justify-content:center;font-size:80px;`
              });
        newEl.classList.add('slide-in');
        wrap.insertBefore(newEl, wrap.firstChild);
        if (existing) existing.remove();
        wrap.querySelectorAll('.card-dot').forEach((d,i) => d.classList.toggle('active', i === idx));
    };

    let currentGalleryIndex = 0, currentPhotos = [];

    window.openPuppyModal = function(id) {
        const p = puppies[id];
        if (!p) return;
        document.getElementById('modalName').textContent  = p.name;
        document.getElementById('modalBadge').textContent = p.breed;
        document.getElementById('modalDesc').textContent  = p.desc;
        document.getElementById('modalPrice').textContent = p.price;
        document.getElementById('specBreed').textContent  = p.breed;
        document.getElementById('specAge').textContent    = p.age;
        document.getElementById('specGender').textContent = p.gender;
        document.getElementById('specColor').textContent  = p.color;
        document.getElementById('specDocs').textContent   = p.docs;
        document.getElementById('specVax').textContent    = p.vax;
        currentPhotos = p.photos;
        currentGalleryIndex = 0;
        buildGallery();
        showView('info');
        document.getElementById('puppyModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    function buildGallery() {
        const track = document.getElementById('galleryTrack');
        const dots  = document.getElementById('galleryDots');
        track.innerHTML = '';
        dots.innerHTML  = '';
        currentPhotos.forEach((photo, i) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slide.innerHTML = photo.type === 'img'
                ? `<img src="${photo.src}" alt="">`
                : `<div class="gallery-emoji" style="background:${photo.bg}">${photo.emoji}</div>`;
            track.appendChild(slide);
            const dot = document.createElement('span');
            dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
            dot.onclick = () => goToSlide(i);
            dots.appendChild(dot);
        });
        updateGallery();
        const arrows = document.querySelectorAll('.gallery-arrow');
        arrows.forEach(a => a.style.display = currentPhotos.length > 1 ? 'flex' : 'none');
        dots.style.display = currentPhotos.length > 1 ? 'flex' : 'none';
    }

    window.galleryShift = function(dir) {
        currentGalleryIndex += dir;
        if (currentGalleryIndex < 0) currentGalleryIndex = currentPhotos.length - 1;
        if (currentGalleryIndex >= currentPhotos.length) currentGalleryIndex = 0;
        updateGallery();
    };

    function goToSlide(i) { currentGalleryIndex = i; updateGallery(); }

    function updateGallery() {
        document.getElementById('galleryTrack').style.transform = `translateX(-${currentGalleryIndex * 100}%)`;
        document.querySelectorAll('.gallery-dot').forEach((d,i) => d.classList.toggle('active', i === currentGalleryIndex));
    }

    window.closePuppyModal = function() {
        document.getElementById('puppyModal').classList.remove('show');
        document.body.style.overflow = '';
    };

    document.getElementById('puppyModal').addEventListener('click', function(e) {
        if (e.target === this) closePuppyModal();
    });

    function showView(view) {
        document.getElementById('viewInfo').style.display    = view === 'info'    ? 'block' : 'none';
        document.getElementById('viewForm').style.display    = view === 'form'    ? 'block' : 'none';
        document.getElementById('viewSuccess').style.display = view === 'success' ? 'flex'  : 'none';
    }

    window.showForm = () => showView('form');
    window.hideForm = () => showView('info');

    document.querySelectorAll('.pill').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    window.submitForm = async function() {
        const name    = document.getElementById('fName').value.trim();
        const phone   = document.getElementById('fPhone').value.trim();
        const comment = document.getElementById('fComment').value.trim();
        const contact = document.querySelector('.pill.active')?.dataset.val || 'Телефон';
        const puppy   = document.getElementById('modalName')?.textContent || '';

        // Валидация имени
        if (!name) { showFieldError('fName', 'Пожалуйста, введите ваше имя'); return; }

        // Валидация телефона — только российские номера (+7 или 8, 11 цифр)
        const phoneClean = phone.replace(/\D/g, '');
        if (!phoneClean || phoneClean.length < 10) {
            showFieldError('fPhone', 'Введите корректный номер телефона');
            return;
        }
        const phoneValid = /^[78]\d{10}$/.test(phoneClean) || /^\d{10}$/.test(phoneClean);
        if (!phoneValid) {
            showFieldError('fPhone', 'Введите корректный номер (+7 xxx xxx-xx-xx)');
            return;
        }

        // Форматируем телефон красиво
        const digits = phoneClean.length === 11 ? phoneClean : '7' + phoneClean;
        const phoneFmt = `+${digits[0]} (${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7,9)}-${digits.slice(9,11)}`;

        // Отправка в Telegram
        const BOT_TOKEN = '8954514301:AAFtljRmDGAT81VRzlXvVz_VwAoEcoWxrYE';
        const CHAT_ID   = '1011797614';
        const text = [
            '🐾 <b>Новая заявка на щенка</b>',
            '',
            `🐶 <b>Щенок:</b> ${puppy}`,
            `👤 <b>Имя:</b> ${name}`,
            `📞 <b>Телефон:</b> ${phoneFmt}`,
            `💬 <b>Способ связи:</b> ${contact}`,
            comment ? `📝 <b>Комментарий:</b> ${comment}` : '',
        ].filter(Boolean).join('\n');

        const btn = document.querySelector('.puppy-modal-actions .gold-btn[onclick*="submitForm"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Отправляем...'; }

        try {
            const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' })
            });
            const data = await res.json();
            if (!data.ok) throw new Error(data.description);

            document.getElementById('successName').textContent = puppy;
            showView('success');
        } catch(e) {
            alert('Ошибка отправки. Пожалуйста, напишите нам напрямую.');
            console.error(e);
        } finally {
            if (btn) { btn.disabled = false; btn.textContent = 'Отправить заявку'; }
        }
    };

    function showFieldError(id, msg) {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.borderColor = '#e05252';
        el.style.boxShadow = '0 0 0 3px rgba(224,82,82,.2)';
        let err = el.parentNode.querySelector('.field-error');
        if (!err) {
            err = document.createElement('p');
            err.className = 'field-error';
            err.style.cssText = 'color:#e05252;font-size:12px;margin-top:6px;';
            el.parentNode.appendChild(err);
        }
        err.textContent = msg;
        el.focus();
        el.addEventListener('input', function clear() {
            el.style.borderColor = '';
            el.style.boxShadow = '';
            if (err) err.remove();
            el.removeEventListener('input', clear);
        }, { once: true });
    }

    renderCards();
}

/* ===== CARD IN KEYFRAME (injected) ===== */
const style = document.createElement('style');
style.textContent = `
    @keyframes cardIn {
        from { opacity: 0; transform: translateY(50px) scale(.96); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
    }
`;
document.head.appendChild(style);
