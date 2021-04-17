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

const app = createApp(App);

app.use(store);
app.use(router);
app.component("the-header", TheHeader);
app.component("the-sidebar-nav", TheSidebarNav);

app.mount("#app");
