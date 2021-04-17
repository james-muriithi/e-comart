import { createStore } from "vuex";

import AuthModule from "./modules/auth/index.js";
import AlertModule from "./modules/alert/index.js";

const store = createStore({
  modules: {
    AuthModule,
    alert: AlertModule
  }
});

export default store;
