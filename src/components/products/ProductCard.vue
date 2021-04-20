<template>
  <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
    <div class="product-card">
      <figure class="product-media">
        <div class="product-label-group">
          <label class="product-label label-new">new</label
          ><label class="product-label label-off">-10%</label>
        </div>
        <a class="product-image" href="product-single.html"
          ><img :src="productImage" alt="product"
        /></a>
      </figure>
      <div class="product-content">
        <h5 class="product-price"><span>$25 </span><del>$42</del></h5>
        <h5 class="product-name">
          <a href="product-single.html">product name</a>
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
    computed:{
        productImage(){
            return require('../../assets/images/products/01.jpg')
        }
    }
}
</script>