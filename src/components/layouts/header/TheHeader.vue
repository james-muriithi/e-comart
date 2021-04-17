<template>
  <header class="header-part">
    <div class="container">
      <header-left></header-left>

      <div class="header-middle">
        <input type="text" placeholder="Search anything..." />
        <button type="submit">
          <i class="icofont-ui-search"></i>
        </button>
      </div>
      <header-right></header-right>
    </div>
  </header>
</template>

<script>
import HeaderLeft from "./HeaderLeft.vue";
import HeaderRight from "./HeaderRight.vue";
export default {
  components: {
    HeaderLeft,
    HeaderRight
  }
};
</script>
