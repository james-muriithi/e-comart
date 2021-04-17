<template>
  <header class="header-part">
    <div class="container">
      <div class="header-left">
        <div class="header-icon-group">
          <button class="icon-nav"><i class="icofont-align-left"></i></button
          ><a class="header-logo" href="/"
            ><img
              src="https://mironmahmud.com/ecomart/assets/ltr/images/logo.png"
              alt="logo" /></a
          ><button class="icon-cross" @click="toggleCross"><i class="icofont-close"></i></button>
        </div>
        <div class="select-option">
          <img
            class="img"
            src="https://mironmahmud.com/ecomart/assets/ltr/images/language/english.png"
            alt="language"
          /><span class="text">english</span>
          <ul class="option-list">
            <li>
              <a href="#"
                ><img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/language/english.png"
                  alt="language"
                /><span>english</span></a
              >
            </li>
            <li>
              <a
                href="https://mironmahmud.com/ecomart/assets/rtl/html/grocery/index.html"
                ><img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/language/arabic.png"
                  alt="language"
                /><span>arabic</span></a
              >
            </li>
          </ul>
        </div>
      </div>
      <form class="header-middle">
        <div class="select-option">
          <i class="icon icofont-grocery"></i><span class="text">grocery</span>
          <ul class="option-list">
            <li>
              <a href="index.html"
                ><i class="icofont-grocery"></i><span>grocery</span></a
              >
            </li>
            <li>
              <a
                href="https://mironmahmud.com/ecomart/assets/ltr/html/bakery/index.html"
                ><i class="icofont-cup-cake"></i><span>bakery</span></a
              >
            </li>
            <li>
              <a
                href="https://mironmahmud.com/ecomart/assets/ltr/html/clothes/index.html"
                ><i class="icofont-jacket"></i><span>clothes</span></a
              >
            </li>
            <li>
              <a
                href="https://mironmahmud.com/ecomart/assets/ltr/html/gadgets/index.html"
                ><i class="icofont-camera"></i><span>gadgets</span></a
              >
            </li>
            <li>
              <a
                href="https://mironmahmud.com/ecomart/assets/ltr/html/furniture/index.html"
                ><i class="icofont-chair"></i><span>furniture</span></a
              >
            </li>
            <li>
              <a
                href="https://mironmahmud.com/ecomart/assets/ltr/html/cosmetics/index.html"
                ><i class="icofont-paint"></i><span>cosmetics</span></a
              >
            </li>
          </ul>
        </div>
        <input type="text" placeholder="Search anything..." /><button
          type="submit"
        >
          <i class="icofont-ui-search"></i>
        </button>
      </form>
      <div class="header-right">
        <div class="select-menu header-user">
          <img
            class="img"
            src="https://mironmahmud.com/ecomart/assets/ltr/images/user.png"
            alt="user"
          /><span class="text">miron</span>
        </div>
        <div class="header-icon-group">
          <a href="wishlist.html"><i class="icofont-ui-love"></i><sup>0</sup></a
          ><button class="icon-check">
            <i class="icofont-shopping-cart"></i><span>$00.00</span><sup>0</sup>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
import $ from "jquery";

export default {
  methods: {
    handleScroll(event) {
      $(event.target).scrollTop() > 130
        ? $(".header-part").addClass("header-fixed")
        : $(".header-part").removeClass("header-fixed");
    },
    toggleCross(event) {
      $(event.target).first().toggleClass("icofont-plus"),
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