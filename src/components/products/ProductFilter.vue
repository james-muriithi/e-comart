<template>
  <div class="product-filter w-100">
    <div>
      <button class="column-3" data-toggle="tooltip" title="Refresh" @click="refresh">
        <i class="icofont-refresh" style="color: var(--primary); background: var(--primary-light)"></i>
      </button>
    </div>
    <div class="product-filter-short ml-auto">
      <label class="form-label">sort by:</label
      ><select class="form-select">
        <option value="default">default</option>
        <option value="new">new product</option>
        <option value="discount">discount product</option>
      </select>
    </div>
    <!-- <ul class="product-filter-list">
      <li>
        <button class="column-3" data-toggle="tooltip" title="Three Column">
          <i
            class="icofont-justify-all"
            style="color: var(--primary); background: var(--primary-light)"
          ></i>
        </button>
      </li>
      <li>
        <button class="column-4" data-toggle="tooltip" title="Four Column">
          <i
            class="icofont-indent"
            style="color: var(--white); background: var(--primary)"
          ></i>
        </button>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  emits: ['refresh'],
  methods: {
    refresh(){
      this.$emit('refresh')
    }
  }
}
</script>