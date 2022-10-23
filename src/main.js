import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import "./assets/main.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css";

import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

app.use(router, VueAxios, axios);
app.component("v-select", vSelect);
app.mount("#app");
