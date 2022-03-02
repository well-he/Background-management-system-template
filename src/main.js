import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
//完整引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import request from './utils/request';
import storage from './utils/storage';

const app = createApp(App);
//全局挂载对象
app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;

app.use(router).use(ElementPlus);
app.mount('#app');
