import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./routes/router";

//bootstrap
import("popper.js");
import("bootstrap");

//components
import TheHeader from "./components/layouts/header/TheHeader.vue";
import TheSidebarNav from "./components/layouts/sidebar/TheSidebarNav.vue";
import TheSearchBar from "./components/ui/TheSeachBar.vue";
import CartMobile from "./components/cart/CartMobile.vue";
import GlobalMixins from "./mixins/global";
import "./registerServiceWorker";

const app = createApp(App);

app.use(store);
app.use(router);
//global mixin
app.mixin(GlobalMixins);

app.component("the-header", TheHeader);
app.component("the-sidebar-nav", TheSidebarNav);
app.component("the-searchbar", TheSearchBar);
app.component("cart-mobile", CartMobile);

app.mount("#app");
