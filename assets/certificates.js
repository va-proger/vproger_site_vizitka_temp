async function loadCertificates() {
    const grid = document.getElementById("certGrid");
    const filterBtns = document.querySelectorAll(".cert-filter button");
    let certs = [];

    try {
        const res = await fetch("assets/certs/data.json");
        certs = await res.json();
    } catch (e) {
        grid.innerHTML = "<p>Ошибка загрузки сертификатов</p>";
        return;
    }

    function render(category = "all") {
        grid.innerHTML = "";

        certs
            .filter(c => category === "all" || c.category === category)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(cert => {
                const item = document.createElement("div");
                item.className = "cert-item";
                item.dataset.file = cert.file;
                item.dataset.title = cert.title;
                item.dataset.date = cert.date;

                item.innerHTML = `
                    <img src="assets/certs/${cert.file}" class="cert-thumb" alt="${cert.title}">
                    <p>${cert.title}</p>
                    <span class="cert-date">${formatDate(cert.date)}</span>
                `;

                item.addEventListener("click", () => openModal(cert));

                grid.appendChild(item);
            });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".cert-filter .active")?.classList.remove("active");
            btn.classList.add("active");
            render(btn.dataset.category);
        });
    });

    // === Modal ===
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDate = document.getElementById("modalDate");

    function openModal(cert) {
        modalImg.src = `assets/certs/${cert.file}`;
        modalTitle.textContent = cert.title;
        modalDate.textContent = formatDate(cert.date);

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    document.querySelector(".modal-close").onclick = closeModal;
    modal.onclick = e => { if (e.target === modal) closeModal(); };

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeModal();
    });

    render();
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("ru-RU");
}

document.addEventListener("DOMContentLoaded", loadCertificates);
