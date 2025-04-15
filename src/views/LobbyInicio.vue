<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center px-3 sala"
  >
    <Logo class="row logo-container mb-4" />

    <div class="d-grid gap-3 w-25">
      <RouterLink to="/createGame" class="btn btn-danger btn-lg">Crear sala</RouterLink>
      <RouterLink to="/unirsePartida" class="btn btn-primary btn-lg">Unirse a sala</RouterLink>
    </div>

    <button
      class="btn btn-outline-warning fw-bold mt-5 px-4 py-2"
      @click="cerrarSesion"
    >
      Cerrar sesión
    </button>
  </div>
</template>

<script setup>
import Logo from "../components/logo.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import user1 from "@/assets/user1.png";
import user2 from "@/assets/user2.png";
import user3 from "@/assets/user3.png";
import user4 from "@/assets/user4.png";

import { auth } from "../firebase/config"; // Asegúrate de que la ruta sea correcta
import { createPlayer } from "../firebase/players"; // Asegúrate de que la ruta sea correcta

const router = useRouter();

// Función para cerrar sesión
const cerrarSesion = () => {
  console.log("Cerrando sesión...");
  router.push("/");
};

// Función para crear un jugador
const crearJugador = async (username, avatarUrl) => {
  const userId = auth.currentUser?.uid; // Obtén el UID del usuario autenticado

  if (!userId) {
    console.error("No se encontró un usuario autenticado.");
    return;
  }

  const result = await createPlayer(userId, username, avatarUrl);
  if (result.success) {
    console.log("Jugador creado con éxito:", result.player_id);
  } else {
    console.error("Error al crear jugador:", result.error);
  }
};

// Función para mostrar la alerta al ingresar
const mostrarAlerta = async () => {
  const savedUsername = localStorage.getItem("username") || "";
  const savedAvatar = localStorage.getItem("avatar") || "";

  const { value: formValues } = await Swal.fire({
    title: "UNO",
    html: `
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input id="username" class="swal2-input" placeholder="Username" value="${savedUsername}">
      </div>
      <div class="mb-3">
        <label for="avatar" class="form-label">Selecciona tu avatar</label>
        <div class="d-flex justify-content-around">
          <img src="${user1}" id="avatar1" class="avatar-option ${savedAvatar === "avatar1" ? "selected" : ""}" style="width: 50px; cursor: pointer;" onclick="selectAvatar('avatar1')">
          <img src="${user2}" id="avatar2" class="avatar-option ${savedAvatar === "avatar2" ? "selected" : ""}" style="width: 50px; cursor: pointer;" onclick="selectAvatar('avatar2')">
          <img src="${user3}" id="avatar3" class="avatar-option ${savedAvatar === "avatar3" ? "selected" : ""}" style="width: 50px; cursor: pointer;" onclick="selectAvatar('avatar3')">
          <img src="${user4}" id="avatar4" class="avatar-option ${savedAvatar === "avatar4" ? "selected" : ""}" style="width: 50px; cursor: pointer;" onclick="selectAvatar('avatar4')">
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    preConfirm: () => {
      const username = document.getElementById("username").value;
      const selectedAvatar = document.querySelector(".avatar-option.selected");
      if (!username || !selectedAvatar) {
        Swal.showValidationMessage("Por favor ingresa un nombre de usuario y selecciona un avatar.");
        return null;
      }
      return {
        username,
        avatar: selectedAvatar.id,
      };
    },
  });

  if (formValues) {
    // Guardar el nombre de usuario y el avatar en localStorage
    localStorage.setItem("username", formValues.username);
    localStorage.setItem("avatar", formValues.avatar);

    console.log("Usuario guardado en localStorage:", formValues.username);
    console.log("Avatar guardado en localStorage:", formValues.avatar);

    // Crear jugador después de guardar los datos
    const avatarUrl = getAvatarUrl(formValues.avatar);
    await crearJugador(formValues.username, avatarUrl);
  }
};

// Función para obtener la URL del avatar seleccionado
const getAvatarUrl = (avatarId) => {
  switch (avatarId) {
    case "avatar1":
      return user1;
    case "avatar2":
      return user2;
    case "avatar3":
      return user3;
    case "avatar4":
      return user4;
    default:
      return "";
  }
};

// Función para seleccionar un avatar
window.selectAvatar = (avatarId) => {
  // Eliminar la clase "selected" de todos los avatares
  document.querySelectorAll(".avatar-option").forEach((avatar) => {
    avatar.classList.remove("selected");
  });

  // Agregar la clase "selected" al avatar seleccionado
  const selectedAvatar = document.getElementById(avatarId);
  selectedAvatar.classList.add("selected");
};

// Agregar evento para mostrar la alerta al cargar la página
onMounted(() => {
  mostrarAlerta();
});
</script>

<style >
.logo-container {
  width: 15%;
}
.sala {
  background-color: #12122b;
}

.avatar-option {
  padding: 5px;
  border: 2px solid transparent;
  border-radius: 50%;
  transition: border-color 0.3s;
}

.avatar-option:hover {
  border-color: #ff0000;
}

.avatar-option.selected {
  border-color: #ff0000;
}
</style>