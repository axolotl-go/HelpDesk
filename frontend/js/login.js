import { fetchApiPost, $, localStorageGet, localStorageSet } from "./utils.js";
import { API_URL } from "./api.js";

if (localStorageGet("user")) {
    window.location.href = "../views/dashboard.html";
}

$("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = {
        email: $("email").value,
        password: $("password").value,
    };

    const res = await fetchApiPost(API_URL + "/login", user);

    if (res?.status === 200) {
        localStorageSet("user", res?.user);
        window.location.href = "../views/dashboard.html";
    } else {
        alert("Credenciales incorrectas");
    }
});
