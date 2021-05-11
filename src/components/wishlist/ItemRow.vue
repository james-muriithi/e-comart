<template>
  <tr>
    <td>
      <h5>{{ index }}</h5>
    </td>
    <td class="d-flex">
      <img
        :src="
          product.thumbnail || require(`../../assets/images/products/01.jpg`)
        "
        alt="product"
      />
      <router-link :to="`/product/${id}`" class="product-name ml-2">{{
        product.name
      }}</router-link>
    </td>
    <td>
      <h5>{{ formatPrice(product.newPrice) }}</h5>
    </td>
    <td>
      <ul class="table-action">
        <li>
          <a
            class="view"
            href="#"
            title="View This Item"
            data-toggle="modal"
            :data-target="`#product-view${id}`"
            ><i class="icofont-eye-alt"></i
          ></a>
        </li>
        <li v-if="!order">
          <a
            class="trash"
            href="#"
            title="Remove This Item"
            @click.prevent="removeItemFromCart"
            ><i class="icofont-trash"></i
          ></a>
        </li>
        <li>
          <a class="view" href="#" title="Add to Cart">
            <i class="icofont-shopping-cart"></i>
          </a>
        </li>
      </ul>
    </td>
    <product-modal
      :id="id"
      :images="product.images || []"
      :name="product.name"
      :newPrice="product.newPrice"
      :oldPrice="product.oldPrice"
      :brand="product.brand || ''"
      :sku="product.sku || ''"
      :description="product.description || ''"
    >
    </product-modal>
  </tr>
</template>

<script>
import ProductModal from "../products/ProductModal.vue";
export default {
  components: {
    ProductModal
  },
  props: {
    id: {
      required: true
    },
    index: {
      required: true
    },
    order: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    itemCartQuantity() {
      return this.order
        ? this.qty
        : this.$store.getters.itemCartQuantity(this.id);
    },
    product() {
      return this.$store.getters.product(this.id);
    }
  },
  methods: {
    removeItemFromCart() {
      this.$store.dispatch("removeItemFromCart", this.id);
    }
  }
};
</script>
