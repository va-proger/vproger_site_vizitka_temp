import { $$ } from "../core/dom.js";

export function initActivePage() {
    const page = document.body.dataset.page;
    if (!page) return;

    $$(`.nav-links a[data-page]`).forEach(a => {
        if (a.dataset.page === page) {
            a.classList.add("active");
        }
    });
}
