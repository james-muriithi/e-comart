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
      return state.cart.reduce((acc, item) => acc.qty + item.qty);
    },
    cartTotal(state) {
      if (!state.cart || state.cart.length == 0) {
        return 0;
      }

      return state.cart.reduce(
        (accumulator, item) => accumulator + parseFloat(item.newPrice)
      );
    },
  },
  mutations: {
    setCartItems(state, items) {
      state.cart = Object.assign({}, state.cart, items);
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
  },
};
