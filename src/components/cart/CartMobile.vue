<template>
  <div class="mobile-check">
    <button class="check-btn">
      <span class="check-item"
        ><i class="icofont-basket"></i><span>{{cartQuantity}} items</span></span
      ><span class="check-price">$00.00</span>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    cartQuantity(){
      return this.$store.getters.cartQuantity
    },
  },
}
</script>