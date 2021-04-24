import { fetchProduct, fetchProducts } from "../../../helpers/FirebaseFunctions.js";
import { getFromStorage, saveToStorage } from "../../../helpers/LocalStorage";

export default {
  state() {
    return {
      products: [],
      selectedProduct: null,
    };
  },
  mutations: {
    setProducts(state, products) {
      state.products = Object.assign({}, state.products, products);
    },
    setSelectedProduct(state, product){
      state.selectedProduct = product
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
    },
    async fetchProduct({commit, getters}, productId){
      let product = null;
      if (getters.products.length > 0) {
        product = Object.values(getters.products).find(prod => prod.id == productId)
      }

      if (!product) {
        product = await fetchProduct(productId)
      }
      commit('setSelectedProduct', product)
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
    },
    selectedProduct(state){
      return state.selectedProduct;
    }
  }
};
