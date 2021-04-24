<template>
  <the-header></the-header>
  <the-sidebar-nav @close="toggleSidebar"></the-sidebar-nav>
  <cart-sidebar></cart-sidebar>
  <product-details
    :id="id"
  ></product-details>
  <cart-mobile></cart-mobile>
</template>

<script>
import $ from "jquery";
import ProductDetails from "../components/products/ProductDetails.vue";
import CartSidebar from "../components/cart/CartSidebar.vue";
export default {
  props: {
    id: {
      required: true, 
    },
  },
  components: {
    ProductDetails,
    CartSidebar,
  },
  data() {
    return {
      isLoading: false,
    };
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
};
</script>