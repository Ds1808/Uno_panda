<template>
    <main class="container justify-content-center align-items-center d-flex flex-column">
        <form action="">
            <div class="row mx-5">
                <h1 class="col-md-5 mb-4 w-100">Registrarse</h1>
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
                <div class="col-md-5 mb-4 w-100 d-grid">
                    <button type="submit" class="btn btn-dark">Registrarse</button>
                </div>
            </div>
        </form>
    </main>
</template>