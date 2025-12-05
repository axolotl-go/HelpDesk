import { $, fetchApi, fetchApiPut } from "./utils.js";
import { API_URL } from "./api.js";
import { nav } from "./elements.js";

const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

if (!userId) {
    alert("No se proporcionó un ID de usuario");
    window.location.href = "../views/listUsers.html";
    throw new Error("No ID provided");
}

const navElement = $("nav");
if (navElement) navElement.innerHTML = nav;

const editForm = $("editUserForm");
const nameInput = $("name");
const phoneInput = $("phone");
const emailInput = $("email");
const roleSelect = $("role");

const loadUserData = async () => {
    try {
        const res = await fetchApi(API_URL + "/user/" + userId);
        
        if (!res?.user) {
            alert("Usuario no encontrado");
            window.location.href = "../views/listUsers.html";
            return;
        }

        const user = res.user;
        nameInput.value = user.name || "";
        phoneInput.value = user.phone || "";
        emailInput.value = user.email || "";
        roleSelect.value = user.role || "client";
        
    } catch (error) {
        console.error("Error cargando usuario:", error);
        alert("Error al cargar los datos del usuario");
    }
};

await loadUserData();

editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        role: roleSelect.value,
    };

    const submitBtn = editForm.querySelector("button[type='submit']");
    const originalText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = "Guardando...";

    try {
        const res = await fetchApiPut(`${API_URL}/user/${userId}`, body);

        if (res?.success || res?.user) {
             window.location.href = `../views/listUsers.html`; 
        } else {
            alert("No se pudo actualizar: " + (res?.message || "Error desconocido"));
        }
    } catch (error) {
        console.error(error);
        alert("Error de red al actualizar usuario");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
    }
});

if (window.lucide) {
    lucide.createIcons();
}