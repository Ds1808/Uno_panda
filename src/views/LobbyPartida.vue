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
import { ref, onMounted, onUnmounted } from 'vue';
import { escucharJugadoresDePartida } from '@/firebase/createGame';
import ListaJugadores from '@/components/CreateGame/ListaJugadores.vue';
import logo from '@/components/logo.vue';

import { useRoute } from 'vue-router';
const route = useRoute();
const gameCode = ref(''); // Código de la partida

export default {
  components: {
    logo,
    ListaJugadores,
  },
  data(){
    return {
      gameCode: '', // Código de la partida
      jugadores: [], // Lista de jugadores
      unsubscribe: null, // Función para cancelar la suscripción
    };
    

    onMounted(() => {
      // Escuchar cambios en los jugadores
      gameCode.value = route.params.codigo;
      console.log('Código de la partida:', gameCode);
      unsubscribe = escucharJugadoresDePartida(gameCode, (nuevosJugadores) => {
        jugadores.value = nuevosJugadores;
        console.log('Jugadores actualizados:', nuevosJugadores);
        console.log('Código de la partida:', jugadores);
      });
    });

    onUnmounted(() => {
      // Limpiar la suscripción
      if (unsubscribe) unsubscribe();
    });

    return {
      jugadores,
    };
  }
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