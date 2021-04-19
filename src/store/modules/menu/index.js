import { fetchCategories } from "../../../helpers/FirebaseFunctions.js";
import { getFromStorage } from "../../../helpers/LocalStorage.js";

export default {
  state() {
    return {
      categories: []
    };
  },
  mutations: {
    setCategories(state, { categories }) {
      console.log(categories);
      state.categories = Object.assign({}, state.categories, categories);
    }
  },
  actions: {
    async fetchCategories({ commit, getters }, forceReload = true) {
      if (
        !forceReload &&
        (!getters.categories || getters.categories.length == 0)
      ) {
        categories = getFromStorage("categories", true) || [];
        commit("setCategories", { categories });
      }

      if (!forceReload && getters.categories.length > 0) {
        return;
      }

      let categories = await fetchCategories();

      //   saveToStorage("categories", categories, true);

      commit("setCategories", { categories });
    }
  },
  getters: {
    categories(state) {
      return state.categories;
    }
  }
};
