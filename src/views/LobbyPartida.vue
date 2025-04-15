<template>
  <main class=" d-flex flex-column justify-content-center align-items-center vh-100 sala">
    
    <div class="w-25 mb-4 ">
        <logo class="logo-small w-25 mx-auto" />
    </div>
    
    <!-- Título del lobby -->
    <h2 class="text-center text-white mb-4">Lobby de la Partida</h2>

    <!-- Lista de jugadores -->
    <div class="w-100">
      <ListaJugadores :jugadores="jugadores" />
    </div>
  </main>
</template>

<script>
import ListaJugadores from '@/components/CreateGame/ListaJugadores.vue';
import logo from '@/components/logo.vue';

export default {
  components: {
    logo,
    ListaJugadores,
  },
};
</script>

<style scoped>
.sala {
    width: 100%; 
    height: 100%;
    background-color: #12122b; /* Fondo oscuro */
}

h2 {
  font-size: 2rem;
  font-weight: bold;
}


</style>