<template>
  <li class="cart-item alert fade show">
    <div class="cart-image">
      <a href="#"
        ><img
          :src="require(`../../assets/images/products/01.jpg`)"
          alt="product"
      /></a>
    </div>
    <div class="cart-info">
      <h5><a href="product-single.html">product name</a></h5>
      <span>$2.5 X 3</span>
      <h6>$6.15</h6>
      <div class="product-action">
        <button class="action-minus" title="Quantity Minus" @click="decreaseQuantity">
          <i class="icofont-minus"></i></button
        ><input
          class="action-input"
          title="Quantity Number"
          type="text"
          name="quantity"
          v-model="itemCartQuantity"
        /><button class="action-plus" title="Quantity Plus" @click="increaseQuantity">
          <i class="icofont-plus"></i>
        </button>
      </div>
    </div>
    <button class="cart-delete" data-dismiss="alert" @click="removeItemFromCart">
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