import { API_URL } from "./api.js";
import {
    $,
    fetchApiPost,
    localStorageGet,
    localStorageRemove,
    createCard,
} from "./utils.js";
import { nav } from "./elements.js";

$("nav").innerHTML = nav;
const logoutBtn = $("logoutBtn");
const welcome = $("welcome");
const ticketsCard = $("tickets-card");

if (window.lucide) {
    lucide.createIcons();
}
let user = localStorageGet("user");

try {
    user = typeof user === "string" ? JSON.parse(user) : user;
} catch (e) {
    console.error("Error parseando user:", e);
}

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

if (res?.tickets?.length > 0) {
    res.tickets.forEach((t) => {
        ticketsCard.appendChild(
            createCard(t.id, t.title, t.description, t.status, t.updated_at)
        );
    });
}

ticketsCard.addEventListener("click", (e) => {
    const card = e.target.closest(".ticket");
    if (!card) return;

    window.location.href = `/frontend/views/Ticket.html?id=${card.id}`;
});
