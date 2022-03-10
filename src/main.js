import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
//完整引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//引入封装的utils
import request from './utils/request';
import storage from './utils/storage';
//引入公共样式
import './assets/style/index.scss';
import './assets/style/reset.css';
import api from './api';

const app = createApp(App);
//全局挂载对象
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;

app.use(router).use(store).use(ElementPlus);
app.mount('#app');

