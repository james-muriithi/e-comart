<template>
  <input
    type="text"
    placeholder="Search anything..."
    name="query"
    :value="title ? '' : query"
    autocomplete="off"
  />
  <button type="submit" aria-label="Search">
    <i class="icofont-ui-search"></i><span v-if="title">search</span>
  </button>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {};
  },
  computed: {
    query() {
      let params = new URLSearchParams(document.location.search.substring(1));
      return params.get("query");
    }
  }
};
</script>
