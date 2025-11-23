const analises = [
    { id: 1, status: "aprovado" },
    { id: 2, status: "reprovado" },
    { id: 3, status: "pendente" },
    { id: 4, status: "aprovado" },
    { id: 5, status: "reprovado" },
    { id: 6, status: "pendente" }
];

const historyList = document.getElementById("history-list");
const noData = document.getElementById("no-data");
const filterBtns = document.querySelectorAll(".filter-btn");

function getQueryStatus() {
    const params = new URLSearchParams(window.location.search);
    return params.get("status") || "all";
}

function renderCards(statusFilter = "all") {
    historyList.innerHTML = "";
    const filtered = analises.filter(a => statusFilter === "all" || a.status === statusFilter);

    if (filtered.length === 0) {
        noData.style.display = "block";
        return;
    } else {
        noData.style.display = "none";
    }

    filtered.forEach(analise => {
        const col = document.createElement("div");
        col.className = "col-md-3";

        const link = document.createElement("a");
        link.href = `analise_detalhe.html?id=${analise.id}`;

        const card = document.createElement("div");
        card.className = "history-box";

        let statusClass = "";
        if (analise.status === "aprovado") statusClass = "status-aprovado";
        if (analise.status === "reprovado") statusClass = "status-reprovado";
        if (analise.status === "pendente") statusClass = "status-pendente";

        card.innerHTML = `
            <h5>Análise #${analise.id}</h5>
            <span class="${statusClass}">${analise.status.charAt(0).toUpperCase() + analise.status.slice(1)}</span>
        `;

        link.appendChild(card);
        col.appendChild(link);
        historyList.appendChild(col);
    });
}

const statusQuery = getQueryStatus();
filterBtns.forEach(b => {
    b.classList.remove("active");
    if (b.dataset.status === statusQuery) b.classList.add("active");
});
renderCards(statusQuery);


filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderCards(btn.dataset.status);
    });
});
