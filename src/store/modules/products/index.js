import { fetchProducts } from "../../../helpers/FirebaseFunctions.js";
import { getFromStorage, saveToStorage } from "../../../helpers/LocalStorage";

export default {
  state() {
    return {
      products: []
    };
  },
  mutations: {
    setProducts(state, products) {
      state.products = Object.assign({}, state.products, products);
    }
  },
  actions: {
    async fetchProducts({ commit, getters }, forceReload = true) {
      if (!forceReload && (!getters.products || getters.products.length == 0)) {
        products = getFromStorage("products", true) || [];
        commit("setProducts", products);
      }

      if (!forceReload && getters.products.length > 0) {
        return;
      }

      let products = await fetchProducts();

      saveToStorage("products", products, true);

      commit("setProducts", products);
    }
  },
  getters: {
    products(state) {
      return state.products;
    },
    product(state) {
      return function(productId) {
        if (!state.products || state.products.length == 0) {
          return null;
        }
        return Object.values(state.products).find(prod => prod.id == productId);
      };
    }
  }
};
