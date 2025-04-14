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
    <main class="d-flex justify-content-center align-items-center flex-column body vh-100" >
        <div class="col-12 mx-auto logo-container m-2">
                <logo class="logo-small" />
            </div>
        <div class="row">
            <FormLogin/>
        </div>
        <div class="row mt-3">
            <p class="text-center" @click="toggleForm">
                No tienes cuenta? <router-link to="/">Registrate</router-link>
            </p>
        </div>
    </main>
</template>

<style >
    .logo-container {
        width: 10%;
    }   
</style>