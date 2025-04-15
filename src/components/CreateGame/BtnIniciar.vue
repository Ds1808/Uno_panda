<template>
    <div class="text-center mt-4">
      <button class="btn btn-outline-warning fs-5 fw-bold" @click="$emit('iniciar')">
        Iniciar juego
      </button>
    </div>
  </template>
  
  <script setup>
  defineEmits(['iniciar']);
  </script>
  