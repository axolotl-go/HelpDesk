import { fetchApiPost, $, localStorageGet, localStorageSet } from "./utils.js";
import { API_URL } from "./api.js";

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
