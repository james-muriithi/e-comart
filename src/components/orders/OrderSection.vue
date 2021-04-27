<template>
  <section class="orderlist-part mt-4 mb-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="orderlist-filter">
            <h3>
              total orders <span>- ({{ orders.length }})</span>
            </h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12" v-if="!isLoading">
          <div class="orderlist" v-for="order in orders" :key="order.id">
            <div class="orderlist-head">
              <h4>order#{{ order.id }}</h4>
              <h4>order recieved</h4>
            </div>
            <div class="orderlist-body">
              <div class="row">
                <div class="col-lg-12">
                  <div class="order-track">
                    <ul class="order-track-list">
                      <li class="order-track-item active">
                        <i class="icofont-check"></i><span>order recieved</span>
                      </li>
                      <li class="order-track-item">
                        <i class="icofont-close"></i
                        ><span>order processed</span>
                      </li>
                      <li class="order-track-item">
                        <i class="icofont-close"></i><span>order shipped</span>
                      </li>
                      <li class="order-track-item">
                        <i class="icofont-close"></i
                        ><span>order delivered</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-5">
                  <ul class="orderlist-details">
                    <li>
                      <h5>order id</h5>
                      <p>{{ order.id }}</p>
                    </li>
                    <li>
                      <h5>Total Items</h5>
                      <p>{{ order.products.length }} Items</p>
                    </li>
                    <li>
                      <h5>Order Time</h5>
                      <p>{{ order.created_at.toDate().toDateString() }}</p>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-4">
                  <ul class="orderlist-details">
                    <li>
                      <h5>Sub Total</h5>
                      <p>{{ formatPrice(order.sub_total) }}</p>
                    </li>
                    <li>
                      <h5>discount</h5>
                      <p>{{ formatPrice(order.discount) }}</p>
                    </li>
                    <li>
                      <h5>delivery fee</h5>
                      <p>{{ formatPrice(order.delivery_fee) }}</p>
                    </li>
                    <li>
                      <h5>Total<small>(Incl. VAT)</small></h5>
                      <p>{{ formatPrice(order.total) }}</p>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-3">
                  <div class="orderlist-deliver">
                    <h5>Delivery location</h5>
                    <p>_____________</p>
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="table-scroll">
                    <table class="table-list">
                      <thead>
                        <tr>
                          <th scope="col">SL No</th>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <item-row
                          v-for="(item, index) in order.products"
                          :key="index"
                          :index="index + 1"
                          :id="item.productId"
                          :qty="item.qty"
                          :order="true"
                        ></item-row>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="load-btn mt-5">
            <button class="btn btn-outline">Load more items</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import ItemRow from "../checkout/ItemRow.vue";
export default {
  components: {
    ItemRow,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    orders() {
      return this.$store.getters.orders;
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
    async fetchOrders() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("loadOrders");
      } catch (error) {
        console.log(error);
        this.error = error.message || "error";
      }
      this.isLoading = false;
      //after loading 
      var i = $(".orderlist-body").hide();
      i.first().show(),
        $(document).on("click", ".orderlist-head", function () {
          var n = $(this);
          if (n.next().css('display') != 'none') {
              i.slideUp()
          }else{
              i.slideUp(), n.next().slideDown();
          }
        });
    },
  },
  mounted() {
    this.fetchProducts();
    this.fetchOrders();
  },
};
</script>

<style scoped>
.orderlist-filter {
  margin-bottom: 45px;
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
}
.filter-short {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.filter-short .form-label {
  font-size: 18px;
  margin: 0px 8px 0px 0px;
  color: var(--heading);
}
.filter-short .form-select {
  width: 150px;
  background: var(--white);
}
.table-scroll {
  padding: 0px;
}
.orderlist {
  padding: 0px 30px;
  border-radius: 8px;
  margin-bottom: 30px;
  background: var(--white);
  border: 1px solid var(--primary);
}
.orderlist:last-child {
  margin-bottom: 0px;
}
.orderlist-head {
  padding: 30px 0px;
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
  cursor: pointer;
}
.orderlist-head h4 {
  color: var(--primary);
}
.orderlist-details {
  padding: 25px;
  border-radius: 8px;
  background: var(--body);
  margin-bottom: 30px;
}
.orderlist-details li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: start;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 20px;
}
.orderlist-details li:last-child {
  margin-bottom: 0px;
}
.orderlist-details li h5 {
  line-height: 26px;
  white-space: nowrap;
}
.orderlist-details li h5 small {
  font-size: 14px;
  font-weight: 700;
  margin-left: 3px;
}
.orderlist-details li p {
  width: 250px;
  text-align: right;
}
.orderlist-deliver {
  height: 215px;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 30px;
  background: var(--body);
}
.orderlist-deliver h5 {
  margin-bottom: 15px;
}
.orderlist-deliver p {
  text-transform: capitalize;
}
@media (max-width: 575px) {
  .orderlist-filter {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .orderlist-filter h3 {
    margin-bottom: 15px;
  }
  .orderlist {
    padding: 0px 15px;
  }
  .orderlist-head {
    padding: 15px 0px;
  }
  .orderlist-body ul,
  .orderlist-deliver {
    padding: 15px;
  }
}
</style>