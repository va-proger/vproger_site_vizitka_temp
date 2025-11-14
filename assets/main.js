// === 🌗 Тема ===
const btn = document.getElementById('themeToggle');

function updateThemeIcon() {
    const isLight = document.body.classList.contains('light');
    btn.textContent = isLight ? '☀️' : '🌙';
    btn.title = isLight ? 'Включить тёмную тему' : 'Включить светлую тему';
}

function toggleTheme() {
    document.body.classList.toggle('light');
    const current = document.body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', current);
    updateThemeIcon();
}

btn?.addEventListener('click', toggleTheme);

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.add('light');
updateThemeIcon();


// === 💬 Typed эффект ===
const roles = [
    "Разрабатываю Laravel + Vue FullStack проекты ⚙️",
    "Собираю UI на Tailwind + SCSS 🎨",
    "Пишу Django-сервисы с React 🌐",
    "Работаю над калькулятором септиков 💧"
];

const el = document.getElementById("typing");

function fitTyping() {
    if (!el) return;

    let size = 18;
    el.style.fontSize = size + "px";

    while (el.scrollWidth > el.clientWidth && size > 12) {
        size--;
        el.style.fontSize = size + "px";
    }
}

if (el) {
    let i = 0;

    // первоначальная настройка
    el.textContent = roles[0];
    fitTyping();

    setInterval(() => {
        el.textContent = roles[i];
        i = (i + 1) % roles.length;
        fitTyping();
    }, 3000);
}


// === 🎞 Анимация появления секций ===
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll("section").forEach(sec => observer.observe(sec));
});


// === 💻 GitHub проекты (из JSON) ===
async function loadLocalProjects() {
    const container = document.getElementById('repoList');
    if (!container) return;

    try {
        const response = await fetch('assets/projects.json');
        if (!response.ok) throw new Error("Ошибка загрузки JSON");
        const projects = await response.json();

        container.innerHTML = projects.map(p => `
      <a href="${p.url}" target="_blank" class="repo-card">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="tech">
          ${p.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </a>
    `).join('');
    } catch (err) {
        console.error(err);
        container.innerHTML = `<p>Не удалось загрузить проекты 😢</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadLocalProjects);


// === 🖼️ Модалка сертификатов ===
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("certModal");
    if (!modal) return;

    const modalImg = document.getElementById("modalImg");
    const closeBtn = modal.querySelector(".modal-close");

    document.querySelectorAll(".cert-thumb").forEach(img => {
        img.addEventListener("click", () => {
            modalImg.src = img.dataset.full;
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // блокируем скролл
        });
    });

    const closeModal = () => {
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
            modal.style.opacity = "1";
            document.body.style.overflow = ""; // возвращаем скролл
        }, 200);
    };

    closeBtn?.addEventListener("click", closeModal);
    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.style.display === "flex") closeModal();
    });

});
// === 🍪 Cookie Consent ===
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("cookieModal");
    if (!modal) return;

    const acceptBtn = document.getElementById("acceptCookies");

    const consent = localStorage.getItem("cookieConsent");

    // показываем модалку, если пользователь ещё не выбрал
    if (!consent) {
        setTimeout(() => modal.classList.add("show"), 800);
    }

    const hideModal = () => modal.classList.remove("show");

    acceptBtn?.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "accepted");
        hideModal();
        enableAnalytics(); // ← подключаем GA только после согласия
    });


});
// SHARE WIDGET
document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.getElementById("shareToggle");
    const panel  = document.getElementById("sharePanel");

    toggle.addEventListener("click", () => {
        panel.classList.toggle("active");
    });

    const SHARE_DATA = {
        title:  document.querySelector("meta[property='og:title']")?.content || document.title,
        desc:   document.querySelector("meta[name='description']")?.content || "",
        url:    document.querySelector("link[rel='canonical']")?.href || window.location.href
    };

    const shareLinks = {
        vk:      `https://vk.com/share.php?url=${SHARE_DATA.url}&title=${SHARE_DATA.title}`,
        telegram:`https://t.me/share/url?url=${SHARE_DATA.url}&text=${SHARE_DATA.title}%0A${SHARE_DATA.desc}`,
        whatsapp:`https://wa.me/?text=${SHARE_DATA.title}%20${SHARE_DATA.url}`,
        facebook:`https://www.facebook.com/sharer/sharer.php?u=${SHARE_DATA.url}`,
        twitter: `https://twitter.com/intent/tweet?url=${SHARE_DATA.url}&text=${SHARE_DATA.title}`,
        email:   `mailto:?subject=${SHARE_DATA.title}&body=${SHARE_DATA.url}`
    };

    panel.querySelectorAll("[data-share]").forEach(el => {
        el.addEventListener("click", () => {
            const type = el.dataset.share;
            const link = shareLinks[type];
            window.open(link, "_blank", "width=600,height=500");
        });
    });
});
