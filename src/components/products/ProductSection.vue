<template>
  <section class="product-part mb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <product-categories></product-categories>
        </div>
        <div class="col-lg-9">
          <div class="row">
            <div class="col-lg-12">
              <product-filter @refresh="fetchProducts"></product-filter>
            </div>
          </div>
          <div class="row">
            <div class="row w-100" v-if="isLoading">
              <product-placeholder
                v-for="i in loadingElements"
                :key="i"
              ></product-placeholder>
            </div>

            <div class="row" v-else>
              <product-card
                v-for="product in products"
                :key="product.slug"
                :name="product.name"
                :newPrice="product.newPrice"
                :oldPrice="product.oldPrice"
                :thumbnail="product.thumbnail"
                :labels="product.labels || []"
              ></product-card>
            </div>

            <div
              class="col-md-12 text-center mt-3"
              v-if="!isLoading && (!products || products.length == 0)"
            >
              <p>No products yet ☹️</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductCategories from "./ProductCategories.vue";
import ProductFilter from "./ProductFilter.vue";
import ProductCard from "./ProductCard.vue";
import ProductPlaceholder from "./ProductPlaceholder.vue";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    ProductCategories,
    ProductFilter,
    ProductCard,
    ProductPlaceholder,
  },
  computed: {
    products() {
      console.log(this.$store.getters.products);
      return this.$store.getters.products;
    },
  },
  methods: {
    async fetchProducts() {
      this.isLoading = true;
      await this.$store.dispatch("fetchProducts");
      this.isLoading = false;
    },
  },
  created() {
    this.fetchProducts();
    console.log(this.loadingElements);
  },
};
</script>
