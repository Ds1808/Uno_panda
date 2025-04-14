<script setup>
import CardUNO from './CardUNO.vue'
import { ref } from 'vue'

const emit = defineEmits(['card-played'])

const handleCardPlayed = (cardData) => {
  emit('card-played', cardData)
}
</script>

<template>
  <div class="hand-container">
    <div class="hand">
      <CardUNO number="1" color="red" @card-played="handleCardPlayed" />
      <CardUNO number="+2" color="blue" :is-special="true" @card-played="handleCardPlayed" />
      <CardUNO number="reverse" color="green" :is-special="true" @card-played="handleCardPlayed" />
      <CardUNO number="skip" color="yellow" :is-special="true" @card-played="handleCardPlayed" />
      <CardUNO number="wild" color="black" :is-special="true" @card-played="handleCardPlayed" />
      <CardUNO number="+4" color="black" :is-special="true" @card-played="handleCardPlayed" />
      <CardUNO number="5" color="red" @card-played="handleCardPlayed" />
    </div>
  </div>
</template>
<style scoped>
.hand-container {
  width: 100%;
  overflow-x: auto;
  padding: 20px 0;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch; /* Mejora el scroll en iOS */
}

.hand {
  display: inline-flex;
  gap: 10px;
  padding: 0 20px;
}

.hand .card-uno {
  transition: transform 0.2s;
  flex-shrink: 0;
}

.hand .card-uno:hover {
  transform: translateY(-20px);
}

/* Estilo personalizado para la barra de scroll */
.hand-container::-webkit-scrollbar {
  height: 8px;
}

.hand-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.hand-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.hand-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-width: 768px) {
  .hand-container {
    padding: 10px 0;
  }

  .hand {
    gap: 5px;
    padding: 0 10px;
  }

  .hand .card-uno:hover {
    transform: translateY(-10px);
  }
}
</style>
