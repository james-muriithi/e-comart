import {
  saveToStorage,
  getFromStorage,
} from "../../../helpers/LocalStorage.js";
export default {
  state() {
    return {
      cart: [],
    };
  },
  getters: {
    cart(state) {
      return state.cart;
    },
    cartQuantity(state) {
      if (!state.cart || state.cart.length == 0) {
        return 0;
      }
      return state.cart.reduce((acc, item) => acc + item.qty, 0);
    },
    itemCartQuantity(state) {
      return function(productId) {
        if (!state.cart || state.cart.length == 0) {
          return 0;
        }
        const cartItem = state.cart.find((item) => item.productId == productId);
        return cartItem ? cartItem.qty : 0;
      };
    },
    cartTotal(state, _, _1, rootGetters) {
      if (!state.cart || state.cart.length == 0) {
        return 0;
      }

      let total = 0;

      state.cart.map((item) => {
        const price = rootGetters.product(item.productId)
          ? parseFloat(rootGetters.product(item.productId).newPrice)
          : 0;
        total += price;
      });

      return total;
    },
  },
  mutations: {
    setCartItems(state, items) {
      state.cart = items;
      saveToStorage("cart", state.cart, true);
    },
    increaseQuantity(state, productId) {
      const productInCartIndex = state.cart.findIndex(
        (ci) => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty++;
      }
      saveToStorage("cart", state.cart, true);
    },
    decreaseQuantity(state, productId) {
      const productInCartIndex = state.cart.findIndex(
        (ci) => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty--;
      }
      saveToStorage("cart", state.cart, true);
    },
    changeItemQuantity(state, { productId, qty }) {
      const productInCartIndex = state.cart.findIndex(
        (ci) => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty = parseInt(qty);
      }
      saveToStorage("cart", state.cart, true);
    },
    removeItemFromCart(state, productId) {
      state.cart = state.cart.filter((item) => item.productId != productId);
      saveToStorage("cart", state.cart, true);
    },
    clearCart(state) {
      state.cart = [];
      saveToStorage("cart", state.cart, true);
    },
    addToCart(state, item) {
      const productInCartIndex = state.cart.findIndex(
        (ci) => ci.productId === item
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty++;
      } else {
        const newProduct = {
          productId: item,
          qty: 1,
        };
        state.cart.push(newProduct);
      }
      saveToStorage("cart", state.cart, true);
    },
  },
  actions: {
    setCartItems({ commit }, items) {
      commit("setCartItems", items);
    },
    addToCart({ commit }, item) {
      commit("addToCart", item);
    },
    increaseQuantity({ commit }, productId) {
      commit("increaseQuantity", productId);
    },
    decreaseQuantity({ commit }, productId) {
      commit("decreaseQuantity", productId);
    },
    changeItemQuantity({ commit }, payload) {
      commit("changeItemQuantity", payload);
    },
    removeItemFromCart({ commit }, productId) {
      commit("removeItemFromCart", productId);
    },
    clearCart({ commit }) {
      commit("clearCart");
    },
    loadCart({ commit }) {
      const cart = getFromStorage("cart", true) || [];
      commit("setCartItems", cart);
    },
  },
};
