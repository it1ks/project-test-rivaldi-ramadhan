import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

const app = createApp(App);

app.mount("#app");
