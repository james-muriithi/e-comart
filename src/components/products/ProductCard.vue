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
        <a class="product-image" href="#"
          ><img :src="thumbnail" alt="product"
        /></a>
      </figure>
      <div class="product-content">
        <h5 class="product-price">
          <span>{{ formatPrice(newPrice) }}</span
          ><del>{{ formatPrice(oldPrice) }}</del>
        </h5>
        <h5
          class="product-name"
          data-toggle="tooltip"
          data-placement="top"
          :title="name"
        >
          <router-link :to="`/product/${id}`">{{ name }}</router-link>
        </h5>
        <div class="product-action-group">
          <div
            :class="`product-action${itemCartQuantity > 0 ? ' d-none' : ''}`"
          >
            <button class="action-wish" title="Product Wish">
              <i class="icofont-ui-love"></i></button
            ><button
              class="action-cart"
              @click="addToCart"
              ref="addToCart"
              title="Add to Cart"
            >
              <span>add to cart</span></button
            ><button
              class="action-view"
              title="Product View"
              data-toggle="modal"
              :data-target="`#product-view${id}`"
            >
              <i class="icofont-eye-alt"></i>
            </button>
          </div>
          <div
            :class="`product-action${itemCartQuantity > 0 ? ' d-flex' : ''}`"
          >
            <button
              class="action-minus"
              title="Quantity Minus"
              @click="decreaseQuantity"
            >
              <i class="icofont-minus"></i></button
            ><input
              class="action-input"
              title="Quantity Number"
              type="text"
              name="quantity"
              v-model.trim="itemCartQuantity"
            /><button
              class="action-plus"
              title="Quantity Plus"
              @click="addToCart"
            >
              <i class="icofont-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import $ from "jquery";
import _ from "lodash";

export default {
  props: {
    id: {
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
    thumbnail: {
      type: String,
      required: true,
      default: require("../../assets/images/products/01.jpg"),
    },
    labels: {
      type: Array,
      required: true,
    },
    sku: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
  watch: {
    itemCartQuantity: {
      handler: _.debounce(function () {
        if (this.itemCartQuantity == 0) {
          this.removeItemFromCart();
          var c = $(this.$refs.addToCart)
            .parents(".product-action-group")
            .children();
          c.first().css("display", "flex"), c.last().css("display", "none");
        }
      }, 500),
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
    removeItemFromCart() {
      this.$store.dispatch("removeItemFromCart", this.id);
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
    $(".action-cart").on("click", function () {
      var c = $(this).parents(".product-action-group").children();
      c.first().css("display", "none"), c.last().css("display", "flex");
    }),
      $(".action-wish").on("click", function () {
        $(this).toggleClass("active");
      });
  },
};
</script>

<style scoped>
.product-name a {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.product-price {
  font-size: 16px;
}
@media screen and (max-width: 476px) {
  .product-price {
    font-size: 14px;
  }
  .product-name a {
    font-size: 15px;
  }
}
</style>
