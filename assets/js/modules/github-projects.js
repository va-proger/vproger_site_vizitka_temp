import { $ } from "../core/dom.js";

export function initGithubProjects() {
    const container = $("#repoList");
    if (!container) return;

    fetch("assets/projects.json")
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(projects => {
            container.innerHTML = projects.map(p => `
                <a href="${p.url}" target="_blank" class="repo-card">
                    <h3>${p.name}</h3>
                    <p>${p.description}</p>
                    <div class="tech">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
                </a>
            `).join("");
        })
        .catch(() => {
            container.innerHTML = `<p>Не удалось загрузить данные 😢</p>`;
        });
}
