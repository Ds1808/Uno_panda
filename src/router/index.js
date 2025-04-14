import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "register",
      component: () => import("../views/RegisterOpen.vue"), // Ruta predeterminada al registro
    },
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
      path: "/login",
      name: "init",
      component: () => import("../views/Init.vue"),
    },
    {
      path: "/CreateGame",
      name: "CreateGame",
      component: () => import("../views/CreateGame.vue"),
    },
  ],
});

export default router;
