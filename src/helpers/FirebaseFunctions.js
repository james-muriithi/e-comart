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
        subCategories: await fetchSubCategories(subCategories)
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

export { fetchCategories };
