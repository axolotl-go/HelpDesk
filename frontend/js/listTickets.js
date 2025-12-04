import { nav, initSidebar } from "./elements.js";
import { $, fetchApiPost, formatTime, localStorageGet } from "./utils.js";
import { API_URL } from "./api.js";

$("nav").innerHTML = nav;
initSidebar();

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

const res = await fetchApiPost(API_URL + "/getTicketsByRole", {
    role: user.role,
    user_id: user.id,
});

if (res?.tickets?.length > 0) {
    const ticketsContainer = $("ticketsContainer");

    res.tickets.forEach((ticket) => {
        const ticketElement = document.createElement("a");
        ticketElement.classList.add("ticket");
        ticketElement.href = `/frontend/views/Ticket.html?id=${ticket.id}`;
        ticketElement.innerHTML = `
        <div class="ticket-left">
                      <div class="labels">
                          <span class="ticket-id">TKT-${ticket.id}</span>
                          <span class="status ${ticket.status}">${
            ticket.status
        }</span>
                      </div>
                      <h3>${ticket.title}</h3>
                      <p>${ticket.description}</p>
                  </div>
                  <div class="ticket-right">
                      <div class="time">
                          <i data-lucide="clock"></i>
                          <span>${formatTime(ticket.created_at)}</span>
                      </div>
                      <div class="avatar">
                          <span>${ticket.user?.name || ""}</span>
                      </div>
                  </div>`;
        ticketsContainer.appendChild(ticketElement);
    });
}
