import { createStore } from "vuex";

import AuthModule from "./modules/auth/index.js";
import AlertModule from "./modules/alert/index.js";
import MenuModule from "./modules/menu/index.js";
import ProductModule from "./modules/products/index.js";
import CartModule from "./modules/cart/index.js";

const store = createStore({
  modules: {
    auth: AuthModule,
    alert: AlertModule,
    menus: MenuModule,
    products: ProductModule,
    cart: CartModule
  }
});

export default store;
