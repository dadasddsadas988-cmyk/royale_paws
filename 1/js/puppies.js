/* ============================================================
   ROYAL PAWS — PUPPIES.JS
   Скрипты только для страницы «Щенки» (puppies.html)
   ============================================================ */

(function () {
    if (!document.getElementById('dogsGrid')) return;

    /* ===== ДАННЫЕ ЩЕНКОВ ===== */
    /* Чтобы добавить фото — замени строки src на путь к своему файлу.
       Пример: 'images/puppies/bobik-1.jpg'
       Можно добавить сколько угодно фото в массив photos каждого щенка. */
    const puppies = {
        bobik: {
            name: 'Бобик', breed: 'Мопс', age: '3 месяца', gender: 'Мальчик',
            color: 'Фавновый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '150 000 ₽',
            desc: 'Ласковый и спокойный щенок с премиальной родословной. Вырос в домашних условиях, приучен к людям и другим животным. Отличный характер, легко обучается. Идеален для семьи с детьми.',
            photos: [
                'images/puppies/bobik-1.jpg',
                'images/puppies/bobik-2.jpg',
                'images/puppies/bobik-3.jpg',
            ],
        },
        richard: {
            name: 'Ричард', breed: 'Мопс', age: '2 месяца', gender: 'Мальчик',
            color: 'Кремово-белый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '220 000 ₽',
            desc: 'Перспективный щенок для семьи и выставок. Правильный экстерьер, выставочный тип. Родители — многократные чемпионы. Подходит для разведения и участия в рингах.',
            photos: [
                'images/puppies/richard-1.jpg',
                'images/puppies/richard-2.jpg',
                'images/puppies/richard-3.jpg',
            ],
        },
        arkhip: {
            name: 'Архип', breed: 'Мопс', age: '2 месяца', gender: 'Мальчик',
            color: 'Серо-фавновый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '185 000 ₽',
            desc: 'Энергичный и игривый малыш с уникальным характером терьера и добродушием мопса. Обожает активные игры и прогулки. Очень общительный, быстро привязывается к хозяину.',
            photos: [
                'images/puppies/arkhip-1.jpg',
                'images/puppies/arkhip-2.jpg',
                'images/puppies/arkhip-3.jpg',
            ],
        },
        gertsog: {
            name: 'Герцог', breed: 'Мопс', age: '2 месяца', gender: 'Мальчик',
            color: 'Фавново-рыжий', docs: 'РКФ / FCI', vax: 'Сделаны', price: '240 000 ₽',
            desc: 'Благородный щенок с безупречным экстерьером и выставочными данными. Сын интерчемпиона. Крепкое здоровье, правильный прикус, отличный костяк.',
            photos: [
                'images/puppies/gertsog-1.jpg',
                'images/puppies/gertsog-2.jpg',
                'images/puppies/gertsog-3.jpg',
            ],
        },
        luna: {
            name: 'Луна', breed: 'Мопс', age: '3 месяца', gender: 'Девочка',
            color: 'Фавновый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '195 000 ₽',
            desc: 'Нежная и ласковая девочка с мягкой шелковистой шерстью и добрым нравом. Отлично уживается с детьми и другими питомцами. Идеальный компаньон для семьи.',
            photos: [
                'images/puppies/luna-1.jpg',
                'images/puppies/luna-2.jpg',
                'images/puppies/luna-3.jpg',
            ],
        },
        baron: {
            name: 'Барон', breed: 'Мопс', age: '1.5 месяца', gender: 'Мальчик',
            color: 'Фавновый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '210 000 ₽',
            desc: 'Харизматичный и смелый — настоящий маленький лидер. Унаследовал живой темперамент терьера и уравновешенность мопса. Уже знает базовые команды.',
            photos: [
                'images/puppies/baron-1.jpg',
                'images/puppies/baron-2.jpg',
                'images/puppies/baron-3.jpg',
            ],
        },
        snezhok: {
            name: 'Снежок', breed: 'Мопс', age: '2 месяца', gender: 'Мальчик',
            color: 'Мерль (чёрно-белый)', docs: 'РКФ / FCI', vax: 'Сделаны', price: '175 000 ₽',
            desc: 'Редкий светлый окрас и мягкий сбалансированный темперамент. Очень дружелюбен, отлично ладит с детьми любого возраста. Легко поддаётся дрессировке.',
            photos: [
                'images/puppies/snezhok-1.jpg',
                'images/puppies/snezhok-2.jpg',
                'images/puppies/snezhok-3.jpg',
            ],
        },
        vikont: {
            name: 'Виконт', breed: 'Мопс', age: '2.5 месяца', gender: 'Мальчик',
            color: 'Чёрный', docs: 'РКФ / FCI', vax: 'Сделаны', price: '290 000 ₽',
            desc: 'Сын чемпиона России 2023 года. Перспективный кандидат для племенного разведения и выставочной карьеры. Идеальный экстерьер, выдающаяся родословная.',
            photos: [
                'images/puppies/vikont-1.jpg',
                'images/puppies/vikont-2.jpg',
                'images/puppies/vikont-3.jpg',
            ],
        },
        magnolia: {
            name: 'Магнолия', breed: 'Мопс', age: '3 месяца', gender: 'Девочка',
            color: 'Фавново-рыжий', docs: 'РКФ / FCI', vax: 'Сделаны', price: '265 000 ₽',
            desc: 'Девочка с исключительно редким крем-соболиным окрасом. Изящная, грациозная, с выдающейся родословной с обеих сторон. Победительница в классе щенков.',
            photos: [
                'images/puppies/magnolia-1.jpg',
                'images/puppies/magnolia-2.jpg',
                'images/puppies/magnolia-3.jpg',
            ],
        },
        zefir: {
            name: 'Зефир', breed: 'Мопс', age: '1.5 месяца', gender: 'Мальчик',
            color: 'Тёмно-фавновый', docs: 'РКФ / FCI', vax: 'Сделаны', price: '160 000 ₽',
            desc: 'Спокойный, ласковый и очень понятливый малыш. Начал осваивать команды ещё в питомнике. Мягкий характер. Подойдёт первичным владельцам.',
            photos: [
                'images/puppies/zefir-1.jpg',
                'images/puppies/zefir-2.jpg',
                'images/puppies/zefir-3.jpg',
            ],
        },
    };

    /* ===== RENDER CARDS ===== */
    function renderCards() {
        const grid = document.getElementById('dogsGrid');
        grid.innerHTML = '';

        Object.entries(puppies).forEach(([id, p], index) => {
            const dotsHtml = p.photos.length > 1
                ? `<div class="card-dots">${p.photos.map((_, i) => `<span class="card-dot${i === 0 ? ' active' : ''}"></span>`).join('')}</div>`
                : '';

            const card = document.createElement('div');
            card.className = 'dog-card';
            card.style.cssText = `animation:cardIn .6s ${index * .08}s ease both;opacity:0;animation-fill-mode:forwards;`;
            card.innerHTML = `
                <div class="card-gallery" data-id="${id}" data-index="0">
                    <img src="${p.photos[0]}" alt="${p.name}">
                    ${p.photos.length > 1 ? `
                    <button class="card-arrow card-arrow-l" onclick="cardShift(event,'${id}',-1)">&#8592;</button>
                    <button class="card-arrow card-arrow-r" onclick="cardShift(event,'${id}',1)">&#8594;</button>
                    ${dotsHtml}` : ''}
                </div>
                <div class="dog-info">
                    <span>${p.breed}</span>
                    <h3>${p.name}</h3>
                    <p>${p.desc.slice(0, 70)}…</p>
                    <div class="dog-bottom">
                        <strong>${p.price}</strong>
                        <button class="ripple-btn" onclick="openPuppyModal('${id}')">Подробнее</button>
                    </div>
                </div>`;
            grid.appendChild(card);
        });

        grid.querySelectorAll('.ripple-btn').forEach(btn => {
            if (window.attachRipple) window.attachRipple(btn);
        });

        grid.querySelectorAll('.dog-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width  - .5;
                const y = (e.clientY - rect.top)  / rect.height - .5;
                card.style.transform = `translateY(-10px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) scale(1.01)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    /* ===== CARD GALLERY ARROWS ===== */
    window.cardShift = function (e, id, dir) {
        e.stopPropagation();
        const wrap = document.querySelector(`.card-gallery[data-id="${id}"]`);
        const p    = puppies[id];
        let idx    = parseInt(wrap.dataset.index) + dir;
        if (idx < 0) idx = p.photos.length - 1;
        if (idx >= p.photos.length) idx = 0;
        wrap.dataset.index = idx;

        const existing = wrap.querySelector('img');
        const newImg = document.createElement('img');
        newImg.src = p.photos[idx];
        newImg.alt = p.name;
        newImg.classList.add('slide-in');
        wrap.insertBefore(newImg, wrap.firstChild);
        if (existing) existing.remove();
        wrap.querySelectorAll('.card-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    /* ===== PUPPY MODAL ===== */
    let currentGalleryIndex = 0;
    let currentPhotos = [];

    window.openPuppyModal = function (id) {
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

        currentPhotos.forEach((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slide.innerHTML = `<img src="${src}" alt="">`;
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

    window.galleryShift = function (dir) {
        currentGalleryIndex += dir;
        if (currentGalleryIndex < 0) currentGalleryIndex = currentPhotos.length - 1;
        if (currentGalleryIndex >= currentPhotos.length) currentGalleryIndex = 0;
        updateGallery();
    };

    function goToSlide(i) { currentGalleryIndex = i; updateGallery(); }

    function updateGallery() {
        document.getElementById('galleryTrack').style.transform = `translateX(-${currentGalleryIndex * 100}%)`;
        document.querySelectorAll('.gallery-dot').forEach((d, i) => d.classList.toggle('active', i === currentGalleryIndex));
    }

    window.closePuppyModal = function () {
        document.getElementById('puppyModal').classList.remove('show');
        document.body.style.overflow = '';
    };

    document.getElementById('puppyModal').addEventListener('click', function (e) {
        if (e.target === this) closePuppyModal();
    });

    /* ===== VIEWS ===== */
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

    /* ===== FORM SUBMIT ===== */
    window.submitForm = async function () {
        const name    = document.getElementById('fName').value.trim();
        const phone   = document.getElementById('fPhone').value.trim();
        const comment = document.getElementById('fComment').value.trim();
        const contact = document.querySelector('.pill.active')?.dataset.val || 'Телефон';
        const puppy   = document.getElementById('modalName')?.textContent || '';

        if (!name) { showFieldError('fName', 'Пожалуйста, введите ваше имя'); return; }

        const phoneClean = phone.replace(/\D/g, '');
        if (!phoneClean || phoneClean.length < 10) {
            showFieldError('fPhone', 'Введите корректный номер телефона'); return;
        }
        const phoneValid = /^[78]\d{10}$/.test(phoneClean) || /^\d{10}$/.test(phoneClean);
        if (!phoneValid) {
            showFieldError('fPhone', 'Введите корректный номер (+7 xxx xxx-xx-xx)'); return;
        }

        const digits   = phoneClean.length === 11 ? phoneClean : '7' + phoneClean;
        const phoneFmt = `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;

        const BOT_TOKEN = '8954514301:AAFtljRmDGAT81VRzlXvVz_VwAoEcoWxrYE';
        const CHAT_ID   = '1011797614';
        const text = [
            '🐾 <b>Новая заявка на щенка</b>', '',
            `🐶 <b>Щенок:</b> ${puppy}`,
            `👤 <b>Имя:</b> ${name}`,
            `📞 <b>Телефон:</b> ${phoneFmt}`,
            `💬 <b>Способ связи:</b> ${contact}`,
            comment ? `📝 <b>Комментарий:</b> ${comment}` : '',
        ].filter(Boolean).join('\n');

        const btn = document.querySelector('.submit-btn');
        if (btn) { btn.disabled = true; btn.textContent = 'Отправляем...'; }

        try {
            const res  = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
            });
            const data = await res.json();
            if (!data.ok) throw new Error(data.description);
            document.getElementById('successName').textContent = puppy;
            showView('success');
        } catch (e) {
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
        el.style.boxShadow   = '0 0 0 3px rgba(224,82,82,.2)';
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
            el.style.boxShadow   = '';
            if (err) err.remove();
            el.removeEventListener('input', clear);
        }, { once: true });
    }

    renderCards();
})();
