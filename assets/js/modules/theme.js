import {storage} from "../core/storage.js";

export function initTheme() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    const saved = storage.get("theme", "dark");

    if (saved === "light") {
        document.body.classList.add("light");
    }

    updateThemeIcon();

    btn.addEventListener("click", () => {
        document.body.classList.toggle("light");
        const mode = document.body.classList.contains("light") ? "light" : "dark";
        storage.set("theme", mode);
        updateThemeIcon();
    });
}

function updateThemeIcon() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    const isLight = document.body.classList.contains("light");
    btn.textContent = isLight ? "☀️" : "🌙";
}
