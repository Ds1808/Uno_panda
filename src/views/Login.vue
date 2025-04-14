<script setup>
import Logo from '../components/logo.vue'
</script>

<template>
    <main class="container justify-content-center align-items-center d-flex flex-column" style="height: 100vh;">
        <div class="row logo-container mb-4">
            <Logo />
        </div>
        <div class="row">
            <div class="col-md-6 mb-4 w-100">
                <label class="form-label">Nombre de usuario</label>
                <input type="text" class="form-control border-bottom border-4" v-model="name" />
            </div>
            <div class="col-md-6 mb-4 w-100">
                <label class="form-label">Correo electrónico</label>
                <input type="email" class="form-control border-bottom border-4" v-model="email" />
            </div>
            <div class="col-md-6 mb-4 w-100">
                <label class="form-label">Contraseña</label>
                <input type="password" class="form-control border-bottom border-4" v-model="password" />
            </div>
            <div class="text-center d-grid mb-0">
                <button type="submit" class="btn btn-dark">Registrarse</button>
            </div>
            <p class="text-center mb-0">
                ¿Ya tienes cuenta? <router-link to="/">Inicia sesión</router-link>
            </p>
        </div>
    </main>
</template>

<style>
.logo-container {
    width: 40%;
}
</style>