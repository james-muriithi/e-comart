export default {
  state() {
    return {
      categories: [],
    };
  },
  mutations: {
    setCategories(state, { categories }) {
      state.categories = categories;
    },
  },
  actions: {
    setCategories({ commit }, { categories }) {
      commit("setCategories", { categories });
    },
  },
  getters: {
    categories(state) {
      return state.categories;
    },
  },
};
