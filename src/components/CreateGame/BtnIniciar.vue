<template>
    <div class="text-center mt-4">
      <button class="btn btn-outline-warning fs-5 fw-bold" @click="iniciarJuego">
        Iniciar juego
      </button>
    </div>
  </template>
  
  <script setup>
  const iniciarJuego = () => {
    console.log('Iniciando juego...');
  };
  </script>
  