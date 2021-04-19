import firebase from "../firebase/firebaseConfig";
const db = firebase.firestore();

async function fetchCategories() {
  let categories = [];
  try {
    const querySnapshot = await db.collection("categories").get();
    querySnapshot.forEach((doc) => {
      let category = {
        id: doc.id,
        name: doc.data().name,
        iconClass: doc.data().icon_class,
        subCategories: [],
      };

      let subCategories = doc.data().sub_categories;
      if (subCategories && subCategories.length > 0) {
        subCategories.forEach(async (d) => {
          const sc = await d.get();
          const scData = sc.data();
          category.subCategories.push({
            name: scData.name,
            url: scData.url,
          });
        });
      }
      categories.push(category);
    });
    return categories;
  } catch (error) {
    throw new Error(error.message || "Error fetching categories");
  }
}

async function fetchSubCategory(id, collection = "sub_categories") {
  const subCategory = await db
    .collection(collection)
    .doc(id)
    .get();
  return subCategory;
}

export { fetchCategories, fetchSubCategory };
