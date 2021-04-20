<template>
  <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
    <div class="product-card">
      <figure class="product-media">
        <div class="product-label-group">
          <label
            :class="`product-label ${label.type}`"
            v-for="label in labels"
            :key="label.name"
            >{{ label.title }}</label
          >
        </div>
        <a class="product-image" href="product-single.html"
          ><img :src="productImage" alt="product"
        /></a>
      </figure>
      <div class="product-content">
        <h5 class="product-price">
          <span>{{ newPrice }}</span
          ><del>{{ oldPrice }}</del>
        </h5>
        <h5 class="product-name">
          <a href="product-single.html">{{ name }}</a>
        </h5>
        <div class="product-action-group">
          <div class="product-action">
            <button class="action-wish" title="Product Wish">
              <i class="icofont-ui-love"></i></button
            ><button class="action-cart" title="Add to Cart">
              <span>add to cart</span></button
            ><button
              class="action-view"
              title="Product View"
              data-toggle="modal"
              data-target="#product-view"
            >
              <i class="icofont-eye-alt"></i>
            </button>
          </div>
          <div class="product-action">
            <button class="action-minus" title="Quantity Minus">
              <i class="icofont-minus"></i></button
            ><input
              class="action-input"
              title="Quantity Number"
              type="text"
              name="quantity"
              value="1"
            /><button class="action-plus" title="Quantity Plus">
              <i class="icofont-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Samsung Note 1",
      newPrice: "$25",
      oldPrice: "$42",
      productImage: require("../../assets/images/products/01.jpg"),
      labels: [
        {
          title: "new",
          type: "label-new"
        },
        {
          title: "-10%",
          type: "label-off"
        }
      ]
    };
  }
};
</script>
