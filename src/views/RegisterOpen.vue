<template>
    <main class="d-flex justify-content-center align-items-center flex-column body" style="height: 100vh;">
        <!-- Logo en la parte superior -->
            <div class="col-12 mx-auto logo-container m-2">
                <logo class="logo-small" />
            </div>

        <!-- Formulario de registro -->
        <div class="row justify-content-center w-100">
            <div class="col-md-6">
                <div class="mb-4">
                    <label class="form-label">Nombre de usuario</label>
                    <input type="text" class="form-control border-bottom border-4" v-model="name" />
                </div>
                <div class="mb-4">
                    <label class="form-label">Correo electrónico</label>
                    <input type="email" class="form-control border-bottom border-4" v-model="email" />
                </div>
                <div class="mb-4">
                    <label class="form-label">Contraseña</label>
                    <input type="password" class="form-control border-bottom border-4 " v-model="password" />
                </div>
                <div class="d-grid mb-3">
                    <button type="submit" class="btn btn-outline-warning fw-bold" @click="handleRegister">Registrarse</button>
                </div>
                <p class="text-center">
                    ¿Ya tienes cuenta? <router-link to="/login">Iniciar sesión</router-link>
                </p>
            </div>
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

<style >
.logo-container {
        width: 10%;
    } 
.body{
    background-color: #1f1f2e;
    color: white;
}
</style>
