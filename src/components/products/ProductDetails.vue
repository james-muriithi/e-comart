<template>
  <section class="product-single">
    <div class="container">
      <placeholder v-if="isLoading"></placeholder>
      <div class="row" v-if="!product && !isLoading">
        <div class="col-12 mt-3">
          <p class="text-center">Product Not Found</p>
        </div>
      </div>
      <div class="row" v-if="product && !isLoading">
        <div class="col-md-6 col-lg-6">
          <div class="product-gallery">
            <ul class="preview-slider" ref="preview_slider">
              <li v-for="image in product.images" :key="image">
                <img :src="image" alt="product" />
              </li>
            </ul>

            <ul class="thumb-slider">
              <li v-for="image in product.images" :key="image">
                <img :src="image" alt="product" />
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-6 col-lg-6">
          <div class="product-details">
            <h3 class="details-name">
              <a href="#">{{ product.name }}</a>
            </h3>
            <div class="details-meta">
              SKU:<span class="details-sku">1234567</span>BRAND:<a
                class="details-brand"
                href="#"
                >radhuni</a
              >
            </div>
            <h3 class="details-price">
              <span>{{ formatPrice(product.newPrice) }}</span>
              <del>{{ formatPrice(product.newPrice) }}</del>
            </h3>
            <p class="details-desc">
              {{ product.description }}
            </p>
            
            <share :description="product.description" :title="product.name" :url="`/product/${product.id}`" />

            <hr class="details-devider" />
            <div class="details-action-group">
              <button
                :class="`details-cart${itemCartQuantity > 0 ? ' d-none' : ''}`"
                title="Add Your Cartlist"
                @click="addToCart"
              >
                <i class="icofont-cart"></i><span>add to cart</span>
              </button>
              <div
                :class="
                  `details-action${itemCartQuantity > 0 ? ' d-flex' : ''}`
                "
              >
                <button
                  class="details-minus"
                  title="Quantity Minus"
                  @click="decreaseQuantity"
                >
                  <i class="icofont-minus"></i></button
                ><input
                  class="details-input"
                  title="Quantity Number"
                  type="text"
                  name="quantity"
                  v-model="itemCartQuantity"
                /><button
                  class="details-plus"
                  title="Quantity Plus"
                  @click="addToCart"
                >
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
import _ from "lodash";
import Placeholder from "./ProductDetailsLoader";
import Share from "./Share.vue";

export default {
  components: {
    Placeholder,
    Share
  },
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    product() {
      return this.$store.getters.selectedProduct;
    },
    cartQuantity() {
      return this.$store.getters.cartQuantity;
    },
    itemCartQuantity: {
      get: function() {
        return this.$store.getters.itemCartQuantity(this.id);
      },
      set: _.debounce(function(newVal) {
        if (newVal && newVal < 0) {
          return this.itemCartQuantity;
        }
        if (newVal && newVal != this.itemCartQuantity) {
          this.changeItemQuantity(newVal);
        }
      }, 500)
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addToCart", this.id);
    },
    decreaseQuantity() {
      this.$store.dispatch("decreaseQuantity", this.id);
    },
    changeItemQuantity(qty) {
      this.$store.dispatch("changeItemQuantity", { productId: this.id, qty });
    },
    async fetchProducts() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("fetchProducts");
      } catch (error) {
        console.log(error);
        this.error = error.message || "error";
      }
      this.isLoading = false;
    },
    async loadProduct() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("fetchProduct", this.id);
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
      this.$nextTick(() => {
        if (this.$refs.preview_slider) {
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
                  settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !0 }
                }
              ]
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
                    settings: { slidesToShow: 3, slidesToScroll: 1 }
                  },
                  {
                    breakpoint: 768,
                    settings: { slidesToShow: 3, slidesToScroll: 1 }
                  },
                  {
                    breakpoint: 576,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      arrows: !1
                    }
                  },
                  {
                    breakpoint: 400,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      arrows: !1
                    }
                  }
                ]
              });
        }
      });
    }
  },
  created() {
    this.loadProduct();
  },
  mounted() {
    // if (this.cartQuantity > 0) {
    this.fetchProducts();
    // }
  }
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
