import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/gameBoard",
      name: "game-board",
      component: () => import("../views/GameBoard.vue"),
    },
    {
      path: "/lobbyInicio",
      name: "lobby-inicio",
      component: () => import("../views/LobbyInicio.vue"),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/CreateGame',
      name: 'CreateGame',
      component: () => import('../views/CreateGame.vue'),
    },
  ],
});

export default router;
