<template>
  <the-header></the-header>
  <the-sidebar-nav @close="toggleSidebar"></the-sidebar-nav>
</template>

<script>
import $ from "jquery";
export default {
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
