import { $, $$ } from "../core/dom.js";

export function initNav() {
    const toggle = $("#navToggle");
    const links  = $(".nav-links");

    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
        links.classList.toggle("open");
    });

    $$(".nav-links a").forEach(a => {
        a.addEventListener("click", () => {
            links.classList.remove("open");
        });
    });
}
