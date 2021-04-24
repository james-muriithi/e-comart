// import _ from "lodash";
import { fetchCart, saveCart } from "../../../helpers/FirebaseFunctions.js";
import {
  saveToStorage,
  getFromStorage
} from "../../../helpers/LocalStorage.js";
export default {
  state() {
    return {
      cart: []
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
        const cartItem = state.cart.find(item => item.productId == productId);
        return cartItem ? cartItem.qty : 0;
      };
    },
    cartTotal(state, _, _1, rootGetters) {
      if (!state.cart || state.cart.length == 0) {
        return 0;
      }

      let total = 0;

      state.cart.map(item => {
        const price = rootGetters.product(item.productId)
          ? parseFloat(rootGetters.product(item.productId).newPrice)
          : 0;
        total += price * item.qty;
      });

      return total;
    }
  },
  mutations: {
    setCartItems(state, items) {
      state.cart = items;
    },
    increaseQuantity(state, productId) {
      const productInCartIndex = state.cart.findIndex(
        ci => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty++;
      }
    },
    decreaseQuantity(state, productId) {
      const productInCartIndex = state.cart.findIndex(
        ci => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty--;
      }
    },
    changeItemQuantity(state, { productId, qty }) {
      const productInCartIndex = state.cart.findIndex(
        ci => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty = parseInt(qty);
      }
    },
    removeItemFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.productId != productId);
    },
    clearCart(state) {
      state.cart = [];
    },
    addToCart(state, item) {
      const productInCartIndex = state.cart.findIndex(
        ci => ci.productId === item
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty++;
      } else {
        const newProduct = {
          productId: item,
          qty: 1
        };
        state.cart.push(newProduct);
      }
    }
  },
  actions: {
    setCartItems({ commit }, { items, saveLocal = false }) {
      commit("setCartItems", items);
      if (saveLocal) {
        saveToStorage("cart", items, true);
      }
    },
    addToCart({ dispatch, commit, rootState, state }, item) {
      commit("addToCart", item);

      const userId = rootState.auth.user ? rootState.auth.user.localId : null;
      dispatch("saveCart", { cart: state.cart, userId });
    },
    increaseQuantity({ dispatch, commit, rootState, state }, productId) {
      commit("increaseQuantity", productId);
      const userId = rootState.auth.user ? rootState.auth.user.localId : null;
      dispatch("saveCart", { cart: state.cart, userId });
    },
    decreaseQuantity({ dispatch, commit, rootState, state }, productId) {
      commit("decreaseQuantity", productId);
      const userId = rootState.auth.user ? rootState.auth.user.localId : null;
      dispatch("saveCart", { cart: state.cart, userId });
    },
    changeItemQuantity({ dispatch, commit, rootState, state }, payload) {
      commit("changeItemQuantity", payload);
      const userId = rootState.auth.user ? rootState.auth.user.localId : null;
      dispatch("saveCart", { cart: state.cart, userId });
    },
    removeItemFromCart({ dispatch, commit, rootState, state }, productId) {
      commit("removeItemFromCart", productId);
      const userId = rootState.auth.user ? rootState.auth.user.localId : null;
      dispatch("saveCart", { cart: state.cart, userId });
    },
    clearCart({ commit }) {
      commit("clearCart");
    },
    async saveCart(_, { cart, userId = null, saveLocal = true }) {
      if (saveLocal) {
        saveToStorage("cart", cart, true);
      }
      if (userId) {
        await saveCart(cart, userId);
      }
    },
    async loadCart({ dispatch, rootState }) {
      let cart = getFromStorage("cart", true) || [];

      let saveLocal = false;

      if (rootState.auth.user) {
        const dbCart =
          Object.values(await fetchCart(rootState.auth.user.localId)) || [];
        if (dbCart.length > 0) {
          saveLocal = true;
          cart = dbCart;
          // let data = [...dbCart, ...cart];
          // let localItems = _.differenceBy(cart, dbCart, 'productId')
          // cart = [...dbCart, ...localItems]
          // cart = _.chain(data)
          //   .groupBy("productId")
          //   .map(function(objects, productId) {
          //     return {
          //       productId,
          //       qty: _.sumBy(objects, "qty"),
          //     };
          //   })
          //   .value();
        } else {
          dispatch("saveCart", {
            cart,
            userId: rootState.auth.user.localId,
            saveLocal
          });
        }
      }
      dispatch("setCartItems", { items: cart, saveLocal });
    }
  }
};
