import {createRouter, createWebHashHistory} from 'vue-router';
import Home from '../components/Home.vue';
import storage from '../utils/storage';

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        redirect: '/welcome',
        meta: {
            title: '首页',
        },
        children: [
            {
                name: 'welcome',
                path: '/welcome',
                component: () => import('../views/welcome/index.vue'),
                meta: {
                    title: '欢迎页',
                },
            },
            {
                path: '/404',
                name: 'NotFound',
                meta: {
                    title: 'Page not found',
                    isLogin: false,
                },
                component: () => import('../views/NotFound.vue'),
            },
        ],
        // beforeEnter: (to, from, next) => {
        //     if (storage.getItem('userinfo')) {
        //         next();
        //     } else {
        //         next('/login');
        //     }
        // },
    },
    // 登录界面单独拿出来
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录',
        },
        component: () => import('../views/login/index.vue'),
    },
    // 所有未定义路由，全部重定向到404页
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router;
