import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
const Register = () => import("../pages/auth/Register.vue");
const Login = () => import("../pages/auth/Login.vue");
const ProductDetails = () => import('../pages/ProductDetails.vue');
const Checkout = () => import('../pages/Checkout.vue');
// import ProductDetails from "../pages/ProductDetails.vue";
import store from '../store/index.js';

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
    },
    {
      path: "/checkout",
      component: Checkout,
      meta: {requiresAuth: true}
    },
    {
      path: "/product/:id",
      component: ProductDetails,
      props: true
    },

  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.user) {
    const path = to.path.replace('/', '');
    next(`/login?redirect=${path}`);
  }  else {
    next();
  }
})

export default router;
