<script setup>
const emit = defineEmits(['exit-game'])

const handleExitClick = () => {
  emit('exit-game')
}
</script>

<template>
  <button class="exit-button" @click="handleExitClick">
    <span class="exit-text">Salir</span>
  </button>
</template>

<style scoped>
.exit-button {
  background: linear-gradient(45deg, #2c3e50, #34495e);
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.exit-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.exit-button:active {
  transform: scale(0.95);
}

.exit-text {
  position: relative;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
