<template>
    <main class="d-flex justify-content-center align-items-center flex-column body" style="height: 100vh;">
        <div class="col-12 mx-auto logo-container m-2">
            <logo class="logo-small" />
        </div>
        <div class="row justify-content-center w-100">
            <form @submit.prevent="handleLogin" class="col-md-6">
                <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input type="email" id="email" v-model="email" class="form-control" required />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" id="password" v-model="password" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-outline-danger fw-bold mt-2 w-100">Iniciar Sesión</button>
            </form>
        </div>
        <div class="row mt-3">
            <p class="text-center ">
                No tienes cuenta? <router-link to="/">Registrate</router-link>
            </p>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import Logo from '../components/logo.vue';
import { AuthService } from '../firebase/auth';

// Variables reactivas
const email = ref('');
const password = ref('');
const router = useRouter();

// Función para manejar el inicio de sesión
const handleLogin = async () => {
    if (!email.value || !password.value) {
        Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
        return;
    }

    try {
        console.log('Intentando iniciar sesión con:', email.value, password.value);
        const { success, user, error } = await AuthService.login({
            email: email.value,
            password: password.value,
        });

        console.log('Respuesta de AuthService.login:', { success, user, error });

        if (success) {
            Swal.fire('¡Inicio de sesión exitoso!', `Bienvenido`, 'success');
            setTimeout(() => {
                router.push('/lobbyInicio'); // Redirige a lobbyinicio.vue
            }, 1300);
            
        } else {
            Swal.fire('Error', error || 'Correo o contraseña incorrectos.', 'error');
        }
    } catch (err) {
        console.error('Error en el inicio de sesión:', err);
        Swal.fire('Error', 'Ocurrió un problema al autenticar.', 'error');
    }
};
</script>

<style>
.logo-container {
    width: 10%;
}
</style>