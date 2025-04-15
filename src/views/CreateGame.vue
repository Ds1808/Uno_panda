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
    };
  },
  methods: {
    GenerarCodigo() {
        console.log('Generando Codigo de la partida...');
        const codigo = Math.floor(1000 + Math.random() * 9000).toString();
        this.codigoSala = codigo;
    },
  },
    mounted() {
    this.GenerarCodigo();
    },
};
</script>

<style scoped>
.sala {
  background-color: #12122b;
}
</style>
