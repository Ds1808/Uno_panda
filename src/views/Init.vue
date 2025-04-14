<script setup>
import { ref } from 'vue'
import Logo from '../components/logo.vue'
import FormLogin from '../components/Login/FormLogin.vue'
import FormRegister from '../components/Login/FormRegister.vue'

const showLogin = ref(true)

const toggleForm = () => {
    showLogin.value = !showLogin.value
}
</script>

<template>
    <main class="container justify-content-center align-items-center d-flex flex-column" style="height: 100vh;">
        <div class="row logo-container mb-4 mx-auto">
            <Logo />
        </div>
        <div class="row">
            <component :is="showLogin ? FormLogin : FormRegister" />
        </div>
        <div class="row mt-3">
            <button class="btn btn-primary" @click="toggleForm">
                {{ showLogin ? 'Registrarse' : 'Iniciar sesión' }}
            </button>
        </div>
    </main>
</template>

<style>
    .logo-container {
        width: 40%;
        max-width: 300px;
    }
</style>