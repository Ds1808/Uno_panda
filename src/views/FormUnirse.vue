<template>
  <div class="d-flex flex-column justify-content-center align-items-center container-pages">
      <div class="container d-flex justify-content-center align-items-center">
          <logo class="logo" />
      </div>
      <div>
          <form @submit.prevent="handleJoin">
              <div class="form-group">
                  <input
                      type="text"
                      v-model="codigoIngresado"
                      placeholder="Ingresa el código de la sala"
                      class="form-control"
                      required
                  />
              </div>
              <button type="submit" class="btn btn-primary w-100 mt-3">Unirse a la sala</button>
          </form>
          <BtnSalirLobby class="w-100 mt-3" />
      </div>
  </div>
</template>

<script>
import logo from '../components/logo.vue';
import BtnSalirLobby from '../components/CreateGame/BtnSalirLobby.vue';
import { useJoinGame } from '../firebase/JoinGame.js'; // Asegúrate de que la ruta sea correcta
import { ref } from 'vue';

export default {
  components: {
      logo,
      BtnSalirLobby
  },
  setup() {
      const codigoIngresado = ref('');
      const { unirseAPartida } = useJoinGame();

      const handleJoin = async () => {
          try {
              await unirseAPartida(codigoIngresado.value);
          } catch (error) {
              console.error("Error al unirse a la partida:", error);
          }
      };

      return {
          codigoIngresado,
          handleJoin
      };
  }
};
</script>

<style>
.container-pages {
  height: 100vh;
  width: 100vw;
  background-color: #12122b;
}
.logo {
  width: 200px;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
}
</style>