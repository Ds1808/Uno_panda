<script setup>
import Logo from "../components/logo.vue";
</script>

<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center px-3"
  >
    <Logo class="row logo-container mb-4" />

    <div class="d-grid gap-3 w-100" style="max-width: 300px">
      <button class="btn btn-outline-danger btn-lg">Crear sala</button>
      <button class="btn btn-outline-primary btn-lg">Unirse a sala</button>
    </div>

    <button class="btn btn-dark mt-5 px-4 py-2">Cerrar sesión</button>
  </div>
</template>

<style scoped>
.logo-container {
  width: 40%;
}
</style>
