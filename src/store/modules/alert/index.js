function getDefaultState() {
  return {
    message: null,
    type: "success"
  };
}

const getters = {
  message: state => state.message,
  type: state => state.type
};

const actions = {
  setMessage({ commit }, message) {
    commit("setMessage", message);
  },
  setType({ commit }, type) {
    commit("setType", type);
  },
  setAlert({ commit }, data) {
    commit("setMessage", data.message || null);
    commit("setType", data.type || "success");
  },
  resetState({ commit }) {
    commit("resetState");
  }
};

const mutations = {
  setMessage(state, message) {
    state.message = message;
  },
  setType(state, type) {
    state.type = type;
  },
  resetState(state) {
    console.log(state);
    state = Object.assign(state, getDefaultState());
  }
};

export default {
  namespaced: true,
  state: getDefaultState,
  getters,
  actions,
  mutations
};
