<template>
    <main class="container d-flex justify-content-center align-items-center">
        <form class="w-100" @submit.prevent="handleLogin">
            <div class="row justify-content-center">
                <h1 class="col-12 text-center mb-4">Iniciar sesión</h1>
                <div class="col-md-6 mb-4">
                    <label class="form-label">Correo electrónico</label>
                    <input type="email" class="form-control border-bottom border-4" v-model="email" />
                </div>
                <div class="col-md-6 mb-4">
                    <label class="form-label">Contraseña</label>
                    <input type="password" class="form-control border-bottom border-4" v-model="password" />
                </div>
                <div class="col-md-6 d-grid">
                    <button type="submit" class="btn btn-outline-warning fw-bold">Iniciar sesión</button>
                </div>
            </div>
        </form>
    </main>
</template>
