<template>
  <div class="col-lg-12">
    <div class="account-card mb-0">
      <div class="account-title">
        <h4>payment option</h4>
        <button data-toggle="modal" data-target="#payment-add">add</button>
      </div>
      <div class="account-content">
        <div class="row">
          <div class="col-md-6 col-lg-4 alert fade show">
            <div class="payment-card payment active">
              <img
                :src="require('../../assets/images/cash-on-delivery.png')"
                alt="payment"
                height="23"
              />
              <h4>cash on delivery</h4>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 alert fade show">
            <div class="payment-card payment">
              <img
                :src="require('../../assets/images/mpesa-logo.png')"
                alt="mpesa"
                height="19"
              />
              <h4>mpesa</h4>
              <ul class="user-action">
                <li>
                  <button
                    class="edit"
                    title="Edit This"
                    data-toggle="modal"
                    data-target="#address-edit"
                  >
                    <i class="icofont-edit"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="checkout-proced mt-4 mb-1 text-right"
          v-show="cartQuantity > 0"
        >
          <button @click="checkout" class="btn btn-inline">
            proceed to checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartQuantity() {
      return this.$store.getters.cartQuantity;
    },
    cart() {
      return this.$store.getters.cart;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    }
  },
  methods: {
    async checkout() {
      await this.$store.dispatch("addOrder", {
        id: this.generateOrderId(),
        products: this.cart,
        sub_total: this.cartTotal,
        total: this.cartTotal,
        discount: 0,
        status: 1,
        delivery_feee: 0,
        created_at: new Date()
      });
      this.$store.dispatch("clearCart");
      //set alert
      await this.$store.dispatch("alert/setAlert", {
        message: "Your order was received"
      });
      this.$router.push("/");
    }
  },
  mounted() {
    this.$store.dispatch('loadOrders');
  }
};
</script>

<style scoped>
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

user-action li button i {
  width: 30px;
  height: 32px;
  line-height: 32px;
  border-radius: 6px;
  text-align: center;
  display: inline-block;
  text-shadow: var(--primary-tshadow);
}
.user-action .edit i {
  color: var(--edit-color);
  background: var(--edit-bg);
}
.user-action .edit i:hover {
  color: var(--white);
  background: var(--edit-color);
}
.user-action .delete i {
  color: var(--delete-color);
  background: var(--delete-bg);
}
.user-action .delete i:hover {
  color: var(--white);
  background: var(--delete-color);
}
.breadcrumb {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: none;
  padding: 0px;
  margin-bottom: 0px;
}
.profile-card:hover .user-action {
  visibility: visible;
  opacity: 1;
}
.profile-card h5 {
  margin-bottom: 8px;
}
.profile-card p {
  text-transform: capitalize;
}
.payment-card.active {
  background: var(--primary-light);
  border-color: var(--primary);
}
@media (max-width: 991px) {
  .profile-card {
    margin-bottom: 30px;
  }
}
.payment-card {
  padding: 25px;
  border-radius: 6px;
  background: var(--body);
  border: 1px solid var(--border);
  cursor: pointer;
}
.payment-card:hover .user-action {
  visibility: visible;
  opacity: 1;
}
</style>
