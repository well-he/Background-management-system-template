import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
//完整引入element-plus
import ElementPlus from 'element-plus';
import * as ElIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
//引入公共样式
import './assets/style/index.scss';
import './assets/style/reset.css';

const app = createApp(App);
//全局挂载对象
//注册el图标
for (const name in ElIcons) {
    app.component(name, ElIcons[name]);
}

app.use(router).use(store).use(ElementPlus);
app.mount('#app');
