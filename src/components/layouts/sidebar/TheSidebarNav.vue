<template>
  <nav class="sidebar-nav">
    <div class="nav-container">
      <div class="nav-header">
        <button class="nav-close" aria-label="close sidebar">
          <i class="icofont-close"></i></button
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
          <div class="mt-2" v-if="isLoading">
            <loading-shimmer
              v-for="i in loadingElements"
              :key="i"
            ></loading-shimmer>
          </div>
          <ul class="cate-list" v-else>
            <li v-for="category in categories" :key="category.id">
              <a class="cate-link dropdown" href="#" @click.prevent=""
                ><i :class="category.iconClass"></i
                ><span>{{ category.name || "" }}</span></a
              >

              <ul
                class="dropdown-list"
                v-if="
                  !!category.subCategories && category.subCategories.length > 0
                "
              >
                <li v-for="subcat in category.subCategories" :key="subcat.name">
                  <a :href="subcat.url || '#'">{{ subcat.name }}</a>
                </li>
              </ul>
            </li>
            <div
              class="text-center mt-5"
              v-if="!categories || categories.length == 0"
            >
              <p><b>No categories</b></p>
            </div>
          </ul>
        </div>

        <div class="tab-pane" id="menu-list">
          <div class="nav-profile" v-if="isLoggedIn">
            <a href="#"><img :src="userImage" alt="user"/></a>
            <h4>
              <a href="#">{{ displayName }}</a>
            </h4>
          </div>
          <div v-else class="nav-profile my-3">
            <router-link to="/login" class="login-btn text-center">
              Login
            </router-link>
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
            <li v-if="isLoggedIn">
              <a class="nav-link" href="#"
                ><i class="icofont-ui-user"></i><span>my profile</span></a
              >
            </li>
            <li v-if="isLoggedIn">
              <a class="nav-link" href="#"
                ><i class="icofont-ui-love"></i><span>wishlist</span></a
              >
            </li>
            <li v-if="isLoggedIn">
              <a class="nav-link" href="#"
                ><i class="icofont-ui-check"></i><span>checkout</span></a
              >
            </li>
            <li v-if="isLoggedIn">
              <a class="nav-link" href="#"
                ><i class="icofont-basket"></i><span>orders</span></a
              >
            </li>
            <li v-if="isLoggedIn">
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
            <li v-if="isLoggedIn">
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
import LoadingShimmer from "./LoadingShimmer.vue";

export default {
  components: {
    LoadingShimmer
  },
  emits: ["close"],
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$store.dispatch("alert/setAlert", {
        message: "You've been logged out"
      });

      //from global mixin
      this.showAlert();
    },
    async loadCategories() {
      this.isLoading = true;

      await this.$store.dispatch("fetchCategories");

      this.isLoading = false;
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    categories() {
      return this.$store.getters.categories;
    },
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
      $("#app").on("click", ".dropdown", function() {
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
  mounted() {
    this.loadCategories();
  },
  unmounted() {
    $(".sidebar-nav.active .nav-container").off("mouseup");
  }
};
</script>

<style scoped>
.login-btn {
  width: 100%;
  height: 38px;
  margin: 0px 5px;
  font-size: 13px;
  font-weight: 700;
  line-height: 13px;
  border-radius: 5px;
  letter-spacing: 0.3px;
  text-align: center;
  white-space: nowrap;
  text-transform: uppercase;
  color: var(--white);
  background: var(--primary);
  text-shadow: var(--primary-tshadow);
  position: relative;
  padding-top: 10px;
}
#cate-list {
  min-height: 60%;
}
</style>
