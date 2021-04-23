<template>
  <the-header></the-header>
  <the-sidebar-nav @close="toggleSidebar"></the-sidebar-nav>
  <cart-sidebar></cart-sidebar>
  <home-banner></home-banner>
  <promo-slider></promo-slider>
  <product-section></product-section>
  <cart-mobile></cart-mobile>
</template>

<script>
import $ from "jquery";

import HomeBanner from "../components/banner/HomeBanner.vue";
import PromoSlider from "../components/promo/PromoSlider.vue";
import ProductSection from "../components/products/ProductSection.vue";
import CartSidebar from "../components/cart/CartSidebar.vue";

export default {
  components: {
    HomeBanner,
    PromoSlider,
    ProductSection,
    CartSidebar
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
