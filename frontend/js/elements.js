import { localStorageRemove, localStorageGet } from "./utils.js";

const user = localStorageGet("user");

export const nav = `
<style>
.layout {
    display: flex;
    height: 100vh;
}

.sidebar {
    width: 260px;
    background: #1e1e1e;
    border-right: 1px solid #333;
    display: flex;
    flex-direction: column;
    color: #fff;
    transition: transform 0.3s ease;
    z-index: 999;
}

.sidebar-header {
    z-index: 999;
    padding: 24px;
    border-bottom: 1px solid #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sidebar-header h1 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
}

.menu-toggle:hover {
    background: #333;
}

.sidebar-nav {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 999;
}

.nav-btn,
.new-ticket-btn,
.logout-btn {
    width: 85%;
    padding: 12px 15px;
    border: none;
    background: none;
    z-index: 999;
    color: #fff;
    text-align: left;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 15px;
    transition: 0.2s;
    background: #333;
    transform: scale(1.05);
}

.nav-btn.active {
    background: #3a3a3a;
    color: #fff;
}

.new-ticket-btn {
    background: #007bff;
    color: white;
}

.new-ticket-btn:hover {
    background: #0069d9;
}

.sidebar-footer {
    z-index: 999;
    padding: 20px;
    border-top: 1px solid #333;
}

.icon,
i {
    width: 20px;
    height: 20px;
    font-size: 18px;
}

.sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.hamburger-btn {
    display: none;
    position: fixed;
    top: 10px;
    left: 85%;
    width: 50px;
    height: 50px;
    z-index: 999;
    background: #007bff;
    border: none;
    color: white;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

/* Responsive */
@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 999;
        transform: translateX(-100%);
    }

    .sidebar.active {
        transform: translateX(0);
    }

    .sidebar-overlay.active {
        display: block;
        height: 100vh;
        width: 100vw;
    }

    .menu-toggle {
        display: block;
    }

    .hamburger-btn {
        display: block;
    }

    .nav-btn,
    .new-ticket-btn,
    .logout-btn {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .sidebar {
        width: 240px;
    }

    .sidebar-header {
        padding: 16px;
    }

    .sidebar-header h1 {
        font-size: 18px;
    }

    .sidebar-nav {
   
        padding: 15px;
        gap: 8px;
    }

    .nav-btn,
    .new-ticket-btn,
    .logout-btn {
        padding: 10px 12px;
        font-size: 14px;
    }

    .icon,
    i {
        width: 18px;
        height: 18px;
        font-size: 16px;
    }
}
</style>

<div class="sidebar-overlay" id="sidebarOverlay"></div>

<button class="hamburger-btn" id="hamburgerBtn">
</button>

<div class="sidebar-header">
    <h1>Helpdesk</h1>
    <button class="menu-toggle" id="menuToggle">
        
    </button>
</div>

<nav class="sidebar-nav">

    <a href="../views/dashboard.html" class="nav-btn">
        <span class="icon"><i data-lucide="home"></i></span> Home
    </a>

    <a href="../views/listTickets.html" class="nav-btn">
        <span class="icon"><i data-lucide="ticket"></i></span> Tickets
    </a>


    ${user.role === "admin" ? `<a href="../views/listUsers.html" class="nav-btn">
        <span class="icon"><i data-lucide="user"></i></span> Usuarios
    </a>` : ""}

</nav>

<div class="sidebar-footer">
    <button id="logoutBtn" class="logout-btn" type="button">
        <span class="icon"><i data-lucide="log-out"></i></span>
        Cerrar Sesión
    </button>
</div>

`;

export function initSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const menuToggle = document.getElementById("menuToggle");
    const hamburgerBtn = document.getElementById("hamburgerBtn");

    function toggleSidebar(e) {
        if (e) e.preventDefault();
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", toggleSidebar);
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", toggleSidebar);
    }

    if (overlay) {
        overlay.addEventListener("click", toggleSidebar);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorageRemove("user");
            window.location.href = "/frontend/views/Login.html";
        });
    }
    const navLinks = document.querySelectorAll(".nav-btn");
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove("active");
                overlay.classList.remove("active");
            }
        });
    });
}

export const modalTicket = `
<style>
.modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-overlay.active {
    display: flex;
}

.modal {
    background: white;
    border-radius: 12px;
    padding: 32px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal h2 {
    margin: 0 0 12px;
    font-size: 24px;
}

.modal p {
    margin: 0 0 24px;
    font-size: 14px;
    color: #555;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 6px;
}

input,
textarea,
select {
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #ddd;
    font-size: 14px;
    box-sizing: border-box;
}

textarea {
    resize: vertical;
}

.two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.btn {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.btn-cancel {
    background: #eee;
}

.btn-submit {
    background: #007bff;
    color: white;
}

</style>

<div class="modal-overlay" id="ticketModalOverlay">
    <div class="modal">
        <h2>Crear Nuevo Ticket</h2>
        <p>Completa el formulario para crear un nuevo ticket de soporte.</p>

        <form id="ticketForm">
            <div class="form-group">
                <label for="ticketTitle">Título</label>
                <input id="ticketTitle" type="text" required>
            </div>

            <div class="form-group">
                <label for="ticketDescription">Descripción</label>
                <textarea id="ticketDescription" rows="4" required></textarea>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-cancel" id="cancelTicketBtn">Cancelar</button>
                <button type="submit" class="btn btn-submit">Crear Ticket</button>
            </div>
        </form>
    </div>
</div>
`;


export function openTicketModal() {
    document.querySelector("#ticketModalOverlay")?.classList.add("active");
}

export function closeTicketModal() {
    document.querySelector("#ticketModalOverlay")?.classList.remove("active");
}
export function initTicketModal() {
    const modal = document.querySelector("#ticketModalOverlay");
    const cancelBtn = document.querySelector("#cancelTicketBtn");
    const form = document.querySelector("#ticketForm");

    // Cerrar al hacer clic fuera del modal
    modal?.addEventListener("click", (e) => {
        if (e.target === modal) closeTicketModal();
    });

    // Botón cancelar
    cancelBtn?.addEventListener("click", closeTicketModal);

    // Submit
    form?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            title: form.querySelector("#ticketTitle").value.trim(),
            description: form.querySelector("#ticketDescription").value.trim(),
            status: "pending",
            user_id: localStorageGet("user")?.id ?? null,
        };

        if (!data.title || !data.description) {
            alert("Completa todos los campos.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/ticket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Error en el servidor");
            }

            const result = await response.json();
            console.log("Ticket creado:", result);

            alert("Ticket creado correctamente");

        } catch (err) {
            console.error(err);
            alert("Error al crear el ticket");
        }

        form.reset();
        closeTicketModal();
    });
}
