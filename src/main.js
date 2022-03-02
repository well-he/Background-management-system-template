import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import axios from 'axios';
//完整引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import config from './config';

console.log(import.meta.env);

axios.get(config.mockApi + '/login').then(res => {
    console.log(res);
});

const app = createApp(App);
app.use(router).use(ElementPlus);
app.mount('#app');
