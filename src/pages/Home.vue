<template>
  <the-header></the-header>
  <the-sidebar-nav @close="toggleSidebar"></the-sidebar-nav>
  <home-banner></home-banner>
</template>

<script>
import $ from "jquery";

import HomeBanner from "../components/banner/HomeBanner.vue";

export default {
  components: {
    HomeBanner
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
