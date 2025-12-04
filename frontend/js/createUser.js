import { fetchApiPost, $, localStorageGet, localStorageSet } from "./utils.js";
import { API_URL } from "./api.js";

let user = localStorageGet("user");

try {
    user = typeof user === "string" ? JSON.parse(user) : user;
} catch (e) {
    console.error("Error parseando user:", e);
}

if (!user) {
    window.location.href = "/frontend/views/Login.html";
}

$("createUserForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const newUser = {
        name: $("name").value,
        email: $("email").value,
        phone: $("phone").value,
        password: $("password").value,
        role: "client",
    };

    const res = await fetchApiPost(API_URL + "/user", newUser);

    if (res?.status === 201) {
        alert("Usuario creado correctamente");
        localStorageSet("user", res?.user);
        window.location.href = "../views/dashboard.html";
    } else {
        alert("Error al crear el usuario");
    }
});
