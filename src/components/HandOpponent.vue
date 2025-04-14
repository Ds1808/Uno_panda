<template>
  <div
    class="hand-container"
    :class="{ vertical: isVertical, 'rotate-right': rotateDirection === 'right' }"
  >
    <div class="hand">
      <div class="card-uno">
        <div class="card-content">
          <img
            src="https://th.bing.com/th/id/OIP.yLDXXDvL-IQHoa3KOxSypAAAAA?rs=1&pid=ImgDetMain"
            alt="card-back"
          />
        </div>
      </div>
      <div class="card-uno">
        <div class="card-content">
          <img
            src="https://th.bing.com/th/id/OIP.yLDXXDvL-IQHoa3KOxSypAAAAA?rs=1&pid=ImgDetMain"
            alt="card-back"
          />
        </div>
      </div>
      <div class="card-uno">
        <div class="card-content">
          <img
            src="https://th.bing.com/th/id/OIP.yLDXXDvL-IQHoa3KOxSypAAAAA?rs=1&pid=ImgDetMain"
            alt="card-back"
          />
        </div>
      </div>
      <div class="card-uno bg-dark text-white">
        <div class="card-content">
          <!-- + numero de cartas -->
          <div class="card-number">
            <span class="number">+4</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isVertical: {
    type: Boolean,
    default: false,
  },
  rotateDirection: {
    type: String,
    default: 'left', // 'left' o 'right'
  },
})

const isVertical = ref(props.isVertical)
</script>

<style scoped>
.card-number {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-number .number {
  font-size: 3rem;
  font-weight: bold;
}
.card-uno {
  width: 120px;
  height: 180px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s;
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
.hand-container {
  width: 100%;
  overflow-x: auto;
  padding: 20px 0;
  white-space: nowrap;
}

.hand-container.vertical {
  width: auto;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 20px;
  white-space: normal;
}

.hand {
  display: inline-flex;
  gap: 10px;
  padding: 0 20px;
}

.hand-container.vertical .hand {
  display: flex;
  flex-direction: column;
  gap: -20px;
  padding: 20px 0;
}

.hand-container.vertical .card-uno {
  width: 80px;
  height: 120px;
  transform: rotate(90deg);
  margin-top: -20px;
}

.hand-container.vertical .card-uno:first-child {
  margin-top: 0;
}

.hand .card-uno {
  transition: transform 0.2s;
  flex-shrink: 0;
}

/* Estilo personalizado para la barra de scroll */
.hand-container::-webkit-scrollbar {
  height: 8px;
  width: 8px;
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
  .card-uno {
    width: 80px;
    height: 120px;
  }

  .card-number .number {
    font-size: 2rem;
  }

  .hand-container {
    padding: 10px 0;
  }

  .hand {
    gap: 5px;
    padding: 0 10px;
  }

  .hand-container.vertical {
    padding: 0 10px;
  }

  .hand-container.vertical .hand {
    gap: -15px;
    padding: 10px 0;
  }

  .hand-container.vertical .card-uno {
    width: 60px;
    height: 90px;
    margin-top: -15px;
  }
}

.hand-container.vertical.rotate-right .card-uno {
  transform: rotate(-90deg);
}
</style>
