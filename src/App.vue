<template>
  <router-view></router-view>
</template>

<script>
// import firebase from "./firebase/firebaseConfig";
// const db = firebase.firestore();

export default {
  name: "App",
  created() {
    this.$store.dispatch("tryLogin");
    // let categoriesData = [];
    // db.collection('categories').get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //        categoriesData.push({
    //           id: doc.id,
    //           name: doc.data().name,
    //           iconClas: doc.data().icon_class,
    //         });
    //         console.log(doc.id, " => ", doc.data());
    //       });
    //       return categoriesData
    //     })
    //     .catch((error) => {
    //       console.log("Error getting documents: ", error);
    //     });
  }
};
</script>
