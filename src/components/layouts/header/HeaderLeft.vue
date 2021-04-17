<template>
    <div class="header-left">
        <div class="header-icon-group">
          <button class="icon-nav d-inline-block mr-md-3 mr-0" @click="toggleSidebar"><i class="icofont-align-left"></i></button
          ><a class="header-logo" href="/"><img :src="logo" alt="E-comart"/></a
          ><button class="icon-cross" @click="toggleCross">
            <i class="icofont-close"></i>
          </button>
        </div>
      </div>
</template>

<script>
import $ from "jquery";
import { global } from "../../../config/index.js";

export default {
  inject: ['toggleSidebar'],
  computed: {
    logo() {
      return global.logo;
    },
  },
  methods: {
    handleScroll(event) {
      $(event.target).scrollTop() > 130
        ? $(".header-part").addClass("header-fixed")
        : $(".header-part").removeClass("header-fixed");
    },
    toggleCross(event) {
      $(event.target)
        .first()
        .toggleClass("icofont-plus"),
        $(".header-middle").toggleClass("active");
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>