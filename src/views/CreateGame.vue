<template>
  <div class="vh-100 d-flex flex-column justify-content-center align-items-center sala">
    <div class="row w-50 container">
      <!-- Logo en la parte superior -->

        <div class="col-12 w-25 mx-auto">
          <logo class="logo-small" />
        </div>
      <!-- Código de sala -->
      <div class="col-12 text-center mb-1">
        <CodigoSala :codigo="codigoSala"/>
      </div>
      <!-- Lista de jugadores -->
      <div class="col-12 text-center">
        <ListaJugadores :jugadores="jugadores" />
      </div>
      
      <div class="row mt-2">
        <div class="col-6 text-center">
          <BtnIniciar @iniciar="iniciarJuego" />
        </div>
        <div class="col-6 text-center">
          <BtnSalirLobby />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import logo from '@/components/logo.vue';
import CodigoSala from '@/components/CreateGame/CodigoSala.vue';
import ListaJugadores from '@/components/CreateGame/ListaJugadores.vue';
import BtnIniciar from '@/components/CreateGame/BtnIniciar.vue';
import BtnSalirLobby from '@/components/CreateGame/BtnSalirLobby.vue';  
import { getAuth } from 'firebase/auth'; // Asegúrate de importar auth desde tu archivo de configuración de Firebase
import { 
  createGame, 
  iniciarPartida,
  escucharJugadoresDePartida,
  obtenerPlayerIdDesdeUserId 
  } from '@/firebase/createGame.js'; 
import Swal from 'sweetalert2';



export default {
  components: {
    logo,
    CodigoSala,
    ListaJugadores,
    BtnIniciar,
    BtnSalirLobby,
  },
  data() {
    return {
        codigoSala: '',
        jugadores: [],
        gameCode: '',
        unsubscribe: null,
        error: null,
    };
  },
  methods: {
    async crearJuego() {
      try {
        const user = getAuth().currentUser;
        if (!user) {
          throw new Error('No hay un usuario autenticado');
        }

        const userId = user.uid;
        const hostPlayerId = await obtenerPlayerIdDesdeUserId(userId);
        const invitedPlayerIds = [];

        const code = await createGame(hostPlayerId, invitedPlayerIds);
        this.codigoSala = code;
        this.gameCode = code;

        // ✅ Inicia la escucha solo cuando ya tengas el gameCode
        this.unsubscribe = escucharJugadoresDePartida(this.gameCode, (jugadoresActualizados) => {
          this.jugadores = jugadoresActualizados;
        });

      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el juego.',
        });
        console.error('❌ Error creando juego:', err);
        this.error = err.message;
      }
    },

    async iniciarJuego() {
    try {
      if (!this.codigoSala) throw new Error('No hay código de sala');

      const partidaIniciada = await iniciarPartida(this.codigoSala);
      
      if (partidaIniciada) {
        console.log('Datos de la partida:', partidaIniciada);
        // Redirigir a la vista de juego
        this.$router.push({ name: 'game-board', params: { codigo: partidaIniciada.codigo } });
      }

    } catch (err) {
      this.error = err.message;
    }
  },
},
  mounted() {
    this.crearJuego();
    this.iniciarJuego();
},
}

</script>

<style scoped>
.sala {
  background-color: #12122b;
}
</style>
