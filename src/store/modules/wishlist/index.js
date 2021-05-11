import { fetchWishlist, saveWishlist } from "../../../helpers/FirebaseFunctions.js";
import {
    saveToStorage,
    getFromStorage
  } from "../../../helpers/LocalStorage.js";

export default {
  namespaced: true,
  state() {
    return {
      wishlist: [],
    };
  },
  getters: {
    wishlist(state) {
      return state.wishlist;
    },
    wishlistQuantity(state) {
      if (!state.wishlist || state.wishlist.length == 0) {
        return 0;
      }
      return state.wishlist.length;
    },
    itemInWishlist(state) {
        return function(productId) {
          if (!state.wishlist || state.wishlist.length == 0) {
            return ;
          }
          const cartItem = state.wishlist.find(item => item.productId == productId);
          return !!cartItem;
        };
      },
  },
  mutations: {
    setWishlistItems(state, items) {
      state.wishlist = items;
    },
    increaseQuantity(state, productId) {
      const productInCartIndex = state.wishlist.findIndex(
        (ci) => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.wishlist[productInCartIndex].qty++;
      }
    },
    decreaseQuantity(state, productId) {
      const productInCartIndex = state.wishlist.findIndex(
        (ci) => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.wishlist[productInCartIndex].qty--;
      }
    },
    changeItemQuantity(state, { productId, qty }) {
      const productInCartIndex = state.wishlist.findIndex(
        (ci) => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.wishlist[productInCartIndex].qty = parseInt(qty);
      }
    },
    removeItemFromWishlist(state, productId) {
      state.wishlist = state.wishlist.filter(
        (item) => item.productId != productId
      );
    },
    clearWishlist(state) {
      state.wishlist = [];
    },
    addToWishlist(state, item) {
      const productInCartIndex = state.wishlist.findIndex(
        (ci) => ci.productId === item
      );

      if (productInCartIndex >= 0) {
        state.wishlist = state.wishlist.filter(
            (i) => i.productId != item
          );
      } else {
        const newProduct = {
          productId: item,
          created_at: new Date(),
        };
        state.wishlist.push(newProduct);
      }
    },
  },
  actions: {
    setWishlistItems({ commit }, { items, saveLocal = false }) {
        commit("setWishlistItems", items);
        if (saveLocal) {
          saveToStorage("cart", items, true);
        }
      },
      addToWishlist({ dispatch, commit, rootState, state }, item) {
        commit("addToWishlist", item);
  
        const userId = rootState.auth.user ? rootState.auth.user.localId : null;
        dispatch("saveCart", { cart: state.wishlist, userId });
      },
      increaseQuantity({ dispatch, commit, rootState, state }, productId) {
        commit("increaseQuantity", productId);
        const userId = rootState.auth.user ? rootState.auth.user.localId : null;
        dispatch("saveCart", { cart: state.wishlist, userId });
      },
      decreaseQuantity({ dispatch, commit, rootState, state }, productId) {
        commit("decreaseQuantity", productId);
        const userId = rootState.auth.user ? rootState.auth.user.localId : null;
        dispatch("saveCart", { cart: state.wishlist, userId });
      },
      changeItemQuantity({ dispatch, commit, rootState, state }, payload) {
        commit("changeItemQuantity", payload);
        const userId = rootState.auth.user ? rootState.auth.user.localId : null;
        dispatch("saveCart", { cart: state.wishlist, userId });
      },
      removeItemFromCart({ dispatch, commit, rootState, state }, productId) {
        commit("removeItemFromCart", productId);
        const userId = rootState.auth.user ? rootState.auth.user.localId : null;
        dispatch("saveCart", { cart: state.wishlist, userId });
      },
      clearCart({ commit }) {
        commit("clearCart");
      },
      async saveCart(_, { cart, userId = null, saveLocal = true }) {
        if (saveLocal) {
          saveToStorage("wishlist", cart, true);
        }
        if (userId) {
          await saveWishlist(cart, userId);
        }
      },
      async loadCart({ dispatch, rootState }) {
        let cart = getFromStorage("wishlist", true) || [];
  
        let saveLocal = false;
  
        if (rootState.auth.user) {
          const dbCart =
            Object.values(await fetchWishlist(rootState.auth.user.localId)) || [];
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
        dispatch("setWishlistItems", { items: cart, saveLocal });
      }
  },
};
