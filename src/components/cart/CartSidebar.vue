<template>
  <aside class="sidebar-check">
    <div class="check-container">
      <div class="check-header">
        <button class="check-close"><i class="icofont-close"></i></button>
        <div class="cart-total">
          <i class="icofont-basket"></i>
          <h5 class="mt-2">
            <span>total items </span><span>({{ cartQuantity }})</span>
          </h5>
        </div>
      </div>
      <ul class="cart-list pt-4">
        <div class="text-center w-100" v-if="!cart || cart.length == 0">
          <p class="h6">No products in cart</p>
        </div>
        <cart-product v-for="item in cart" :key="item.productId" :id="item.productId"></cart-product>
      </ul>
      <div class="check-footer">
        <button class="voucher-btn">Do you have a coupon code?</button>
        <form class="voucher-form">
          <input type="text" placeholder="Enter your voucher code" /><button
            type="submit"
            class="btn btn-inline"
          >
            apply
          </button>
        </form>
        <a href="checkout.html" class="check-btn"
          ><span class="check-title">checkout</span
          ><span class="check-price">{{formatPrice(cartTotal)}}</span></a
        >
      </div>
    </div>
  </aside>
</template>

<script>
import $ from "jquery";
import CartProduct from "./CartProduct.vue";
export default {
  components: {
    CartProduct,
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    cartQuantity() {
      return this.$store.getters.cartQuantity;
    },
    cartTotal(){
      return this.$store.getters.cartTotal
    }
  },
  mounted() {
    $(".icon-check, .mobile-check").on("click", function () {
      $("body").css("overflow", "hidden"),
        $(".sidebar-check").addClass("active"),
        $(".nav-close, .check-close").on("click", function () {
          $("body").css("overflow-y", "scroll"),
            $(".sidebar-check").removeClass("active");
        });
    });

    $(".voucher-btn").on("click", function () {
      $(this).hide(),
        $(".check-footer").css("margin-top", "0px"),
        $(".voucher-form").css("display", "flex");
    }),
      $(".load-btn .btn").click(function () {
        $(this).append(
          '<span class="spinner-border spinner-border-sm"></span>'
        );
      });
  },
};
</script>