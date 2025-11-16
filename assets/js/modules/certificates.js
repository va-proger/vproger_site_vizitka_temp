import { $ } from "../core/dom.js";
import { storage } from "../core/storage.js";
import { debounce } from "../core/utils.js";

export function initCertificates() {
    const grid = $("#certGrid");
    const modal = $("#certModal");
    const modalImg = $("#modalImg");
    const modalTitle = $("#modalTitle");
    const modalDate = $("#modalDate");
    const filterButtons = document.querySelectorAll(".cert-filter button");

    if (!grid || !modal) return;

    let certs = [];

    // === Load JSON safely ===
    async function loadJSON() {
        try {
            const res = await fetch("assets/certs/data.json", { cache: "no-store" });
            if (!res.ok) throw new Error("Ошибка ответа сервера");
            return await res.json();
        } catch (e) {
            console.error("Ошибка загрузки сертификатов:", e);
            grid.innerHTML = `<p class="error">Не удалось загрузить сертификаты 😢</p>`;
            return [];
        }
    }

    // === Render grid ===
    function render(category = "all") {
        grid.innerHTML = "";

        certs
            .filter(cert => category === "all" || cert.category === category)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(cert => {
                const item = document.createElement("div");
                item.className = "cert-item";
                item.dataset.file = cert.file;

                item.innerHTML = `
                    <img 
                        src="assets/certs/${cert.file}" 
                        loading="lazy"
                        class="cert-thumb"
                        alt="${cert.title}"
                    >
                    <div class="cert-text">
                        <p class="cert-title">${cert.title}</p>
                        <span class="cert-date">${formatDate(cert.date)}</span>
                    </div>
                `;

                item.addEventListener("click", () => openModal(cert));

                grid.appendChild(item);
            });
    }

    let lastFocused = null;

    function openModal(cert) {
        lastFocused = document.activeElement;

        modalImg.src = `assets/certs/${cert.file}`;
        modalTitle.textContent = cert.title;
        modalDate.textContent = formatDate(cert.date);

        modal.classList.add("active");

        modal.removeAttribute("aria-hidden");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("role", "dialog");

        document.body.style.overflow = "hidden";

        // фокус только после всех aria
        document.querySelector(".modal-close")?.focus();
    }

    function closeModal() {
        // 1) Убиваем фокус, чтобы он не оставался в скрытой модалке
        document.activeElement?.blur();

        // 2) Прячем модалку
        modal.classList.remove("active");

        // 3) Возвращаем aria атрибуты
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");

        // 4) Возвращаем скролл странице
        document.body.style.overflow = "";

        // 5) (необязательно) возвращаем фокус на элемент, который был активен
        if (lastFocused) {
            setTimeout(() => lastFocused.focus(), 0);
        }
    }

    // Esc
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeModal();
    });

    // Close overlay
    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });

    $(".modal-close")?.addEventListener("click", closeModal);

    // === Filters ===
    filterButtons.forEach(btn => {
        btn.addEventListener(
            "click",
            debounce(() => {
                document.querySelector(".cert-filter .active")?.classList.remove("active");
                btn.classList.add("active");
                render(btn.dataset.category);
            }, 150)
        );
    });

    // === Init ===
    loadJSON().then(data => {
        certs = data || [];
        render();
    });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("ru-RU");
}
