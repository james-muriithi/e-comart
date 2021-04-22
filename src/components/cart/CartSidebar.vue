<template>
  <aside class="sidebar-check">
    <div class="check-container">
      <div class="check-header">
        <button class="check-close"><i class="icofont-close"></i></button>
        <div class="cart-total">
          <i class="icofont-basket"></i>
          <h5 class="mt-2">
            <span>total items </span><span>({{cartQuantity}})</span>
          </h5>
        </div>
      </div>
      <ul class="cart-list pt-4">
        <div class="text-center w-100" v-if="!cart || cart.length == 0">
          <p class="h6">
            No products in cart
          </p>
        </div>
        <li
          class="cart-item alert fade show"
          v-for="item in cart"
          :key="item.productId"
        >
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
              <button class="action-minus" title="Quantity Minus">
                <i class="icofont-minus"></i></button
              ><input
                class="action-input"
                title="Quantity Number"
                type="text"
                name="quantity"
                :value="item.qty"
              /><button class="action-plus" title="Quantity Plus">
                <i class="icofont-plus"></i>
              </button>
            </div>
          </div>
          <button class="cart-delete" data-dismiss="alert">
            <i class="icofont-bin"></i>
          </button>
        </li>
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
          ><span class="check-price">$369.78</span></a
        >
      </div>
    </div>
  </aside>
</template>

<script>
import $ from "jquery";
export default {
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    cartQuantity(){
      return this.$store.getters.cartQuantity
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