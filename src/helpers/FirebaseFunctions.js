import firebase from "../firebase/firebaseConfig";
const db = firebase.firestore();

async function fetchCategories() {
  let categories = [];
  try {
    const querySnapshot = await db.collection("categories").get();
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        name: doc.data().name,
        iconClass: doc.data().icon_class,
      });
    });
    return categories;
  } catch (error) {
    throw new Error(error.message || "Error fetching categories");
  }
}

export { fetchCategories };
