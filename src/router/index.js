import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main.vue";
import Starred from "../pages/Starred.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/starred",
    name: "starred",
    component: Starred,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
