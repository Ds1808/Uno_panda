import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/gameBoard',
      name: 'game-board',
      component: () => import('../views/GameBoard.vue'),
    },
    {
      path: '/init',
      name: 'init',
      component: () => import('../views/Init.vue'),
    },
    {
      path: '/CreateGame',
      name: 'CreateGame',
      component: () => import('../views/CreateGame.vue'),
    },
  ],
})

export default router
