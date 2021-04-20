<template>
  <section class="banner-part">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="banner-content" :style="bannerStyle">
            <h1>{{ title }}</h1>
            <p>
              {{ description }}
            </p>
            <form class="banner-form">
              <the-seach-bar :title="true"></the-seach-bar>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TheSeachBar from "../ui/TheSeachBar.vue";
export default {
  components: { TheSeachBar },
  data() {
    return {
      title: "get your gadget items quickly.",
      description:
        "We are always ready to deliver product to your doorstep every day",
      bannerImage: require("../../assets/images/banner.jpg")
    };
  },
  computed: {
    bannerStyle() {
      return `background: url(${this.bannerImage})
                no-repeat center;
              background-size: cover;`;
    }
  }
};
</script>
