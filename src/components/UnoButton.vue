<script setup>
const emit = defineEmits(['uno-called'])

const handleUnoClick = () => {
  emit('uno-called')
}
</script>

<template>
  <button class="uno-button" @click="handleUnoClick">
    <span class="uno-text">¡UNO!</span>
  </button>
</template>

<style scoped>
.uno-button {
  background: linear-gradient(45deg, #ff0000, #ff6b6b);
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.uno-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 0, 0, 0.4);
}

.uno-button:active {
  transform: scale(0.95);
}

.uno-text {
  position: relative;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
