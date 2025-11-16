import { debounce } from "../core/utils.js";
import { $ } from "../core/dom.js";

export function initTyping() {
    const el = $("#typing");
    if (!el) return;

    const roles = [
        "Разрабатываю Laravel + Vue FullStack проекты ⚙️",
        "Собираю UI на Tailwind + SCSS 🎨",
        "Пишу Django-сервисы с React 🌐",
        "Работаю над калькулятором септиков 💧"
    ];

    let i = 0;

    const fit = debounce(() => {
        let size = 18;
        el.style.fontSize = size + "px";
        while (el.scrollWidth > el.clientWidth && size > 12) {
            size--;
            el.style.fontSize = size + "px";
        }
    }, 50);

    el.textContent = roles[i];
    fit();

    setInterval(() => {
        i = (i + 1) % roles.length;
        el.textContent = roles[i];
        fit();
    }, 3000);
}
