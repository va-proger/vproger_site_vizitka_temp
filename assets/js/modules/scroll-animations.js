import { throttle } from "../core/utils.js";
import { $$ } from "../core/dom.js";

export function initScrollAnimations() {
    const items = $$("section");
    if (!items.length) return;

    const show = throttle(() => {
        items.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                sec.classList.add("fade-in");
            }
        });
    }, 100);

    show();
    window.addEventListener("scroll", show);
}
