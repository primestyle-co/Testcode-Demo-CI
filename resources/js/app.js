import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import store from './store'

const app = createApp(App).use(router).use(Antd).use(store);
app.mount("#app");
export default app;
