export const $ = (id) => document.getElementById(id);
export const $$ = (selector) => document.querySelectorAll(selector);

export const fetchApi = async (url) => {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchApiPost = async (url, body) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchApiPut = async (url, body) => {
    try {
        const res = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchApiDelete = async (url) => {
    try {
        const res = await fetch(url, {
            method: "DELETE",
        });

        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const localStorageSet = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const localStorageGet = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const localStorageRemove = (key) => {
    localStorage.removeItem(key);
};

export const formatTime = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diff = Math.floor((now - created) / 1000 / 60);

    if (diff < 1) return "Justo ahora";
    if (diff < 60) return `Hace ${diff} min`;

    const hours = Math.floor(diff / 60);
    if (hours < 24) return `Hace ${hours} hrs`;

    const days = Math.floor(hours / 24);
    return `Hace ${days} días`;
};

export const createCard = (id, title, description, status, updated_at) => {
    const card = document.createElement("div");
    card.classList.add("ticket");
    card.id = id;

    card.innerHTML = `
        <div>
            <div class="ticket-header">
                <span class="ticket-id">TKT-${id}</span>
                <span class="status ${status.toLowerCase()}">${status}</span>
            </div>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
        <span class="ticket-time">${formatTime(updated_at)}</span>
    `;

    return card;
};
