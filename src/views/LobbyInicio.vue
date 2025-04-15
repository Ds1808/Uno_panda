<script setup>
import Logo from "../components/logo.vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const cerrarSesion = () => {
  console.log("Cerrando sesión...");
  router.push("/");
};
</script>

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
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const cerrarSesion = () => {
  console.log("Cerrando sesión...");
  router.push("/");
};
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
