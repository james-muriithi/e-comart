<template>
  <li class="cart-item alert fade show" v-if="product">
    <div class="cart-image">
      <a href="#"
        ><img
          :src="
            product.thumbnail || require(`../../assets/images/products/01.jpg`)
          "
          alt="product"
      /></a>
    </div>
    <div class="cart-info">
      <h5>
        <a
          href="#"
          data-toggle="tooltip"
          data-placement="top"
          :title="product.name ?? ''"
          >{{ product.name ?? "" }}</a
        >
      </h5>
      <span>{{ formatPrice(product.newPrice) }} X {{ itemCartQuantity }}</span>
      <h6>{{ formatPrice(product.newPrice * itemCartQuantity) }}</h6>
      <div class="product-action">
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
          v-model="itemCartQuantity"
        /><button
          class="action-plus"
          title="Quantity Plus"
          @click="increaseQuantity"
        >
          <i class="icofont-plus"></i>
        </button>
      </div>
    </div>
    <button
      class="cart-delete"
      data-dismiss="alert"
      @click="removeItemFromCart"
    >
      <i class="icofont-bin"></i>
    </button>
  </li>
</template>

<script>
import _ from "lodash";
import $ from "jquery";
export default {
  props: {
    id: {
      required: true,
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
    product() {
      return this.$store.getters.product(this.id);
    },
  },
  methods: {
    increaseQuantity() {
      this.$store.dispatch("increaseQuantity", this.id);
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
};
</script>

<style scoped>
h5 a {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>