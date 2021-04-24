<template>
  <section class="product-single">
    <div class="container">
      <div class="row" v-if="!product">
        <div class="col-12 mt-3">
            <p class="text-center">Product Not Found</p>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-6 col-lg-6">
          <div class="product-gallery">
            <ul class="preview-slider">
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
            </ul>
            <ul class="thumb-slider">
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
              <li>
                <img
                  src="https://mironmahmud.com/ecomart/assets/ltr/images/shop/product/grocery/01.jpg"
                  alt="product"
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-6 col-lg-6">
          <div class="product-details">
            <h3 class="details-name">
              <a href="brand-profile.html">existing product name</a>
            </h3>
            <div class="details-meta">
              SKU:<span class="details-sku">1234567</span>BRAND:<a
                class="details-brand"
                href="#"
                >radhuni</a
              >
            </div>
            <h3 class="details-price"><span>$124.00</span><del>$42.00</del></h3>
            <p class="details-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit non
              tempora magni repudiandae sint suscipit tempore quis maxime
              explicabo veniam eos reprehenderit fuga
            </p>
            <div class="details-group">
              <label class="details-group-title">tags:</label>
              <ul class="details-tag-list">
                <li><a href="#">organic</a></li>
                <li><a href="#">fruits</a></li>
                <li><a href="#">Grapes</a></li>
              </ul>
            </div>
            <div class="details-group">
              <label class="details-group-title">Share:</label>
              <ul class="details-share-list">
                <li><a href="#" class="icofont-facebook"></a></li>
                <li><a href="#" class="icofont-twitter"></a></li>
                <li><a href="#" class="icofont-linkedin"></a></li>
              </ul>
            </div>
            <hr class="details-devider" />
            <div class="details-action-group">
              <button class="details-cart" title="Add Your Cartlist">
                <i class="icofont-cart"></i><span>add to cart</span>
              </button>
              <div class="details-action">
                <button class="details-minus" title="Quantity Minus">
                  <i class="icofont-minus"></i></button
                ><input
                  class="details-input"
                  title="Quantity Number"
                  type="text"
                  name="quantity"
                  value="1"
                /><button class="details-plus" title="Quantity Plus">
                  <i class="icofont-plus"></i>
                </button>
              </div>
              <a href="#" class="details-wish" title="Add Your Wishlist"
                ><i class="icofont-heart"></i><span>add to wish</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
export default {
  props: {
    id: {
      required: true,
      isLoading: false,
    },
  },
  computed: {
    product() {
      return this.$store.getters.selectedProduct;
    },
  },
  methods: {
    async loadProduct() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("fetchProduct", this.id);
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    },
  },
  created() {
    this.loadProduct();
  },
  mounted() {
    $(".preview-slider")
      .not(".slick-initialized")
      .slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !0,
        fade: !0,
        asNavFor: ".thumb-slider",
        prevArrow: '<i class="icofont-arrow-right dandik"></i>',
        nextArrow: '<i class="icofont-arrow-left bamdik"></i>',
        responsive: [
          {
            breakpoint: 576,
            settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !0 },
          },
        ],
      }),
      $(".thumb-slider")
        .not(".slick-initialized")
        .slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: ".preview-slider",
          dots: !1,
          arrows: !1,
          centerMode: !0,
          focusOnSelect: !0,
          responsive: [
            {
              breakpoint: 992,
              settings: { slidesToShow: 3, slidesToScroll: 1 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 3, slidesToScroll: 1 },
            },
            {
              breakpoint: 576,
              settings: { slidesToShow: 3, slidesToScroll: 1, arrows: !1 },
            },
            {
              breakpoint: 400,
              settings: { slidesToShow: 2, slidesToScroll: 1, arrows: !1 },
            },
          ],
        });
  },
};
</script>

<style scoped>
.product-single {
  padding: 30px;
  background: var(--white);
}
.related-title {
  padding: 45px 0px 42px;
}
@media (max-width: 575px) {
  .product-single {
    padding: 0px;
  }
  .product-details,
  .product-gallery {
    padding: 20px;
  }
}
</style>