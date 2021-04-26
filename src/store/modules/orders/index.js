import { saveOrders } from "../../../helpers/FirebaseFunctions";

export default {
  state() {
    return {
      orders: [],
    };
  },
  getters: {
    orders(state) {
      return state.orders;
    },
  },
  mutations: {
    addOrder(state, order) {
      state.orders = [order, ...state.orders];
    },
  },
  actions: {
    async addOrder({ commit, state, rootState }, order) {
      commit("addOrder", order);
      const userId = rootState.auth.user ? rootState.auth.user.localId : null;
      if (userId) {
          console.log(state.orders);
        await saveOrders(state.orders, userId);
      }
    },
  },
};
