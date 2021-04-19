<template>
  <li class="category loading-item"></li>
</template>

<style scoped>
.category {
  max-height: 4.75em;
  overflow: hidden;
  padding: 0.5em 1em;
  margin: 1.5em 1.3em;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.loading-item {
  background: linear-gradient(-45deg, #dddddd, #f0f0f0, #dddddd, #f0f0f0);
  background-size: 400% 400%;
  -webkit-animation: Gradient 2.25s ease infinite;
  -moz-animation: Gradient 2.25s ease infinite;
  animation: Gradient 2.25s ease infinite;
}

@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
