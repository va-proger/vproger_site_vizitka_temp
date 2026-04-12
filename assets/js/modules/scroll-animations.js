import { throttle } from "../core/utils.js";
import { $$ } from "../core/dom.js";

export function initScrollAnimations() {
    const items = $$("section");
    if (!items.length) {
        return;
    }

    const show = throttle(() => {
        items.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            // Показываем секцию, если она видна в viewport
            if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
                sec.classList.add("fade-in");
            }
        });
    }, 100);

    // Проверяем сразу при загрузке
    show();
    // И при прокрутке
    window.addEventListener("scroll", show, { passive: true });
}
