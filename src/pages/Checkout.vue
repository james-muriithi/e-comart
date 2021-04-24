<template>
  <the-header></the-header>
  <the-sidebar-nav @close="toggleSidebar"></the-sidebar-nav>
  <cart-sidebar></cart-sidebar>
  <checkout-section></checkout-section>
</template>

<script>
import $ from "jquery";
import CheckoutSection from "../components/checkout/CheckoutSection.vue";
import CartSidebar from "../components/cart/CartSidebar.vue";
export default {
  components: {
    CheckoutSection,
    CartSidebar
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
