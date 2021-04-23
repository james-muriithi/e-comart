<template>
  <router-view></router-view>
  <cart-mobile></cart-mobile>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("tryLogin");
    this.$store.dispatch('loadCart')
  }
};
</script>
<style>
#app{
  overflow-x: hidden;
}
</style>
