<template>
    <div class="codigo-container">
      <h3 >Código: <span>{{ codigo }}</span></h3>
    </div>
  </template>
  
  <script setup>
  defineProps({
    codigo: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .codigo-container {
    background-color: #1f1f2e;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    text-align: center;
    margin-top: 20px;
  }
  
  .codigo-container h3 {
    color: #fff;
    font-size: 1.5rem;
    margin: 0;
  }
  
  .codigo-container span {
    color: #ffdd00;
    font-weight: bold;
  }
  </style>
  