import { createApp } from "vue";
import store from "../store";
import App from "./App.vue";
import router from "./routes/router";

//bootstrap
() => import("bootstrap");

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
