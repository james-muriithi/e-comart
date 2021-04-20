<template>
  <header class="header-part">
    <div class="container">
      <header-left></header-left>

      <div class="header-middle">
        <the-seach-bar></the-seach-bar>
      </div>
      <header-right></header-right>
    </div>
  </header>
</template>

<script>
import TheSeachBar from '../../ui/TheSeachBar.vue';
import HeaderLeft from "./HeaderLeft.vue";
import HeaderRight from "./HeaderRight.vue";
export default {
  components: {
    HeaderLeft,
    HeaderRight,
    TheSeachBar
  }
};
</script>
