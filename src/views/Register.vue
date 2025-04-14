<template>
    <main class="container justify-content-center align-items-center d-flex flex-column" style="height: 100vh;">
        <div class="row logo-container mb-4">
            <Logo />
        </div>
        <div class="row">
            <div class="col-md-5 mb-4 w-100">
                <label class="form-label">Nombre de usuario</label>
                <input type="text" class="form-control border-bottom border-4" v-model="name" />
            </div>
            <div class="col-md-5 mb-4 w-100">
                <label class="form-label">Correo electrónico</label>
                <input type="email" class="form-control border-bottom border-4" v-model="email" />
            </div>
            <div class="col-md-5 mb-4 w-100">
                <label class="form-label">Contraseña</label>
                <input type="password" class="form-control border-bottom border-4" v-model="password" />
            </div>
            <div class="col-md-5 d-grid mb-0">
                <button type="submit" class="btn btn-dark" @click="handleRegister">Registrarse</button>
            </div>
            <p class="col-md-5 text-center mt-1">
                ¿Ya tienes cuenta? <router-link to="/">Inicia sesión</router-link>
            </p>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import Logo from '../components/logo.vue';
import { AuthService } from '../firebase/auth'; // Importa AuthService correctamente

// Variables reactivas
const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

// Función para manejar el registro
const handleRegister = async () => {
    if (!name.value || !email.value || !password.value) {
        Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
        return;
    }

    try {
        const { success, error } = await AuthService.register({
            email: email.value,
            password: password.value,
            userData: {
                nombre: name.value,
            },
        });

        if (success) {
            Swal.fire('¡Registro exitoso!', 'Tu cuenta ha sido creada.', 'success');
            router.push('/login'); // Redirige al inicio de sesión
        } else {
            Swal.fire('Error', error || 'No se pudo registrar.', 'error');
        }
    } catch (err) {
        Swal.fire('Error', 'Ocurrió un problema al registrar.', 'error');
        console.error(err);
    }
};
</script>

<style>
.logo-container {
    width: 40%;
}
</style>
