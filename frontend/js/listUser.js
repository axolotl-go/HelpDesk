import { nav } from "./elements.js";
import { $, fetchApi, localStorageGet } from "./utils.js";
import { API_URL } from "./api.js";

$("nav").innerHTML = nav;


let user = localStorageGet("user");

try {
    user = typeof user === "string" ? JSON.parse(user) : user;
} catch (e) {
    console.error("Error parseando user:", e);
}

if (!user) {
    window.location.href = "/frontend/views/Login.html";
}

const res = await fetchApi(API_URL + "/users");

if (Array.isArray(res) && res.length > 0) {

    const usersGrid = $("usersGrid");

    res.forEach((user) => {
        const userCard = document.createElement("a");
        userCard.className = "user-card";
        userCard.href = `/frontend/views/User.html?id=${user.id}`;

        userCard.innerHTML = `
        <div class="user-top">
            <div>
                <h3>${user.name}</h3>
                <p>Tickets creados: ${user.createdTickets || 0}</p>
            </div>
        </div>

        <div class="info-row">
            <i data-lucide="mail"></i> ${user.email}
        </div>
        <div class="info-row">
            <i data-lucide="phone"></i> ${user.phone}
        </div>

        <div class="badges">
            <span class="badge ${user.role}">${user.role}</span>
        </div>
    `;

        usersGrid.appendChild(userCard);
    });
}

if (window.lucide) {
    lucide.createIcons();
}
