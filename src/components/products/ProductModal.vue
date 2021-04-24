<template>
  <teleport to="body">
    <div class="modal fade" :id="`product-view${id}`">
      <div class="modal-dialog">
        <div class="modal-content">
          <button
            class="modal-close icofont-close"
            data-dismiss="modal"
          ></button>
          <div class="product-view">
            <div class="row">
              <div class="col-md-6 col-lg-6">
                <div class="product-gallery">
                  <ul class="preview-slider">
                    <li v-for="image in images" :key="image">
                      <img :src="image" alt="product" />
                    </li>
                  </ul>

                  <ul class="thumb-slider">
                    <li v-for="image in images" :key="image">
                      <img :src="image" alt="product" />
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6 col-lg-6">
                <div class="product-details">
                  <h3 class="details-name">
                    <router-link :to="`/product/${id}`">{{ name }}</router-link>
                  </h3>
                  <div class="details-meta">
                    SKU:<span class="details-sku">{{ sku }}</span
                    >BRAND:<a class="details-brand" href="#">{{ brand }}</a>
                  </div>
                  <h3 class="details-price">
                    <span>{{ formatPrice(newPrice) }}</span
                    ><del>{{ formatPrice(oldPrice) }}</del>
                  </h3>
                  <p class="details-desc">
                    {{ description }}
                  </p>
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
                    <button
                      :class="`details-cart${
                        itemCartQuantity > 0 ? ' d-none' : ''
                      }`"
                      title="Add Your Cartlist"
                      @click="addToCart"
                    >
                      <i class="icofont-cart"></i><span>add to cart</span>
                    </button>
                    <div
                      :class="`details-action${
                        itemCartQuantity > 0 ? ' d-flex' : ''
                      }`"
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
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import $ from "jquery";
import _ from "lodash";
export default {
  props: {
    id: {
      required: true,
    },
    images: {
      required: true,
      type: Array,
    },
    sku: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    newPrice: {
      // type: String,
      required: true,
    },
    oldPrice: {
      // type: String,
      required: false,
    },
    description: {
      type: String,
      default: "",
    },
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
  },
  computed: {
    itemCartQuantity: {
      get: function () {
        return this.$store.getters.itemCartQuantity(this.id);
      },
      set: _.debounce(function (newVal) {
        if (newVal && newVal < 0) {
          return this.itemCartQuantity;
        }
        if (newVal && newVal != this.itemCartQuantity) {
          this.changeItemQuantity(newVal);
        }
      }, 500),
    },
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
        }),
      $(".modal").on("shown.bs.modal", function () {
        $(".preview-slider, .thumb-slider").slick("setPosition"),
          $(".product-details-image").addClass("slider-opacity");
      });
  },
};
</script>