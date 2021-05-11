<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("tryLogin");
    this.$store.dispatch("loadCart");
    this.$store.dispatch("wishlist/loadCart");
  }
};
</script>
