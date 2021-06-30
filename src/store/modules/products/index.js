import {
  fetchProduct,
  fetchProducts
} from "../../../helpers/FirebaseFunctions.js";
import { getFromStorage, saveToStorage } from "../../../helpers/LocalStorage";

export default {
  state() {
    return {
      products: [],
      selectedProduct: null
    };
  },
  mutations: {
    setProducts(state, products) {
      state.products = Object.assign({}, state.products, products);
    },
    addProduct(state, product) {
      state.products = [...state.products, product];
    },
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
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
    async fetchProduct({ commit, getters }, productId) {
      let product = null;
      if (getters.products.length > 0) {
        product = Object.values(getters.products).find(
          prod => prod.id == productId
        );
      }

      if (!product) {
        product = await fetchProduct(productId);
      }

      commit("setSelectedProduct", product);
    }
  },
  getters: {
    products: state => (search = null) => {
      let products = state.products;
      if (search) {
        products = Object.values(products).filter(
          product =>
            product.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      }
      return products;
    },
    product(state) {
      return function(productId) {
        if (!state.products || state.products.length == 0) {
          return null;
        }
        return Object.values(state.products).find(prod => prod.id == productId);
      };
    },
    selectedProduct(state) {
      return state.selectedProduct;
    }
  }
};
