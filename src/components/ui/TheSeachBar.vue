<template>
  <input type="text" placeholder="Search anything..." />
  <button type="submit" aria-label="Search">
    <i class="icofont-ui-search"></i><span v-if="title">search</span>
  </button>

</template>

<script>
export default {
    props: ['title']
}
</script>