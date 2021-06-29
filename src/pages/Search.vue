<template>
  <the-header></the-header>
  <the-sidebar-nav @close="toggleSidebar"></the-sidebar-nav>
  <cart-sidebar></cart-sidebar>
  <product-section :search="query"></product-section>
  <cart-mobile></cart-mobile>
</template>

<script>
import $ from "jquery";

import ProductSection from "../components/products/ProductSection.vue";
import CartSidebar from "../components/cart/CartSidebar.vue";

export default {
  components: {
    ProductSection,
    CartSidebar,
  },
  created() {
    if (this.shouldShowAlert) {
      this.showAlert();
    }
  },
  methods: {
    toggleSidebar() {
      $("body").css("overflow", "hidden"),
        $(".sidebar-nav").toggleClass("active"),
        $(".nav-close").on("click", function () {
          $("body").css("overflow-y", "scroll"),
            $(".sidebar-nav").removeClass("active");
        });
    },
  },
  provide() {
    return {
      toggleSidebar: this.toggleSidebar,
    };
  },
  computed: {
    query() {
      let params = new URLSearchParams(document.location.search.substring(1));
      return params.get("query");
    },
  },
};
</script>
