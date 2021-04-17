import { createStore } from "vuex";

import AuthModule from "./modules/auth/index";

const store = createStore({
  modules: {
    AuthModule
  }
});

export default store;
