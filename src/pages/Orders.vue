<template>
  <the-header></the-header>
  <the-sidebar-nav @close="toggleSidebar"></the-sidebar-nav>
  <cart-sidebar></cart-sidebar>
  <order-section></order-section>
</template>

<script>
import $ from "jquery";
import CartSidebar from "../components/cart/CartSidebar.vue";
import OrderSection from "../components//orders/OrderSection.vue";

export default {
  components: {
    CartSidebar,
    OrderSection
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
