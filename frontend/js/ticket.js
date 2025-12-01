import { nav } from "./elements.js";
import { $, fetchApi, fetchApiPut, formatTime } from "./utils.js";
import { API_URL } from "./api.js";

const ticketId = $("ticketId");
const ticketTitle = $("ticketTitle");
const ticketDescription = $("ticketDescription");
const ticketStatus = $("ticketStatus");
const ticketUserName = $("ticketUserName");
const status = $("status");

$("nav").innerHTML = nav;

if (window.lucide) {
    lucide.createIcons();
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    console.error("ID de ticket no encontrado en la URL");
}

const ticket = await fetchApi(API_URL + "/ticket/" + id);

if (ticket) {
    ticketId.textContent =
        "TKT-" + ticket.id + " / " + formatTime(ticket.updated_at);
    ticketTitle.textContent = ticket.title;
    ticketDescription.textContent = ticket.description;
    ticketStatus.textContent = ticket.status;
    ticketUserName.textContent = ticket.user.name + " / " + ticket.user.email;
}

const closeTicket = async (e) => {
    e.preventDefault();

    const response = await fetchApiPut(API_URL + "/ticket/" + id, {
        status: "completed",
    });

    console.log(response);

    if (response) {
        window.location.href = "../views/dashboard.html";
    }
};

if (ticket.status === "completed") {
    status.classList.add("completed");
}

$("closeTicket").addEventListener("click", closeTicket);
