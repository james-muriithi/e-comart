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
      <router-link to="/wishlist"
        ><i class="icofont-ui-love"></i><sup>{{ wishlistQuantity }}</sup></router-link
      >
      <button class="icon-check" aria-label="Shopping Cart">
        <i class="icofont-shopping-cart"></i
        ><span>{{ formatPrice(cartTotal, false) }}</span
        ><sup>{{ cartQuantity }}</sup>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartQuantity() {
      return this.$store.getters.cartQuantity;
    },
    wishlistQuantity() {
      return this.$store.getters['wishlist/wishlistQuantity'];
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    }
  },
  inject: ["toggleSidebar"]
};
</script>
