<template>
  <nav class="sidebar-nav">
    <div class="nav-container">
      <div class="nav-header">
        <button class="nav-close"><i class="icofont-close"></i></button
        ><a class="nav-logo" href="?"><img :src="logo" alt="logo"/></a>
        <ul class="nav nav-tabs">
          <li>
            <a href="#cate-list" class="nav-link active" data-toggle="tab"
              >categories</a
            >
          </li>
          <li>
            <a href="#menu-list" class="nav-link" data-toggle="tab"
              >menu list</a
            >
          </li>
        </ul>
      </div>
      <div class="nav-content">
        <div class="tab-pane active mt-3" id="cate-list">
          <ul class="cate-list">
            <li>
              <a class="cate-link dropdown" href="#"
                ><i class="flaticon-vegetable"></i><span>vegetables</span></a
              >
              <ul class="dropdown-list">
                <li><a href="#">asparagus</a></li>
                <li><a href="#">broccoli</a></li>
                <li><a href="#">carrot</a></li>
              </ul>
            </li>
            <li>
              <a class="cate-link dropdown" href="#"
                ><i class="flaticon-fruit"></i><span>fruits</span></a
              >
              <ul class="dropdown-list">
                <li><a href="#">Apple</a></li>
                <li><a href="#">Orange</a></li>
                <li><a href="#">Strawberry</a></li>
              </ul>
            </li>
            <li>
              <a class="cate-link dropdown" href="#"
                ><i class="flaticon-fish"></i><span>fishes</span></a
              >
              <ul class="dropdown-list">
                <li><a href="#">elish</a></li>
                <li><a href="#">pangash</a></li>
                <li><a href="#">telapiya</a></li>
              </ul>
            </li>
            <li>
              <a class="cate-link dropdown" href="#"
                ><i class="flaticon-barbecue"></i><span>meats</span></a
              >
              <ul class="dropdown-list">
                <li><a href="#">beaf</a></li>
                <li><a href="#">chiken</a></li>
              </ul>
            </li>
            <li>
              <a class="cate-link dropdown" href="#"
                ><i class="flaticon-crab"></i><span>sea foods</span></a
              >
              <ul class="dropdown-list">
                <li><a href="#">Lobster</a></li>
                <li><a href="#">Octopus</a></li>
                <li><a href="#">Shrimp</a></li>
              </ul>
            </li>
            <li>
              <a class="cate-link dropdown" href="#"
                ><i class="flaticon-salad"></i><span>vegan foods</span></a
              >
              <ul class="dropdown-list">
                <li><a href="#">Legumes</a></li>
                <li><a href="#">Seaweed</a></li>
                <li><a href="#">Sprouted</a></li>
              </ul>
            </li>
            <li>
              <a class="cate-link dropdown" href="#"
                ><i class="flaticon-dried-fruit"></i><span>dry foods</span></a
              >
              <ul class="dropdown-list">
                <li><a href="#">Almond</a></li>
                <li><a href="#">Betel nut</a></li>
                <li><a href="#">Cashew</a></li>
              </ul>
            </li>
            <li>
              <a class="cate-link dropdown" href="#"
                ><i class="flaticon-cheers"></i><span>drinks</span></a
              >
              <ul class="dropdown-list">
                <li><a href="#">Lemonade</a></li>
                <li><a href="#">Milkshake</a></li>
                <li><a href="#">water</a></li>
              </ul>
            </li>
            <li>
              <a class="cate-link dropdown" href="#"
                ><i class="flaticon-dairy-products"></i
                ><span>dairy farm</span></a
              >
              <ul class="dropdown-list">
                <li><a href="#">egge</a></li>
                <li><a href="#">milk</a></li>
                <li><a href="#">butter</a></li>
              </ul>
            </li>
            <li>
              <a class="cate-link dropdown" href="#"
                ><i class="flaticon-wheat-sack"></i><span>rices</span></a
              >
              <ul class="dropdown-list">
                <li><a href="#">Finger Millet</a></li>
                <li><a href="#">Flattened Rice</a></li>
                <li><a href="#">Gram Flour</a></li>
              </ul>
            </li>
            <li>
              <a class="cate-link dropdown" href="#"
                ><i class="flaticon-beverage"></i><span>snacks</span></a
              >
              <ul class="dropdown-list">
                <li><a href="#">Onion rings</a></li>
                <li><a href="#">Piattos</a></li>
                <li><a href="#">Sev mamra</a></li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="tab-pane" id="menu-list">
          <div class="nav-profile">
            <a href="#"
              ><img
                src="https://mironmahmud.com/ecomart/assets/ltr/images/user.png"
                alt="user"
            /></a>
            <h4><a href="#">Miron Mahmud</a></h4>
          </div>
          <ul class="nav-list">
            <li>
              <a class="nav-link" href="/"
                ><i class="icofont-ui-home"></i><span>home</span></a
              >
            </li>
            <li>
              <a class="nav-link" href="#"
                ><i class="icofont-sale-discount"></i><span>offers</span></a
              >
            </li>
            <li>
              <a class="nav-link" href="#"
                ><i class="icofont-shield"></i><span>brands</span></a
              >
            </li>
            <li>
              <a class="nav-link" href="#"
                ><i class="icofont-crown"></i><span>brand profile</span></a
              >
            </li>
            <li>
              <a class="nav-link" href="#"
                ><i class="icofont-ui-user"></i><span>my profile</span></a
              >
            </li>
            <li>
              <a class="nav-link" href="#"
                ><i class="icofont-ui-love"></i><span>wishlist</span></a
              >
            </li>
            <li>
              <a class="nav-link" href="#"
                ><i class="icofont-ui-check"></i><span>checkout</span></a
              >
            </li>
            <li>
              <a class="nav-link" href="#"
                ><i class="icofont-basket"></i><span>your order</span></a
              >
            </li>
            <li>
              <a class="nav-link" href="#"
                ><i class="icofont-page"></i><span>order invoice</span></a
              >
            </li>
            <li>
              <a class="nav-link" href="#"
                ><i class="icofont-question-circle"></i
                ><span>need help</span></a
              >
            </li>
            <li>
              <a class="nav-link" href="#"
                ><i class="icofont-contacts"></i><span>contact us</span></a
              >
            </li>
            <li>
              <a class="nav-link" href="#" @click.prevent="logout"
                ><i class="icofont-ui-lock"></i><span>logout</span></a
              >
            </li>
          </ul>
        </div>
        <div class="nav-footer">
          <p>&COPY; Copyright by <a href="#">James</a></p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import $ from "jquery";
import { global } from "../../../config/index.js";
export default {
  emits: ["close"],
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$store.dispatch("alert/setAlert", {
        message: "You've been logged out"
      });

      //from global mixin
      this.showAlert();
    }
  },
  computed: {
    logo() {
      return global.logo;
    }
  },
  created() {
    $(document).on("mouseup", e => {
      var container = $(".sidebar-nav.active .nav-container");

      if (
        container.length > 0 &&
        !container.is(e.target) &&
        container.has(e.target).length === 0
      ) {
        this.$emit("close");
      }
    });

    //dropdowns
    $(function() {
      $(".dropdown").click(function() {
        $(this)
          .next()
          .toggle(),
          $(".dropdown-list:visible").length > 1 &&
            ($(".dropdown-list:visible").hide(),
            $(this)
              .next()
              .show());
      });
    });
  },
  unmounted() {
    $(".sidebar-nav.active .nav-container").off("mouseup");
  }
};
</script>
