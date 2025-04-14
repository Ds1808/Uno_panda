<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  cardType: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'red',
  },
})

const emit = defineEmits(['close', 'select-color'])

const getEffectMessage = computed(() => {
  switch (props.cardType) {
    case '+4':
      return 'El siguiente jugador toma 4 cartas y pierde su turno'
    case '+2':
      return 'El siguiente jugador toma 2 cartas y pierde su turno'
    case 'reverse':
      return 'Cambia el sentido del juego'
    case 'skip':
      return 'El siguiente jugador pierde su turno'
    case 'wild':
      return 'Elige un nuevo color para continuar'
    default:
      return ''
  }
})

const handleColorSelect = (selectedColor) => {
  emit('select-color', selectedColor)
  emit('close')
}

const getCardIcon = () => {
  switch (props.cardType) {
    case '+2':
      return 'bi-plus-circle'
    case 'reverse':
      return 'bi-arrow-left-right'
    case 'skip':
      return 'bi-slash-circle'
    case 'wild':
      return 'bi-asterisk'
    case '+4':
      return 'bi-plus-circle-fill'
    default:
      return ''
  }
}
</script>

<template>
  <div v-if="show" class="modal-overlay" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Efecto de la carta</h3>
        <button class="close-btn" @click="emit('close')">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="card-effect">
          <i :class="['bi', getCardIcon(), 'effect-icon']"></i>
          <p class="effect-message">{{ getEffectMessage }}</p>
        </div>
        <div v-if="cardType === 'wild' || cardType === '+4'" class="color-selector">
          <h4>Elige un color:</h4>
          <div class="color-buttons">
            <button
              v-for="color in ['red', 'blue', 'green', 'yellow']"
              :key="color"
              class="color-btn"
              :class="color"
              @click="handleColorSelect(color)"
            >
              <i class="bi bi-circle-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  text-align: center;
}

.card-effect {
  margin-bottom: 20px;
}

.effect-icon {
  font-size: 4rem;
  color: #333;
  margin-bottom: 15px;
}

.effect-message {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0;
}

.color-selector {
  margin-top: 20px;
}

.color-selector h4 {
  color: #333;
  margin-bottom: 15px;
}

.color-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.color-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.color-btn:hover {
  transform: scale(1.1);
}

.color-btn i {
  font-size: 1.5rem;
  color: white;
}

.red {
  background-color: #ff4444;
}

.blue {
  background-color: #4444ff;
}

.green {
  background-color: #44ff44;
}

.yellow {
  background-color: #ffff44;
}
</style>
