import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Register from "../pages/auth/Register.vue";
import Login from "../pages/auth/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/register",
      component: Register
    },
    {
      path: "/login",
      component: Login
    }
  ]
});

export default router;
