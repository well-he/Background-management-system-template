import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';
import storage from '../utils/storage';
const routes = [
    {
        name: 'system',
        path: '/',
        // redirect: '/system',
        meta: {
            title: '首页',
        },
        beforeEnter: (to, from, next) => {
            if (storage.getItem('userinfo')) {
                next();
            } else {
                next('/login');
            }
        },
        component: Home,
        children: [
            {
                name: 'welcome',
                path: '/system',
                component: () => import('../views/Welcome.vue'),
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
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录',
        },
        component: () => import('../views/Login.vue'),
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
