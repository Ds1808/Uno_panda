<script setup>
// No necesitamos props para el mazo de cartas
</script>

<template>
  <div class="deck-pile">
    <div class="card-stack">
      <div class="card-uno back">
        <div class="card-content">
          <div class="card-center">
            <span class="uno-logo">UNO</span>
          </div>
        </div>
      </div>
      <div class="card-uno back shadow-1"></div>
      <div class="card-uno back shadow-2"></div>
    </div>
  </div>
</template>

<style scoped>
.deck-pile {
  position: relative;
  z-index: 2;
}

.card-stack {
  position: relative;
  width: 120px;
  height: 180px;
}

.card-uno {
  width: 120px;
  height: 180px;
  border-radius: 10px;
  position: absolute;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.card-uno:hover {
  transform: scale(1.05);
}

.card-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
}

.card-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.uno-logo {
  font-size: 2.5em;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.back {
  background: linear-gradient(45deg, #ff4444, #4444ff);
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.shadow-1 {
  top: 2px;
  left: 2px;
  z-index: -1;
  opacity: 0.7;
}

.shadow-2 {
  top: 4px;
  left: 4px;
  z-index: -2;
  opacity: 0.4;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
