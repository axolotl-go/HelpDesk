import { nav, initSidebar } from "./elements.js";
import { $, fetchApi } from "./utils.js";

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
