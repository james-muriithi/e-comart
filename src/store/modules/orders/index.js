import { fetchOrders, saveOrders } from "../../../helpers/FirebaseFunctions";

export default {
  state() {
    return {
      orders: []
    };
  },
  getters: {
    orders(state) {
      return state.orders;
    }
  },
  mutations: {
    addOrder(state, order) {
      state.orders = [order, ...state.orders];
    },
    setOrders(state, orders) {
      state.orders = orders;
    }
  },
  actions: {
    async addOrder({ commit, state, rootState }, order) {
      commit("addOrder", order);
      const userId = rootState.auth.user ? rootState.auth.user.localId : null;
      if (userId) {
        await saveOrders(state.orders, userId);
      }
    },
    async loadOrders({ commit, rootState }) {
      const userId = rootState.auth.user ? rootState.auth.user.localId : null;
      if (userId) {
        let orders = await fetchOrders(userId);
        orders = Object.values(orders) || [];
        console.log(orders);
        commit("setOrders", orders);
      }
    }
  }
};
