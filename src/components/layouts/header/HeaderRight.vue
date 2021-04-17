<template>
  <div class="header-right">
    <div class="select-menu header-user" @click="toggleSidebar">
      <img class="img" :src="userImage" alt="user" />
      <!-- <span class="text">miron</span> -->
    </div>
    <div class="header-icon-group">
      <router-link to="#"
        ><i class="icofont-ui-love"></i><sup>0</sup></router-link
      >
      <button class="icon-check">
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
    }
  },
  inject: ["toggleSidebar"]
};
</script>
