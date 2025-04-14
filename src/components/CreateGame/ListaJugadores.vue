<template>
    <div class="tabla-container">
      <table class="tabla-jugadores">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Turno</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(jugador, index) in jugadores" :key="index">
            <td>{{ jugador.nombre }}</td>
            <td>{{ jugador.puntos }}</td>
          </tr>
          <tr>
            <td>Jugador 1</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  defineProps({
    jugadores: {
      type: Array,
      required: true,
      default: () => []
    }
  });
  </script>
  
  <style scoped>
  .tabla-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .tabla-jugadores {
    width: 300px;
    border-collapse: collapse;
    font-size: 1.2rem;
    color: #fff;

    background-color: #1f1f2e;
    padding: 16px 24px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    text-align: center;
    margin-top: 20px;
  }
  
  .tabla-jugadores th,
  .tabla-jugadores td {
    border-bottom: 1px solid #ff4d4f;
    padding: 10px;
    text-align: center;
  }
  
  .tabla-jugadores th {
    color: #ff4d4f;
    font-size: 1.3rem;
  }
  
  .tabla-jugadores tr:last-child td {
    border-bottom: none;
  }
  </style>
  