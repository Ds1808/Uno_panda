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
  ],
});

export default router;
