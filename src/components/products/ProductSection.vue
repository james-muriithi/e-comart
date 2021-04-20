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
                <product></product>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductCategories from "./ProductCategories.vue";
import ProductFilter from './ProductFilter.vue';
import Product from './ProductCard.vue'

export default {
  components: {
    ProductCategories,
    ProductFilter,
    Product
  },
};
</script>