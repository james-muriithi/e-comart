<template>
  <router-view></router-view>
</template>

<script>
import $ from "jquery";
export default {
  name: "App",
  created() {
    console.log($("#app"));
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
