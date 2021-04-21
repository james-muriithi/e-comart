<template>
  <div class="product-category">
    <div class="mt-2" v-if="isLoading">
      <loading-shimmer v-for="i in loadingElements" :key="i"></loading-shimmer>
    </div>
    <ul class="cate-list" v-else>
      <li v-for="category in categories" :key="category.id">
        <a class="cate-link dropdown" href="#" @click.prevent=""
          ><i :class="category.iconClass"></i
          ><span>{{ category.name || "" }}</span></a
        >

        <ul
          class="dropdown-list"
          v-if="!!category.subCategories && category.subCategories.length > 0"
        >
          <li v-for="subcat in category.subCategories" :key="subcat.name">
            <a :href="subcat.url || '#'">{{ subcat.name }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import LoadingShimmer from "../layouts/sidebar/LoadingShimmer.vue";
export default {
  components: {
    LoadingShimmer
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    async loadCategories() {
      this.isLoading = true;

      await this.$store.dispatch("fetchCategories");

      this.isLoading = false;
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    loadingElements() {
      return new Array(5).fill(1);
    }
  },
  mounted() {
    // this.loadCategories();
  }
};
</script>
