import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/common.css' //公共css
import '@/assets/less/common.less' //公共css
import api from "@/utils/api.js";//公共api
import config from "@/utils/config.js";//公共方法
import GlobalComponents from "@/utils/automatic.js";//  全局公共组件注册
import plugins from "@/utils/plugins.js";// 各种插件引入
import 'lib-flexible/flexible'

const app = createApp(App)
app.config.globalProperties.$api = api;
app.config.globalProperties.$config = config;

app.use(GlobalComponents);
app.use(plugins);
app.use(router);
app.mount("#app");

