<template>
  <tr>
    <td>
      <h5>{{ index }}</h5>
    </td>
    <td class="d-flex">
      <img
        :src="product.thumbnail || require(`../../assets/images/products/01.jpg`)"
        alt="product"
      />
      <router-link :to="`/product/${id}`" class="product-name ml-2">{{ product.name }}</router-link>
    </td>
    <td>
      <h5>{{formatPrice(product.newPrice)}}</h5>
    </td>
    <td><h5>{{itemCartQuantity}}</h5></td>
    <td><h5>{{formatPrice(itemCartQuantity * product.newPrice)}}</h5></td>
    <td>
      <ul class="table-action">
        <li>
          <a
            class="view"
            href="#"
            title="View This Item"
            data-toggle="modal"
            data-target="#product-view"
            ><i class="icofont-eye-alt"></i
          ></a>
        </li>
        <li>
          <a class="trash" href="#" title="Remove This Item"
            ><i class="icofont-trash"></i
          ></a>
        </li>
      </ul>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
    },
    index: {
        required: true
    }
  },
  computed: {
    itemCartQuantity() {
      return this.$store.getters.itemCartQuantity(this.id);
    },
    product() {
        console.log(this.$store.getters.product(this.id));
      return this.$store.getters.product(this.id);
    },
  },
};
</script>