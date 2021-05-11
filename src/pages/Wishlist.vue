<template>
  <the-header></the-header>
  <the-sidebar-nav @close="toggleSidebar"></the-sidebar-nav>
  <cart-sidebar></cart-sidebar>
  <wishlist-section></wishlist-section>
</template>

<script>
import $ from "jquery";
import CartSidebar from "../components/cart/CartSidebar.vue";
import WishlistSection from "../components/wishlist/WishlistSection.vue";

export default {
  components: {
    CartSidebar,
    WishlistSection
  },
  methods: {
    toggleSidebar() {
      $("body").css("overflow", "hidden"),
        $(".sidebar-nav").toggleClass("active"),
        $(".nav-close").on("click", function() {
          $("body").css("overflow-y", "scroll"),
            $(".sidebar-nav").removeClass("active");
        });
    }
  },
  provide() {
    return {
      toggleSidebar: this.toggleSidebar
    };
  }
};
</script>
