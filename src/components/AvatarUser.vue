<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'Jugador',
  },
  score: {
    type: Number,
    default: 0,
  },
  isTurn: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="avatar-container" :class="{ 'active-turn': isTurn }">
    <div class="avatar-wrapper">
      <img
        src="https://static-cse.canva.com/blob/1760022/1600w-vkBvE1d_xYA.jpg"
        alt="avatar"
        class="avatar-img"
      />
      <div class="turn-indicator" v-if="isTurn"></div>
    </div>
    <div class="user-info">
      <h3 class="username">{{ name }}</h3>
      <div class="score">Puntos: {{ score }}</div>
    </div>
  </div>
</template>

<style scoped>
.avatar-container {
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
}

.avatar-container.active-turn {
  transform: scale(1.05);
}

.avatar-container.active-turn .avatar-wrapper::after {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid #4caf50;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.turn-indicator {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  background-color: #4caf50;
  border-radius: 50%;
  border: 2px solid #fff;
}

.username {
  font-size: 1.1rem;
  margin: 0;
  color: #fff;
  font-weight: 600;
}

.score {
  font-size: 0.9rem;
  color: #aaa;
  margin-top: 0.25rem;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
