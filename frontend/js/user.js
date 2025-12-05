import { nav } from "./elements.js";
import { $, createCard, fetchApi, fetchApiDelete } from "./utils.js";
import { API_URL } from "./api.js";

// Cargar navegación
$("nav").innerHTML = nav;

if (window.lucide) {
    lucide.createIcons();
}

// Obtener el ID de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    console.error("ID no encontrado en la URL");
}

// Obtener el ticket / usuario
const data = await fetchApi(API_URL + "/user/" + id);

if (data) {
    // Coinciden con tu HTML
    $("userName").textContent = data.user?.name || "Sin nombre";
    $("userEmail").textContent = data.user?.email || "Sin correo";

    // Si luego agregas más datos, puedes mostrarlos aquí:
    if (data.user?.description) {
        $("ticketDescription").textContent = data.user?.description;
    }

    if (data.user?.role) {
        $("role").textContent = data.user?.role;
    }

    if (data.user?.phone) {
        $("phone").textContent = data.user?.phone;
    }
}

const deleteUser = async () => {
    const confirmDelete = confirm("¿Eliminar este usuario?");
    if (!confirmDelete) return;

    const response = await fetchApiDelete(API_URL + "/user/" + id);

    if (response) {
        window.location.href = "../views/listUsers.html";
    }
};

const editUser = () => {
    window.location.href = `../views/edit-user.html?id=${id}`;
};
$("deleteUserButton").addEventListener("click", deleteUser);
$("editUserButton").addEventListener("click", editUser);


// ticket

const ticketsContainer = $("tickets");

ticketsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("ticket")) {
        const ticketId = e.target.id;
        window.location.href = `../views/ticket.html?id=${ticketId}`;
    }
});

const res = await fetchApi(API_URL + "/user/" + id);

if (res?.tickets?.length > 0) {
    res.tickets.forEach((ticket) => {
        ticketsContainer.appendChild(
            createCard(ticket.id, ticket.title, ticket.description, ticket.status, ticket.created_at)
        );
    });
}
