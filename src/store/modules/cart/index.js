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

      state.cart.map(item => {
        total += parseFloat(rootGetters.product(item.productId).newPrice)
      });

      return total;
    },
  },
  mutations: {
    setCartItems(state, items) {
      state.cart = Object.assign({}, state.cart, items);
    },
    increaseQuantity(state, productId) {
      const productInCartIndex = state.cart.findIndex(
        (ci) => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty++;
      }
    },
    decreaseQuantity(state, productId) {
      const productInCartIndex = state.cart.findIndex(
        (ci) => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty--;
      }
    },
    changeItemQuantity(state, { productId, qty }) {
      const productInCartIndex = state.cart.findIndex(
        (ci) => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty = parseInt(qty);
      }
    },
    removeItemFromCart(state, productId) {
      state.cart = state.cart.filter((item) => item.productId != productId);
    },
    clearCart(state) {
      state.cart = [];
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
  },
};
