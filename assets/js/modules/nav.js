import { $, $$ } from "../core/dom.js";

export function initNav() {
    const toggle = $("#navToggle");
    const links  = $(".nav-links");
    if (!toggle || !links) return;

    // --- Открытие / закрытие ---
    toggle.addEventListener("click", (e) => {
        e.stopPropagation(); // защищаем от закрытия при клике

        const isOpen = toggle.classList.toggle("open");
        links.classList.toggle("open", isOpen);
    });

    // --- Клик по ссылкам закрывает меню ---
    $$(".nav-links a").forEach(a => {
        a.addEventListener("click", () => {
            toggle.classList.remove("open");
            links.classList.remove("open");
        });
    });

    // --- Закрытие при клике вне ---
    document.addEventListener("click", (e) => {
        if (!toggle.contains(e.target) && !links.contains(e.target)) {
            toggle.classList.remove("open");
            links.classList.remove("open");
        }
    });

    // --- Закрытие при скролле ---
    document.addEventListener("scroll", () => {
        toggle.classList.remove("open");
        links.classList.remove("open");
    }, { passive: true });
}
