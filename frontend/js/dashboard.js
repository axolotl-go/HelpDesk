import { API_URL } from "./api.js";
import {
    $,
    fetchApi,
    fetchApiPost,
    localStorageGet,
    localStorageRemove,
    createCard,
} from "./utils.js";
import { nav, initSidebar } from "./elements.js";

$("nav").innerHTML = nav;
initSidebar();
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
    user_id: user.id,
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

// graficos

const graph = await fetchApi(API_URL + "/graph");
console.log(graph);

const totalTickets = $("totalTickets");
const completedTickets = $("completedTickets");
const pendingTickets = $("pendingTickets");

if (graph) {
    totalTickets.textContent = graph.all;
    completedTickets.textContent = graph.completed;
    pendingTickets.textContent = graph.pending;
}
