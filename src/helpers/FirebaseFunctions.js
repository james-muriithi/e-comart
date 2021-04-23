import firebase from "../firebase/firebaseConfig";
const db = firebase.firestore();

async function fetchCategories() {
  let categories = [];
  try {
    const querySnapshot = await db.collection("categories").get();
    querySnapshot.forEach(async (doc) => {
      let subCategories = doc.data().sub_categories;

      let category = {
        id: doc.id,
        name: doc.data().name,
        iconClass: doc.data().icon_class,
        subCategories: subCategories,
      };

      categories.push(category);
    });
    return categories;
  } catch (error) {
    throw new Error(error.message || "Error fetching categories");
  }
}

async function fetchSubCategories(subCategories) {
  let subs = [];
  if (subCategories && subCategories.length > 0) {
    subCategories.forEach(async (d) => {
      const sc = await d.get();
      const scData = sc.data();
      subs.push({
        name: scData.name,
        url: scData.url,
      });
    });
  }

  return subs;
}

async function fetchProducts() {
  let products = [];
  try {
    const querySnapshot = await db.collection("products").get();
    querySnapshot.forEach(async (doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    throw new Error(error.message || "Error fetching categories");
  }
}

async function saveCart(cart, userId) {
  try {
    await db
      .collection("cart")
      .doc(userId)
      .set({...cart});
  } catch (error) {
    throw new Error(error.message || "Error saving cart");
  }
}

async function fetchCart(userId) {
  try {
    const doc = await db
      .collection("cart")
      .doc(userId)
      .get();
    return doc.data();
  } catch (error) {
    throw new Error(error.message || "Error saving cart");
  }
}

export {
  fetchCategories,
  fetchSubCategories,
  fetchProducts,
  saveCart,
  fetchCart,
};