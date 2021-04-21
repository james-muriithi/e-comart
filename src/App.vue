<template>
  <router-view></router-view>
  <cart-mobile></cart-mobile>
</template>

<script>
// import firebase from "./firebase/firebaseConfig";
// const db = firebase.firestore();

export default {
  name: "App",
  created() {
    this.$store.dispatch("tryLogin");
  }
};
</script>
