<script setup>
import AvatarUser from '../components/AvatarUser.vue';
import HandOpponent from '../components/HandOpponent.vue';
import DeckOutCard from '../components/DeckOutCard.vue';
import DeckInCard from '../components/DeckInCard.vue';
import UnoButton from '../components/UnoButton.vue';
import ExitButton from '../components/ExitButton.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  initializeGame,
  fetchGameParticipants,
  fetchPlayerCards,
  updateGameStateWithCard,
} from '../firebase/games'; // Importa la función para actualizar el estado del juego

const currentCard = ref({ number: '', color: '' }); // Carta actual
const gameCode = ref(''); // Código de la partida obtenido de la ruta
const players = ref([]); // Lista de jugadores en la sala
const playerCards = ref({}); // Objeto para almacenar las cartas de cada jugador
const gameStarted = ref(false); // Estado del juego (si ha comenzado o no)
const route = useRoute();

const handleUnoCalled = () => {
  console.log('¡UNO! fue llamado');
};

const handleExitGame = () => {
  console.log('Saliendo del juego...');
};

const handleCardPlayed = (cardData) => {
  console.log('Carta jugada:', cardData);
  currentCard.value = cardData;
};

// Función para iniciar la partida
const startGame = async () => {
  try {
    // Generar una carta aleatoria
    const colors = ['red', 'blue', 'green', 'yellow'];
    const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

    // Actualizar la carta inicial
    currentCard.value = { number: randomNumber, color: randomColor };

    // Actualizar el estado del juego en Firestore
    await updateGameStateWithCard(gameCode.value, currentCard.value);

    // Cambiar el estado del juego a iniciado
    gameStarted.value = true;

    console.log('Partida iniciada con la carta:', currentCard.value);
  } catch (error) {
    console.error('Error al iniciar la partida:', error);
  }
};

// Inicializar el juego al montar el componente
onMounted(async () => {
  try {
    // Obtener el código de la partida desde la ruta
    gameCode.value = route.params.codigo;
    console.log('Código de la partida:', gameCode.value);

    // Obtener los participantes de la partida desde Firestore
    players.value = await fetchGameParticipants(gameCode.value);
    console.log('Jugadores obtenidos desde Firestore:', players.value);

    // Inicializar el juego y asignar cartas
    await initializeGame(gameCode.value, players.value);

    // Obtener las cartas de los jugadores
    playerCards.value = await fetchPlayerCards(gameCode.value);
    console.log('Cartas de los jugadores obtenidas:', playerCards.value);

    // Verificar si el juego ya ha comenzado
    gameStarted.value = currentCard.value.number !== '' && currentCard.value.color !== '';
  } catch (error) {
    console.error('Error al inicializar el juego:', error);
  }
});
</script>

<template>
  <main class="game-container">
    <div class="exit-button-container">
      <ExitButton @exit-game="handleExitGame" />
    </div>
    <div class="game-layout">
      <!-- Oponente superior -->
      <div class="opponent-section top">
        <div class="row align-items-center justify-content-center">
          <div class="col-2">
            <DeckInCard />
          </div>
          <div class="col-2">
            <AvatarUser name="Oponente 1" :score="0" :isTurn="false" />
          </div>
          <div class="col-6">
            <HandOpponent />
          </div>
        </div>
      </div>


      <div class="middle-section">
        <!-- Oponente izquierdo -->
        <div class="opponent-section left">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="d-flex flex-column align-items-center">
                <AvatarUser name="Oponente 2" :score="0" :isTurn="false" />
                <HandOpponent :isVertical="true" rotateDirection="left" />
              </div>
            </div>
          </div>
        </div>

        <!-- Tablero central -->
        <div class="game-board">
          <div class="deck-placeholder">
            <!-- Mostrar el botón de iniciar partida si el juego no ha comenzado -->
            <button
              v-if="!gameStarted"
              class="btn btn-primary btn-lg"
              @click="startGame"
            >
              Iniciar partida
            </button>

            <!-- Mostrar la carta central si el juego ha comenzado -->
            <DeckOutCard
              v-else
              :number="currentCard.number"
              :color="currentCard.color"
            />
          </div>
        </div>

        <!-- Oponente derecho -->
        <div class="opponent-section right">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="d-flex flex-column align-items-center">
                <AvatarUser name="Oponente 3" :score="0" :isTurn="false" />
                <HandOpponent :isVertical="true" rotateDirection="right" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Jugador -->
      <div class="player-section">
        <div class="row align-items-center">
          <div class="col-2">
            <AvatarUser name="Jugador" :score="0" :isTurn="true" />
          </div>
          <div class="col-8">
            <HandPlayer @card-played="handleCardPlayed" />
          </div>
          <div class="col-2">
            <UnoButton @uno-called="handleUnoCalled" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.game-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.exit-button-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.game-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
}

.middle-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 2rem;
}

.opponent-section {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.opponent-section.left,
.opponent-section.right {
  width: 200px;
  height: 100%;
  min-height: 400px;
}

.opponent-section.left .hand-opponent,
.opponent-section.right .hand-opponent {
  transform: rotate(90deg);
}


.game-board {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 2rem;
}

.player-section {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.deck-placeholder {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
}

.current-card {
  position: relative;
  z-index: 2;
}

.card-uno {
  width: 120px;
  height: 180px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.card-uno:hover {
  transform: scale(1.05);
}

.opponent-section.top {
  position: relative;
}

.deck-in-card {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
}
</style>
