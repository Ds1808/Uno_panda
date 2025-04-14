<script setup>
const props = defineProps({
  number: {
    type: Number,
    default: 7,
  },
  color: {
    type: String,
    default: 'red',
  },
})
</script>

<template>
  <div class="deck-out-card">
    <div class="card-uno" :class="color">
      <div class="card-content">
        <div class="card-corner top-left">
          <span class="number">{{ number }}</span>
        </div>
        <div class="card-center bg-white rounded-circle">
          <span class="number text-black">{{ number }}</span>
        </div>
        <div class="card-corner bottom-right">
          <span class="number">{{ number }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.deck-out-card {
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

.card-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
}

.card-corner {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-left {
  align-self: flex-start;
}

.bottom-right {
  align-self: flex-end;
  transform: rotate(180deg);
}

.card-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.number {
  font-size: 2em;
  font-weight: bold;
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
