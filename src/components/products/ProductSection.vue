<template>
  <section class="product-part">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <product-categories></product-categories>
        </div>
        <div class="col-lg-9">
          <div class="row">
            <div class="col-lg-12">
              <product-filter></product-filter>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-center mt-3" v-if="!products || products.length == 0">
              <p>No products yet ☹️</p>
            </div>
            
            <product-card v-for="product in products" :key="product.slug"></product-card>
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

export default {
  components: {
    ProductCategories,
    ProductFilter,
    ProductCard
  },
  computed:{
    products(){
      console.log(this.$store.getters.products);
      return this.$store.getters.products
    }
  },
  methods:{
    async fetchProducts(){
      await this.$store.dispatch('fetchProducts');
    }
  },
  created(){
    this.fetchProducts()
  }
};
</script>
