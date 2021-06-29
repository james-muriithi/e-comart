<template>
  <div class="details-group">
    <label class="details-group-title">Share:</label>
    <ul class="details-share-list">
      <li><a href="#" class="icofont-facebook"></a></li>
      <li><a href="#" class="icofont-twitter"></a></li>
      <li><a href="#" class="icofont-linkedin"></a></li>
      <li><a href="#" @click.prevent="share" class="icofont-share"></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    share() {
      if (navigator.share) {
        navigator
          .share({
            title: this.title,
            text: `Checkout this product i found:\n${this.title}\n`,
            url: this.url
          })
          .then(() => console.log("Successful share"))
          .catch(error => console.log("Error sharing", error));
      }
    }
  }
};
</script>
