<script setup>
import Logo from '../components/logo.vue'
</script>

<template>
    <main class="container justify-content-center align-items-center d-flex flex-column" style="height: 100vh;">
        <div class="row logo-container mb-4">
            <Logo />
        </div>
        <div class="row">
            <div class="col-md-5 d-grid w-50">
                <button type="submit" class="btn btn-dark">Iniciar sesión</button>
            </div>
            <div class="col-md-5 d-grid w-50">
                <button type="submit" class="btn btn-dark">Registrarse</button>
            </div>
        </div>
    </main>
</template>

<style>
.logo-container {
    width: 40%;
}
</style>