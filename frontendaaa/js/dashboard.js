import { API_URL } from "./api.js";
import {
    $,
    fetchApiPost,
    localStorageGet,
    localStorageRemove,
    createCard,
} from "./utils.js";

const logoutBtn = $("logoutBtn");
const welcome = $("welcome");
const ticketsCard = $("tickets-card");

const user = localStorageGet("user");

if (!user) {
    window.location.href = "/frontend/views/Login.html";
}

logoutBtn.addEventListener("click", () => {
    localStorageRemove("user");
    window.location.href = "/frontend/views/Login.html";
});

welcome.textContent = `Bienvenido ${user.name}`;

const res = await fetchApiPost(API_URL + "/getTicketsByRole", {
    role: user.role,
    id: user.id,
});

for (let i = 0; i < res.tickets.length; i++) {
    const t = res.tickets[i];

    ticketsCard.appendChild(
        createCard(t.id, t.title, t.description, t.status, t.updated_at)
    );
}

ticketsCard.addEventListener("click", (e) => {
    const card = e.target.closest(".ticket");

    if (!card) return;

    window.location.href = `/frontend/views/Ticket.html?id=${card.id}`;
});
