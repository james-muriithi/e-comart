<template>
  <div class="header-right">
    <div
      v-if="isLoggedIn"
      class="select-menu header-user"
      @click="toggleSidebar"
    >
      <img class="img" :src="userImage" alt="user" />
      <span class="text">{{ displayName }}</span>
    </div>
    <router-link to="/login" v-else class="select-menu header-user">
      <span class="text">Login</span>
    </router-link>
    <div class="header-icon-group">
      <router-link to="#"
        ><i class="icofont-ui-love"></i><sup>0</sup></router-link
      >
      <button class="icon-check" aria-label="Shopping Cart">
        <i class="icofont-shopping-cart"></i><span>$0.0</span><sup>0</sup>
      </button>
    </div>
  </div>
</template>

<script>
import { global } from "../../../config/index.js";

export default {
  computed: {
    userImage() {
      return global.defaultUserImage;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    displayName() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user.displayName || "";
    }
  },
  inject: ["toggleSidebar"]
};
</script>
