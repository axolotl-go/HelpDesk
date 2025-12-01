export const nav = `
    <div class="sidebar-header">
        <h1>Helpdesk</h1>
    </div>

    <nav class="sidebar-nav">
        <a class="nav-btn">
            <span class="icon">
                <i data-lucide="home"></i>
            </span>
            Home
        </a>

        <a href="../views/Ticket.html" class="nav-btn active"> <span class="icon">
                <i data-lucide="ticket"></i>
            </span>
            Tickets
        </a>

        <button class="new-ticket-btn">
            <span class="icon">
                <i data-lucide="plus"></i>
            </span>
            Nuevo Ticket
        </button>
    </nav>

    <div class="sidebar-footer">
        <button id="logoutBtn" class="logout-btn">
            <span class="icon">
                <i data-lucide="log-out"></i>
            </span>
            Cerrar Sesión
        </button>
    </div>
`;
