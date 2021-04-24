<template>
  <section class="checkout-part">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="account-card">
            <div class="account-title"><h4>Your Cart</h4></div>
            <div class="account-content">
              <div class="table-scroll">
                <table class="table-list" v-if="!isLoading">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                      <th scope="col">action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <item-row
                    v-for="(item, index) in cart"
                    :key="index"
                    :index="index+1"
                    :id="item.productId"
                    ></item-row>
                  </tbody>
                </table>
              </div>
              <div class="chekout-voucher">
                <button class="voucher-btn">Do you have a coupon code?</button>
                <form class="voucher-form">
                  <input
                    type="text"
                    placeholder="Enter your voucher code"
                  /><button type="submit" class="btn btn-inline">apply</button>
                </form>
              </div>
              <div class="checkout-charge">
                <ul>
                  <li><span>Sub total</span><span>$267.45</span></li>
                  <li><span>delivery fee</span><span>$10.00</span></li>
                  <li><span>discount</span><span>$00.00</span></li>
                  <li>
                    <span>Total<small>(Incl. VAT)</small></span
                    ><span>$277.00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ItemRow from "./ItemRow.vue";
export default {
    data(){
        return {
            isLoading: false,
        }
    },
  components: { ItemRow },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
  },
  methods: {
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
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.table-scroll {
  padding: 0px;
}
.profile-image {
  text-align: center;
}
.profile-image a {
  border-radius: 50%;
  border: 2px solid var(--primary);
}
.profile-image a img {
  width: 80px;
  border-radius: 50%;
  border: 3px solid var(--white);
}
.profile-card {
  position: relative;
}
.profile-card .user-action {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: absolute;
  top: 50%;
  right: 15px;
  opacity: 0;
  visibility: hidden;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  transition: all linear 0.3s;
  -webkit-transition: all linear 0.3s;
  -moz-transition: all linear 0.3s;
  -ms-transition: all linear 0.3s;
  -o-transition: all linear 0.3s;
}
.profile-card .user-action li {
  margin: 5px 0px;
}
.payment-card {
  position: relative;
}
.payment-card .user-action {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: absolute;
  top: 15px;
  right: 15px;
  opacity: 0;
  visibility: hidden;
  transition: all linear 0.3s;
  -webkit-transition: all linear 0.3s;
  -moz-transition: all linear 0.3s;
  -ms-transition: all linear 0.3s;
  -o-transition: all linear 0.3s;
}
.modal-form {
  width: 400px;
  padding: 30px;
  border-radius: 8px;
  background: var(--white);
}
.chekout-voucher {
  width: 600px;
  margin: 45px auto 5px;
  text-align: center;
}
.checkout-charge {
  width: 600px;
  margin: 0 auto;
}
.checkout-charge ul {
  border-top: 3px solid var(--primary);
}
.checkout-charge ul li {
  padding: 15px 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
}
.checkout-charge ul li:last-child {
  border-bottom: none;
}
.checkout-charge ul li:last-child span {
  font-size: 18px;
  font-weight: 900;
  color: var(--primary);
}
.checkout-charge ul li span {
  font-weight: 700;
  color: var(--heading);
  text-transform: capitalize;
}
.checkout-charge ul li span small {
  font-size: 14px;
  font-weight: 700;
  margin-left: 3px;
}
.checkout-check {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: start;
  margin-bottom: 25px;
  margin-top: 50px;
}
.checkout-check input {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-top: 4px;
  cursor: pointer;
}
.checkout-check label {
  line-height: 22px;
}
.checkout-check label a {
  color: var(--primary);
}
.checkout-check label a:hover {
  text-decoration: underline;
}
.checkout-proced .btn {
  width: 100%;
}
@media (max-width: 575px) {
  .modal-form {
    width: 100%;
  }
}
@media (max-width: 767px) {
  .chekout-voucher,
  .checkout-charge {
    width: 100%;
  }
}
</style>